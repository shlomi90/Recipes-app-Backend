import { BaseController } from "./Base_Controller";
import { IComment } from "../Models/comments_model";
import Comment from "../Models/comments_model";
import { IRequest } from "../Common/auth_middleware";
import { Response } from "express";
import Post from "../Models/post_model";

class Commentcontroller extends BaseController<IComment>{
    constructor() {
        super(Comment);
    }

    async post (req: IRequest, res: Response) {
        try {

          const postid=req.params.postId;
             const comment = new Comment({
              content: (req.body as { content: string }).content, 
              author: req.body.user.id,
              post_id: postid,
              createdAt: Date.now(),
          });
            await comment.save();
            await Post.findByIdAndUpdate(postid,
               { $push: { comments: comment._id } }),
               { new: true}
            res.status(201).send(comment);
          } catch (error) {
            console.log(error.message)
            res.status(400).send(error.message);
          }
    }

    
  
async get(req: IRequest, res: Response) {
      try{
      const postid=req.params.postId;
      const comments = await Comment.find({post_id:postid});
      res.status(200).send(comments);
      }catch(error){
        console.log(error.message)
        res.status(400).send(error.message);
      }
    }  

async delete(req: IRequest, res: Response) {
  try{
    const commentid=req.params.commentId;
    const postid=req.params.postId;
    await Comment.findByIdAndDelete(commentid);
    await Post.findByIdAndUpdate(postid,
      { $pull: { comments: commentid } },
      { new: true }
    );
    res.status(200).send("comment deleted");
  }catch(error){
    console.log(error.message)
    res.status(400).send(error.message);
    }

  }
}

export default new Commentcontroller();