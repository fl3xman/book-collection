import { Table, ForeignKey, Column, Model } from "sequelize-typescript";

import { Author } from "../../authors/Author";
import { Book } from "../Book";

@Table({ tableName: "book_author" })
export class BookAuthor extends Model<BookAuthor> {

    @ForeignKey(() => Book)
    @Column({ field: "book_id" })
    public bookId: string;

    @ForeignKey(() => Author)
    @Column({ field: "author_id" })
    public authorId: string;
}