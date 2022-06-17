import jwt from "jsonwebtoken"
//генерация токена
export const generateJwt = (id: number | undefined, email: string | undefined, role: number, time: string): string => {
  return jwt.sign(
    {id, email, role},
    String(process.env.SECRET_KEY),
    {
      expiresIn: time,
    }
  );
}