import { injectable } from "inversify";

import { CrudService } from "../../foundation/service";
import { NotImplementedError } from "../../foundation/core";
import { Author } from "./Author";
import { AuthorServiceProvider } from "./AuthorServiceProvider";


@injectable()
export class AuthorService extends CrudService<Author, string> implements AuthorServiceProvider {
    constructor() {
        super(Author);
    }

    public async find<Params>(params: Params): Promise<Author[]> {
        throw new NotImplementedError();
    }
}