import * as Hapi from "@hapi/hapi";
import { Sequelize } from "sequelize-typescript";

import { provideServerPlugin } from "../../foundation/plugin";
import { InversifyProvider, InversifyPlugin } from "../inversify";

export const provideSequelize = (server: Hapi.Server): Sequelize =>
    provideServerPlugin<InversifyProvider>(server, InversifyPlugin.Keypath).container().get(Sequelize);