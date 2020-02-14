import * as Hapi from "@hapi/hapi";

export interface BookRequest extends Hapi.Request {
    payload: {
        title?: string;
        description?: string;
    }
}