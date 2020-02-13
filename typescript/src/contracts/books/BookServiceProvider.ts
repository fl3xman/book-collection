import { CrudServiceProvider } from "../../foundation/service/CrudServiceProvider";
import { Book } from "./Book";

export interface BookServiceProvider extends CrudServiceProvider<Book, string> { }
