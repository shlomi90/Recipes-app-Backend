import createController from "./Base_Controller";
import Post from '../Models/post_model'
import { IPost } from "../Models/post_model";

const postController = createController<IPost>(Post);

export = postController



