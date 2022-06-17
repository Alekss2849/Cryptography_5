import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../config/config";

//прописываем класс юзера
export interface IUser {
  id?: number,
  user_id: number,
  phone_number: string,
}

export type IUserInfoInput = Optional<IUser, 'user_id' & 'password' & 'phone_number'>
export type IUserInfoOutput = Required<IUser>

export class UserInfo extends Model<IUser, IUserInfoInput> implements IUser {
  public id!: number;
  public user_id!: number;
  public phone_number!: string;
}
//инициализируем модель
UserInfo.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'user_info',
  schema: 'public',
  timestamps: false,
  indexes: [
    {
      //уникальный ключ, что связывает сразу два поля имейл+роль, так чтобы на 1 имейл могло зарегаться несколько ролей под разными паролями
      name: "user_email_password_uindex",
      unique: true,
      fields: [
        {name: "email"},
        {name: "role"},
      ]
    },
    {
      name: "user_pk",
      unique: true,
      fields: [
        {name: "id"},
      ]
    },
    {
      name: "user_id_uindex",
      unique: true,
      fields: [
        {name: "id"},
      ]
    },
    {
      name: "user_user_id_uindex",
      unique: true,
      fields: [
        {name: "user_id"},
      ]
    },
  ]
});
