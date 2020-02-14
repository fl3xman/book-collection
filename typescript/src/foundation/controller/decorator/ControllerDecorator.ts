import * as _ from "lodash";
import * as Hapi from "@hapi/hapi";

export function Route(config: Hapi.ServerRoute) {
    return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
        if (_.isNil(target.routes)) {
            target.routes = new Map<string, Hapi.ServerRoute>();
        }
        target.routes.set(methodName, config);
    }
}