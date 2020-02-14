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