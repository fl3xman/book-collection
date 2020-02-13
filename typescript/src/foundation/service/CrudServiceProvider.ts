import { Auditable } from "../domain";

export interface CrudServiceProvider<T extends Auditable<T>, ID = string> {

    create(input: Partial<T>): Promise<T>;
    update(id: ID, input: Partial<T>): Promise<T>;
    delete(id: ID): Promise<void>;

    findOne(id: ID): Promise<T>;
    find<Params>(params: Params): Promise<T[]>;
}