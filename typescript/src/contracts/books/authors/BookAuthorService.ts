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

import { injectable, inject } from "inversify";

import { CrudService } from "../../../foundation/service";

import { AuthorServiceProvider } from "../../authors";
import { Book } from "../Book";

import { BookAuthorServiceProvider } from "./BookAuthorServiceProvider";

@injectable()
export class BookAuthorService extends CrudService<Book, string> implements BookAuthorServiceProvider {

    @inject("AuthorServiceProvider")
    private authorService: AuthorServiceProvider;

    public async createBookWithAuthors(input: Partial<Book>, authorIds: string[]): Promise<Book> {
        return this.sequelize.transaction(async (transaction) => {

            const authors = await this.authorService.findEntities(authorIds, transaction);
            const book = await Book.create(input, { transaction });

            return book.withAuthors(authors, transaction);
        });
    }
}