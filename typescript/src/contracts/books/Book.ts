import { BelongsToMany, Column, Table, Index, DefaultScope, Scopes } from "sequelize-typescript";

import { Auditable, DefaultAttributeSet } from "../../foundation/domain";

import { Author } from "../authors";
import { BookAuthor } from "./associations";

@DefaultScope(() => ({
    attributes: ["title", "description", ...DefaultAttributeSet],
}))
@Scopes(() => ({
    withBooks: {
        include: [Author],
    }
}))
@Table({ tableName: "books" })
export class Book extends Auditable<Book> {

    @Index
    @Column
    public title: string;

    @Index
    @Column
    public description: string;

    @BelongsToMany(() => Author, () => BookAuthor)
    public authors: (Author & { BookAuthor: BookAuthor })[];
}