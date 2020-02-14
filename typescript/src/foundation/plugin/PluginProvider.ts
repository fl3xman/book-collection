import * as _ from "lodash";
import * as Hapi from "@hapi/hapi";


export type PluginFilterProperties<T> = Pick<T, { [K in keyof T]: T[K] extends Hapi.PluginProperties ? K : never }[keyof T]>;

export const provideServerPlugin = <Properties extends Hapi.PluginProperties>(
    server: Hapi.Server, keypath: string
): Properties => _.get(server.plugins, keypath);

export const provideRequestPlugin = <Properties extends Hapi.PluginProperties>(
    request: Hapi.Request, keypath: string
): Properties => provideServerPlugin(request.server, keypath);