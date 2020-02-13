import { ContainerModule } from "inversify";

import { AuthorService, AuthorServiceProvider } from "./authors";
import { BookService, BookServiceProvider } from "./books";

export const bootContracts = (): ContainerModule => {
    return new ContainerModule((bind) => {

        bind<AuthorServiceProvider>(AuthorService).toSelf()
        bind<BookServiceProvider>(BookService).toSelf();

    });
};