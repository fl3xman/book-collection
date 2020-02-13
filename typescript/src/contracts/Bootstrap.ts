import { ContainerModule } from "inversify";
import { ModelCtor } from "sequelize-typescript";

import { DefaultDomainKey } from "../foundation/domain";

import { AuthorService, AuthorServiceProvider, AuthorController, Author } from "./authors";
import { BookService, BookServiceProvider, BookController, Book } from "./books";

export const bootContracts = (): ContainerModule => {
    return new ContainerModule((bind) => {

        bind<ModelCtor[]>(DefaultDomainKey).toConstantValue([Author, Book]);

        // Author

        bind<AuthorServiceProvider>(AuthorService).toSelf()
        bind(AuthorController).toSelf();

        // Book

        bind<BookServiceProvider>(BookService).toSelf();
        bind(BookController).toSelf();

    });
};