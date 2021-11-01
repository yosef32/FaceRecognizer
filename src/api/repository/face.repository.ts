import { Model } from "mongoose";
import { FaceModel } from "../../models/Face";

export default class FaceRepository {

    constructor() { }

    public async addPerson(vector: Array<Array<number>>) {
        const model = new FaceModel();
        model.vector = vector;
        return model.save();
    }
    public async getByID(id: string) {
        return FaceModel.findById(id);
    }
    public async all() {
        return FaceModel.find({});
    }
    public async allExcept(id: string) {
        return FaceModel.find({ "_id": { "$ne": id } });
    }


}