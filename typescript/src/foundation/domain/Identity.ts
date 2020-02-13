import { Model, Column, DataType } from "sequelize-typescript";

export abstract class Identity<T> extends Model<T> {

    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    public id: string;
}