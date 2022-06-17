import {Request, Response} from "express";
import bcrypt from "bcrypt";

import {User, UserInfo} from "../database/models";
import {generateJwt} from "../utils/utils";
import {sequelize} from "../database/config/config";


//проверка токена на валидность произошла в миддлвеере, тут мы лишь генерим новый токен и шлем его на фронт
export const refreshToken = async (request: Request, response: Response): Promise<void> => {
  const token = generateJwt(request.body.user.id, request.body.user.email, request.body.user.role, "2h");
  response.status(200).json({token});
};

//логин
export const login = async (request: Request, response: Response) => {
  try {
    //достаем данные из тела запроса
    const email: string = request.body.email,
      password: string = request.body.password;

    if (!(email && password)) {
      response.status(401).send("All input is required");
    }
    //ищем в базе данных в таблице 'user' всех юзеров с указаной почтой
    const oldUsers: User[] = await User.findAll({
      where: {
        email
      },
      raw: true
    });
    //для каждого юзера сверяем его зашифрованый бкриптом пароль с тем паролем, что пришел в теле запроса
    for (let i = 0; i < oldUsers?.length; i++) {
      const passwordMatch: boolean = await bcrypt.compare(password, oldUsers[i]?.password);
      //если совпало то выходим из цикла и шлем новый токен на фронт
      if (passwordMatch) {
        const token = generateJwt(oldUsers[i].id, oldUsers[i].email, oldUsers[i].role, "2h");
        response.status(200).json({token});
      }
    }
    response.status(403).send("Forbidden");
  } catch (err) {
    console.log(err);
    response.status(500).send("Something went wrong");
  }
};

export const register = async (request: Request, response: Response): Promise<void> => {
  try {
    //достаем из тела запроса имейл, пароль и роль
    const email: string = request.body.email,
      password: string = request.body.password,
      role: number = request.body.role;

    if (!(email && password)) {
      response.status(400).send("Invalid credentials");
    }
    //хешируем пароль, число раундов = 5
    const encryptedPassword: string = await bcrypt.hash(password, 5);
    const newUser: User =
      await sequelize.transaction(async t => {
        const a = await User.create({
          email, password: encryptedPassword, role
        }, {transaction: t});
        await UserInfo.create({
          user_id: a.id,
          phone_number: ""
        }, {transaction: t});
        return a;
      });
    //потом генерим json web token и шлем на фронт
    const token: string = await generateJwt(newUser.id, email, role, "2h");
    response.status(201).json({token});
  } catch (err) {
    response.status(500).json("Something went wrong");
  }
};