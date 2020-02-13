import * as Hapi from "@hapi/hapi";
import { injectable } from "inversify";

import { ControllerProvider } from "./ControllerProvider";


@injectable()
export abstract class Controller implements ControllerProvider {
    constructor(
        protected request: Hapi.Request,
        protected helper: Hapi.ResponseToolkit,
    ) { }
}