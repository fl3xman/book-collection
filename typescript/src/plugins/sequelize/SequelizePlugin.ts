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

import * as Hapi from "@hapi/hapi";

import { Sequelize, ModelCtor, SequelizeOptions } from "sequelize-typescript";

import { provideServerPlugin } from "../../foundation/plugin";
import { LoggerTag } from "../../foundation/logger";
import { BootBinding } from "../../foundation/core";

import { InversifyPlugin, InversifyProvider } from "../inversify";


export class SequelizePlugin implements Hapi.PluginBase<SequelizeOptions>, Hapi.PluginNameVersion {

    public static Keypath: string = "sequelize";

    public readonly name: string = SequelizePlugin.Keypath;
    public readonly dependencies: string[] = [InversifyPlugin.Keypath];

    public async register(server: Hapi.Server, options: SequelizeOptions): Promise<void> {

        const container = provideServerPlugin<InversifyProvider>(server, InversifyPlugin.Keypath).container();
        const sequelize = new Sequelize(options);

        sequelize.addModels(container.get<ModelCtor[]>(BootBinding.Domain));
        container.bind(Sequelize).toConstantValue(sequelize);

        await sequelize.sync();
        server.log([LoggerTag.Info], "Sequelize plugin registered successfully.");
    }
}