import { Request, Response } from 'express';
import { Model } from 'mongoose';


class BaseController<T> {
    model: Model<T>;
    constructor(model: Model<T>) {
        this.model = model;
    }


    async post (req:Request, res:Response) {
        console.log(req.body);
        try{
            await this.model.create(req.body);
            res.send('Data saved to database');  
        }catch (err) {
            console.error(err);
            res.status(500).send('Unable to save data to database');
    } }

   
async get (req:Request, res:Response){
    try {
        const user = await this.model.findById(req.params.id);
        res.send(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Unable to retrieve data from database');
    }
}

async getAll (req:Request, res:Response) {

    try {
        const users = await this.model.find();
        res.send(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Unable to retrieve data from database');
    }
}


 async put (req:Request, res:Response){
    try {
        const { name, _id } = req.body;
        if (!name || !_id) {
            return res.status(400).send('Both name and _id are required');
        }
        await this.model.findByIdAndUpdate(req.params.id, { name, _id });
        res.send('Data updated in database');
    } catch (err) {
        console.error(err);
        res.status(500).send('Unable to update Data in database');
    }

}

async delete (req:Request, res:Response){
    try {
        await this.model.findByIdAndDelete(req.params.id);
        res.send('Data deleted from database');
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Unable to delete user from database');
    }
}



}   

const createController = <T>(model:Model<T>) => new BaseController<T>(model);
export default createController;