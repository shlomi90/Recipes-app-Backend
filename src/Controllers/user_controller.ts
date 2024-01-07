import createController from "./Base_Controller";
import User from '../Models/user_model';
import { IUser } from "../Models/user_model";

const userController = createController<IUser>(User);



export = userController



