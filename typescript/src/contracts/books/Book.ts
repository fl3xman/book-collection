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

import { BelongsToMany, Column, Table, Index, DefaultScope, Scopes } from "sequelize-typescript";
import { Transaction } from "sequelize";

import { Auditable, DefaultEntityAttributeSet } from "../../foundation/domain";

import { Author } from "../authors";
import { BookAuthor } from "./authors";

@DefaultScope(() => ({
    attributes: ["title", "description", ...DefaultEntityAttributeSet],
}))
@Scopes(() => ({
    withAuthors: {
        include: [Author],
    }
}))
@Table({ tableName: "books" })
export class Book extends Auditable<Book> {

    public static scopeWithAuthors(): typeof Book {
        return Book.scope("withAuthors");
    }

    @Index
    @Column
    public title: string;

    @Index
    @Column
    public description: string;

    @BelongsToMany(() => Author, () => BookAuthor)
    public authors: Author[];


    public async $addAuthors(authors: Author[], transaction?: Transaction): Promise<this> {
        this.setDataValue("authors", authors);
        await this.$add("authors", authors, { transaction });

        return this;
    }
}