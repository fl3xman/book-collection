import * as Hapi from "@hapi/hapi";

import { injectable, inject } from "inversify";

import { Controller } from "../../foundation/controller";
import { Route } from "../../foundation/controller/decorator";
import { HttpMethod, MimeType } from "../../foundation/http";
import { SearchValidator, IdentityValidator } from "../../foundation/validator";

import { AuthorServiceProvider } from "./AuthorServiceProvider";
import { AuthorService } from "./AuthorService";
import { AuthorValidator } from "./validator";


@injectable()
export class AuthorController extends Controller {

    @inject(AuthorService)
    private service: AuthorServiceProvider;

    @Route({
        path: "/authors",
        method: HttpMethod.POST,
        options: {
            validate: {
                payload: AuthorValidator,
            },
            payload: {
                allow: MimeType.ApplicationJson,
                defaultContentType: MimeType.ApplicationJson,
            }
        }
    })
    public async create(): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        return this.service.create({ ...this.request.payload as any });
    }

    @Route({
        path: "/authors/{id}",
        method: HttpMethod.PATCH,
        options: {
            validate: {
                params: IdentityValidator,
                payload: AuthorValidator,
            },
            payload: {
                allow: MimeType.ApplicationJson,
                defaultContentType: MimeType.ApplicationJson,
            }
        }
    })
    public async update(): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        return this.service.update(this.request.params.id, { ...this.request.payload as any });
    }

    @Route({
        path: "/authors/{id}",
        method: HttpMethod.DELETE,
        options: {
            validate: {
                params: IdentityValidator,
            },
            payload: {
                allow: MimeType.ApplicationJson,
            }
        }
    })
    public async delete(): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        await this.service.delete(this.request.params.id);
        return "";
    }

    @Route({
        path: "/authors/{id}",
        method: HttpMethod.GET,
        options: {
            validate: {
                params: IdentityValidator,
            },
            payload: {
                allow: MimeType.ApplicationJson,
            }
        }
    })
    public async findOne(): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        return this.service.findOne(this.request.params.id);
    }

    @Route({
        path: "/authors",
        method: HttpMethod.GET,
        options: {
            validate: {
                query: SearchValidator,
            },
            payload: {
                allow: MimeType.ApplicationJson,
            }
        }
    })
    public async find(): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        return this.service.find(this.request.query);
    }
}