import * as Hapi from "@hapi/hapi";

import { injectable, inject } from "inversify";

import { Controller } from "../../foundation/controller";
import { Route } from "../../foundation/controller/decorator";
import { HttpMethod, MimeType, HttpStatus } from "../../foundation/http";
import { SearchValidator, IdentityValidator } from "../../foundation/validator";

import { AuthorValidator } from "./validator";
import { AuthorRequest } from "./support";

import { AuthorServiceProvider } from "./AuthorServiceProvider";
import { AuthorService } from "./AuthorService";

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
    public async create(request: AuthorRequest, helper: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        return this.service.create(request.payload);
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
    public async update(request: AuthorRequest, helper: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        return this.service.update(request.params.id, request.payload);
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
    public async delete(request: Hapi.Request, helper: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        await this.service.delete(request.params.id);
        return helper.response().code(HttpStatus.NO_CONTENT);
    }

    @Route({
        path: "/authors/{id}",
        method: HttpMethod.GET,
        options: {
            validate: {
                params: IdentityValidator,
            }
        }
    })
    public async findOne(request: Hapi.Request, helper: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        return this.service.findOne(request.params.id);
    }

    @Route({
        path: "/authors",
        method: HttpMethod.GET,
        options: {
            validate: {
                query: SearchValidator,
            }
        }
    })
    public async find(request: Hapi.Request, helper: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        return this.service.find(request.query);
    }
}