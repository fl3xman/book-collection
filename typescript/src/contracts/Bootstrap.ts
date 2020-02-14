import { ContainerModule } from "inversify";
import { ModelCtor } from "sequelize-typescript";

import { BootBinding } from "../foundation/core";

import { AuthorService, AuthorServiceProvider, AuthorController, Author } from "./authors";
import { BookService, BookServiceProvider, BookController, Book } from "./books";
import { BookAuthor } from "./books/associations";
import { Controller } from "../foundation/controller";

export const bootContracts = (): ContainerModule => {
    return new ContainerModule((bind) => {

        // Author

        bind<AuthorServiceProvider>(AuthorService).toSelf()
        bind<Controller>(BootBinding.Controller).to(AuthorController);

        // Book

        bind<BookServiceProvider>(BookService).toSelf();
        bind<Controller>(BootBinding.Controller).to(BookController);

        // Boot models

        bind<ModelCtor[]>(BootBinding.Domain).toConstantValue([Author, Book, BookAuthor]);
    });
};