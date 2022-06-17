import {Request, Response} from "express";
import {User, UserInfo} from "../database/models";

export const getInfo = async (request: Request, response: Response) => {
  try {
    const {user_id} = request.params;
    const info = await UserInfo.findOne({
      where: {
        user_id
      },
      raw: true
    });
    // @ts-ignore
    response.status(201).send({phone_number: info.phone_number ? info.phone_number : info.phone_number});
  } catch (e) {
    response.status(500).send("Something went wrong");
  }
};
export const updateInfo = async (request: Request, response: Response) => {
  try {
    const {user_id} = request.params;
    const {phone_number} = request.body;
    await UserInfo.update({
      phone_number
    }, {
      where: {
        user_id
      }
    });
    response.status(201).send("Updated!");
  } catch (e) {
    response.status(500).send("Something went wrong");
  }
};

export const deleteAcc = async (request: Request, response: Response) => {
  try {
    const {user_id} = request.params;
    await UserInfo.destroy({where: {user_id}});
    await User.destroy({where: {id: user_id}});
    response.status(201).send("Deleted!");
  } catch (e) {
    response.status(500).send("Something went wrong");
  }
};