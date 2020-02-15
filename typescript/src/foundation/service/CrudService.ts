/*
 *   Copyright (c) 2020 mike.grman@gmail.com
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:

 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.

 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

import * as _ from "lodash";

import { inject, injectable } from "inversify";
import { Sequelize } from "sequelize-typescript";
import { Op, Transaction } from "sequelize";

import { Auditable } from "../domain";
import { guardNotFound } from "../core";

import { CrudServiceProvider } from "./CrudServiceProvider";
import { SearchPageParams } from "./SearchPageParams";
import { Page } from "./Page";
import { searchOperation } from "./SearchOperation";

@injectable()
export abstract class CrudService<T extends Auditable<T>, ID = string> implements CrudServiceProvider<T, ID> {

    @inject(Sequelize)
    protected sequelize: Sequelize;

    constructor(protected modelFactory: new (...args: any[]) => T) { }

    public async create(input: Partial<T>): Promise<T> {
        const model = new this.modelFactory(input);
        return model.save();
    }

    public async update(id: ID, input: Partial<T>): Promise<T> {
        const repository = this.sequelize.getRepository(this.modelFactory);
        const [, result] = await repository.update(input, { where: { id } });

        return guardNotFound(_.first(result), `Entity with id: ${id} not found.`);
    }

    public async delete(id: ID): Promise<void> {
        const repository = this.sequelize.getRepository(this.modelFactory);
        const count = await repository.destroy({ where: { id } });

        guardNotFound(count !== 0, `Entity with id: ${id} not found.`);
    }

    public async findOne(id: ID): Promise<T> {
        const repository = this.sequelize.getRepository(this.modelFactory);
        const result = await repository.findOne({ where: { id } });

        return guardNotFound(result, `Entity with id: ${id} not found.`);
    }

    public async find<P extends SearchPageParams = SearchPageParams>(params: Partial<P>, attributes: string[]): Promise<Page<T>> {
        const repository = this.sequelize.getRepository(this.modelFactory);
        const result = await repository.findAndCountAll({
            where: searchOperation(attributes, params.search), limit: params.limit, offset: params.cursor
        });

        const cursor = result.count - result.rows.length;
        return { source: result.rows, cursor: (cursor > 0) ? cursor : undefined, totalCount: result.count };
    }

    public async findEntities(ids: ID[], transaction?: Transaction): Promise<T[]> {
        const repository = this.sequelize.getRepository(this.modelFactory);
        const result = await repository.findAll({ where: { id: { [Op.in]: ids } }, transaction });

        return result;
    }
}

