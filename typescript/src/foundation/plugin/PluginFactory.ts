import * as Hapi from "@hapi/hapi";

export const buildPlugin = <Options>(
    pluginFactory: new () => Hapi.Plugin<Options>, options: Options
): Hapi.ServerRegisterPluginObject<Options> => ({
    options, plugin: new pluginFactory(),
});