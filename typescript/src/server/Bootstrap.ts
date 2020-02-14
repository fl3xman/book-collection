import * as Hapi from "@hapi/hapi";
import * as Joi from "@hapi/joi";

import { LoggerTag } from "../foundation/logger";
import { bootPlugin } from "../foundation/plugin";
import { InversifyPlugin } from "../plugins/inversify";
import { SequelizePlugin } from "../plugins/sequelize";
import { RouterPlugin } from "../plugins/router";

export const bootServer = async (options?: Hapi.ServerOptions): Promise<Hapi.Server> => {
    const server = new Hapi.Server(options);

    try {

        // Register validators

        server.validator(Joi);

        // Register plugins

        await server.register([
            bootPlugin(InversifyPlugin, { debug: true }),
            bootPlugin(SequelizePlugin, {
                database: "books",
                dialect: "sqlite",
                username: "book",
                password: "book",
                storage: ":memory:",
            }),
            bootPlugin(RouterPlugin, {})
        ]);


        server.log([LoggerTag.Info], "Plugins successfuly registered.");
    } catch (error) {
        server.log([LoggerTag.Error], `Plugins failed to register with error: ${error}.`);
    }

    return server;
}