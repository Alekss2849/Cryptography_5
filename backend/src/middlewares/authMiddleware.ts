import jwt, {JwtPayload} from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";

//функция которая проверяем валиден ли наш токен для юзера,
export const authMiddleware = (request: Request, response: Response, next: NextFunction): void => {
  try {
    const token = String(request?.headers?.authorization?.split(' ')[1]);
    if (!token) {
      response.status(401).json({message: "Не авторизован"});
    }
    const decoded = jwt.verify(token, String(process.env.SECRET_KEY)) as JwtPayload;
    //если роль Админ, то нас пускает в следующую функцию
    if (decoded?.role === 'ADMIN') {
      request.body.user = decoded;
      next();
    } else {
      response.status(401).json({message: "Не авторизован"});
    }
  } catch (e) {
    response.status(401).json({message: "Не авторизован"});
  }
};