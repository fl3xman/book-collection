/*
 *   Copyright (c) 2020 mike.grman@gmail.com
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:

 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.

 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

import * as Hapi from "@hapi/hapi";

import { injectable, inject } from "inversify";

import { Controller } from "../../foundation/controller";
import { Route } from "../../foundation/controller/decorator";
import { HttpMethod, MimeType, HttpStatus } from "../../foundation/http";
import { SearchPageValidator, IdentityValidator } from "../../foundation/validator";
import { SearchPageParamsRequest } from "../../foundation/service";

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
                query: SearchPageValidator,
            }
        }
    })
    public async find(request: SearchPageParamsRequest, helper: Hapi.ResponseToolkit): Promise<Hapi.Lifecycle.ReturnValueTypes> {
        return this.service.findAuthors(request.query);
    }
}