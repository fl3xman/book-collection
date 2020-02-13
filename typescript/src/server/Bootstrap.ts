import * as Hapi from "@hapi/hapi";

import { LoggerTag } from "../foundation/logger";
import { buildPlugin } from "../foundation/plugin";
import { InversifyPlugin } from "../plugins/inversify";
import { SequelizePlugin } from "../plugins/sequelize";

export const bootServer = async (options?: Hapi.ServerOptions): Promise<Hapi.Server> => {
    const server = new Hapi.Server(options);

    try {

        // Register plugins

        await server.register([
            buildPlugin(InversifyPlugin, { debug: true }),
            buildPlugin(SequelizePlugin, {
                database: "books",
                dialect: "sqlite",
                username: "book",
                password: "book",
                storage: ":memory:",
            })
        ]);

        server.log([LoggerTag.Info], "Plugins successfuly registered.");
    } catch (error) {
        server.log([LoggerTag.Error], `Plugins failed to register with error: ${error}.`);
    }

    return server;
}