import {User} from "./User";
import {UserInfo} from "./UserInfo";
//импорт + экспорт моделей и прописанные связи

User.hasOne(UserInfo);
UserInfo.hasOne(User);

export {
  User,
  UserInfo
};
