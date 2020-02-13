import * as Hapi from "@hapi/hapi";

import { Container, interfaces } from "inversify";
import { makeLoggerMiddleware } from "inversify-logger-middleware";

import { LoggerTag } from "../../foundation/logger";
import { PluginConfig } from "../../foundation/plugin";

import { bootContracts } from "../../contracts";

const container = new Container();

export class InversifyPlugin implements Hapi.PluginBase<PluginConfig>, Hapi.PluginNameVersion {

    public static Keypath: string = "inversify"

    public readonly name: string = InversifyPlugin.Keypath;

    public async register(server: Hapi.Server, options: PluginConfig): Promise<void> {

        if (options.debug) {

            const logger = makeLoggerMiddleware();
            container.applyMiddleware(logger);
        }

        container.bind(Hapi.Server).toConstantValue(server);
        container.load(bootContracts());

        server.expose({ container: (): interfaces.Container => container });
        server.log([LoggerTag.Info], "Inversify plugin registered successfully.");
    }
}