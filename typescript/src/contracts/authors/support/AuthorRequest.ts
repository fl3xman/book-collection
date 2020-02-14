import * as Hapi from "@hapi/hapi";

export interface AuthorRequest extends Hapi.Request {
    payload: {
        name: string;
    }
}