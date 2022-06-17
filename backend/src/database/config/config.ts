import {Sequelize} from "sequelize";

//соединяем наши модели с базой данных
console.log(process.env.NODE_ENV)
const db_database = String(process.env.DB_DATABASE)
const db_password = String(process.env.DB_PASSWORD)
const db_user = String(process.env.DB_USER)
const db_host = String(process.env.DB_HOST)
//поскольку у нас БД лежит на облаке, то нам нужен ссл параметры указать
const dialectOptions = {
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
}

//создаем инстанс сиквелайза
export const sequelize = new Sequelize(db_database, db_user, db_password, {
  host: db_host,
  dialect: 'postgres',
  dialectOptions
})
