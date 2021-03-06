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

import { ContainerModule } from "inversify";
import { ModelCtor } from "sequelize-typescript";

import { BootBinding } from "../foundation/core";
import { Controller } from "../foundation/controller";

import { AuthorService, AuthorServiceProvider, AuthorController, Author } from "./authors";
import { BookService, BookServiceProvider, BookController, Book } from "./books";
import { BookAuthor, BookAuthorService, BookAuthorServiceProvider } from "./books/authors";

export const bootContracts = (): ContainerModule => {
    return new ContainerModule((bind) => {

        // Author

        bind<AuthorServiceProvider>("AuthorServiceProvider").to(AuthorService);
        bind<Controller>(BootBinding.Controller).to(AuthorController);

        // Book

        bind<BookServiceProvider>("BookServiceProvider").to(BookService);
        bind<Controller>(BootBinding.Controller).to(BookController);

        // Book & Author

        bind<BookAuthorServiceProvider>("BookAuthorServiceProvider").to(BookAuthorService);

        // Boot models

        bind<ModelCtor[]>(BootBinding.Domain).toConstantValue([Author, Book, BookAuthor]);
    });
};