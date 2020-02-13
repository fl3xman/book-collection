import * as Hapi from "@hapi/hapi";

import { interfaces } from "inversify";

export interface InversifyProvider extends Hapi.PluginProperties {
    container(): interfaces.Container;
}