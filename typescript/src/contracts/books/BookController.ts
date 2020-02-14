import * as Hapi from "@hapi/hapi";

import { injectable, inject } from "inversify";

import { Controller } from "../../foundation/controller";
import { Route } from "../../foundation/controller/decorator";
import { HttpMethod, MimeType, HttpStatus } from "../../foundation/http";
import { IdentityValidator, SearchValidator } from "../../foundation/validator";

import { BookUpdateValidator, BookCreateValidator } from "./validator";
import { BookRequest } from "./support";

import { BookServiceProvider } from "./BookServiceProvider";
import { BookService } from "./BookService";

@injectable()
export class BookController extends Controller {

    @inject(BookService)
    private service: BookServiceProvider

    @Route({
        path: "/books",
        method: HttpMethod.POST,
        options: {
            validate: {
                payload: BookCreateValidator,
            },
            payload: {
                allow: MimeType.ApplicationJson,
                defaultContentType: MimeType.ApplicationJson,
            }
        },
    })
    public async create(request: BookRequest, helper: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        return this.service.create(request.payload);
    }

    @Route({
        path: "/books/{id}",
        method: HttpMethod.PATCH,
        options: {
            validate: {
                params: IdentityValidator,
                payload: BookUpdateValidator,
            },
            payload: {
                allow: MimeType.ApplicationJson,
                defaultContentType: MimeType.ApplicationJson,
            }
        }
    })
    public async update(request: BookRequest, helper: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        return this.service.update(request.params.id, request.payload);
    }

    @Route({
        path: "/books/{id}",
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
        path: "/books/{id}",
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
        path: "/books",
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