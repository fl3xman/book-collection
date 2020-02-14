import { ContainerModule } from "inversify";
import { ModelCtor } from "sequelize-typescript";

import { BootBinding } from "../foundation/core";

import { AuthorService, AuthorServiceProvider, AuthorController, Author } from "./authors";
import { BookService, BookServiceProvider, BookController, Book } from "./books";
import { BookAuthor } from "./books/associations";

export const bootContracts = (): ContainerModule => {
    return new ContainerModule((bind) => {

        // Boot models

        bind<ModelCtor[]>(BootBinding.Domain).toConstantValue([Author, Book, BookAuthor]);

        // Author

        bind<AuthorServiceProvider>(AuthorService).toSelf()
        bind(AuthorController).toSelf();

        // Book

        bind<BookServiceProvider>(BookService).toSelf();
        bind(BookController).toSelf();

    });
};