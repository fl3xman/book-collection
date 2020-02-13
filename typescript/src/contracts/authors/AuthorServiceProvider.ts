import { CrudServiceProvider } from "../../foundation/service/CrudServiceProvider";
import { Author } from "./Author";

export interface AuthorServiceProvider extends CrudServiceProvider<Author, string> { }