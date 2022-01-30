import {Column, DataType, Model, Table} from "sequelize-typescript";

@Table({tableName: 'forms'})
export class Form extends Model<Form> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull:false})
    name: string;

    @Column({type: DataType.STRING, allowNull:false})
    email: string;

    @Column({type: DataType.STRING, allowNull:false})
    message: string;
}