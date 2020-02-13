import * as Hapi from "@hapi/hapi";

export function Route(config: Hapi.ServerRoute) {
    return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
        if (!target.routes) {
            target.routes = [];
        }
        (config as any).handlerName = methodName;
        target.routes.push(config);
    }
}