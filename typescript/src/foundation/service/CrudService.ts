import * as _ from "lodash";

import { inject, injectable } from "inversify";
import { Sequelize } from "sequelize-typescript";

import { Auditable } from "../domain";
import { CrudServiceProvider } from "./CrudServiceProvider";
import { guardEntityNotFound } from "../domain";

@injectable()
export abstract class CrudService<T extends Auditable<T>, ID> implements CrudServiceProvider<T, ID> {

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

        return guardEntityNotFound(_.first(result), `Entity with id: ${id} not found.`);
    }

    public async delete(id: ID): Promise<void> {
        const repository = this.sequelize.getRepository(this.modelFactory);
        const count = await repository.destroy({ where: { id } });

        guardEntityNotFound(count === 0, `Entity with id: ${id} not found.`);
    }

    public async findOne(id: ID): Promise<T> {
        const repository = this.sequelize.getRepository(this.modelFactory);
        const result = await repository.findOne({ where: { id } });

        return guardEntityNotFound(result, `Entity with id: ${id} not found.`);
    }

    abstract async find<Params>(params: Params): Promise<T[]>;
}