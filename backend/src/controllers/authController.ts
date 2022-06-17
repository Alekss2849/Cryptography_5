import {Request, Response} from "express";
import bcrypt from "bcrypt"

import {User} from "../database/models"
import {generateJwt} from "../utils/utils";

export const isTokenValid = async (request: Request, response: Response): Promise<void> => {
  const token = generateJwt(request.body.user.id, request.body.user.email, request.body.user.role, "2h")
  response.status(200).json({token});
}

export const login = async (request: Request, response: Response) => {
  try {
    const email: string = request.body.email,
      password: string = request.body.password;

    if (!(email && password)) {
      response.status(401).send("All input is required");
    }

    const oldUsers: User[] = await User.findAll({
      where: {
        email
      },
      raw: true
    })
    for (let i = 0; i < oldUsers?.length; i++) {
      const passwordMatch: boolean = await bcrypt.compare(password, oldUsers[i]?.password)
      if (passwordMatch) {
        const token = generateJwt(oldUsers[i].id, oldUsers[i].email, oldUsers[i].role, "2h")
        response.status(200).json({token});
      }
    }
    response.status(403).send("Forbidden");
  } catch (err) {
    console.log(err);
    response.status(500).send("Something went wrong");
  }
}

export const register = async (request: Request, response: Response): Promise<void> => {
  try {
    const email: string = request.body.email,
      password: string = request.body.password,
      role: number = request.body.role;
    if (!(email && password)) {
      response.status(400).send("Invalid credentials");
    }
    const encryptedPassword: string = await bcrypt.hash(password, 5);
    const newUser: User = await User.create({
      email, password: encryptedPassword, role
    })
    const token: string = generateJwt(newUser.id, email, role, "2h")
    response.status(201).json({token});
  } catch (err) {
    response.status(500).json("Something went wrong");
  }
}