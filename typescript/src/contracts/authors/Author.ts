import { BelongsToMany, Column, Table, Index, Scopes, DefaultScope } from "sequelize-typescript";

import { Auditable, DefaultEntityAttributeSet } from "../../foundation/domain";

import { Book } from "../books";
import { BookAuthor } from "../books/associations";

@DefaultScope(() => ({
    attributes: ["name", ...DefaultEntityAttributeSet],
}))
@Scopes(() => ({
    withBooks: {
        include: [Book],
    }
}))
@Table({ tableName: "authors" })
export class Author extends Auditable<Author> {

    @Index
    @Column
    public name: string;

    @BelongsToMany(() => Book, () => BookAuthor)
    public books: (Book & { BookAuthor: BookAuthor })[];
}