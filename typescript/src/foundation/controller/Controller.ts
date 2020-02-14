import * as Hapi from "@hapi/hapi";

import { injectable } from "inversify";

@injectable()
export abstract class Controller {

    public routes: Map<string, Hapi.ServerRoute>;
}