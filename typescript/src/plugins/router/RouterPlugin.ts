import * as _ from "lodash";
import * as Hapi from "@hapi/hapi";

import { provideServerPlugin } from "../../foundation/plugin";
import { LoggerTag } from "../../foundation/logger";
import { Controller } from "../../foundation/controller";
import { BootBinding } from "../../foundation/core";

import { InversifyPlugin, InversifyProvider } from "../inversify";
import { SequelizePlugin } from "../sequelize";

export class RouterPlugin implements Hapi.PluginBase<object>, Hapi.PluginNameVersion {

    public static Keypath: string = "router";

    public readonly name: string = RouterPlugin.Keypath;
    public readonly dependencies: string[] = [InversifyPlugin.Keypath, SequelizePlugin.Keypath];

    public async register(server: Hapi.Server, options: object): Promise<void> {

        const container = provideServerPlugin<InversifyProvider>(server, InversifyPlugin.Keypath).container();
        const controllers = container.getAll<Controller>(BootBinding.Controller);
        const routes = _.flatten(controllers.map((controller) => {

            controller.routes.forEach((route, handler) => {

                route.handler = _.get(controller, handler);
                route.options = { ...route.options, bind: controller };
            })

            return [...controller.routes.values()];
        }));

        server.route(routes);
        server.log([LoggerTag.Info], "Router plugin registered successfully.");
    }
}