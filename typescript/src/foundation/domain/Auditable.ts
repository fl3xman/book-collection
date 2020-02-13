import { Column, CreatedAt, UpdatedAt } from "sequelize-typescript";

import { Identity } from "./Identity";

export abstract class Auditable<T> extends Identity<T> {

    @CreatedAt
    @Column({ field: "created_at" })
    public createdAt: Date;

    @UpdatedAt
    @Column({ field: "updated_at" })
    public updatedAt: Date;
}