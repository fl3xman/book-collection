import { injectable } from "inversify";

import { CrudService } from "../../foundation/service";
import { NotImplementedError } from "../../foundation/core";
import { Book } from "./Book";
import { BookServiceProvider } from "./BookServiceProvider";

@injectable()
export class BookService extends CrudService<Book, string> implements BookServiceProvider {
    constructor() {
        super(Book);
    }

    public async find<Params>(params: Params): Promise<Book[]> {
        throw new NotImplementedError();
    }
}