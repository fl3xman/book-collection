import * as Hapi from "@hapi/hapi";

import { injectable, inject } from "inversify";

import { Controller } from "../../foundation/controller";
import { Route } from "../../foundation/controller/decorator";
import { HttpMethod, MimeType, HttpStatus } from "../../foundation/http";
import { IdentityValidator, SearchValidator } from "../../foundation/validator";

import { BookServiceProvider } from "./BookServiceProvider";
import { BookService } from "./BookService";
import { BookUpdateValidator, BookCreateValidator } from "./validator";

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
    public async create(): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        return this.service.create({ ...this.request.payload as any });
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
    public async update(): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        return this.service.update(this.request.params.id, { ...this.request.payload as any });
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
    public async delete(): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        await this.service.delete(this.request.params.id);
        return this.helper.response().code(HttpStatus.NO_CONTENT);
    }

    @Route({
        path: "/books/{id}",
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
        path: "/books",
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