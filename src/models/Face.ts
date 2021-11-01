import mongoose, { model } from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export interface Face {
    id: any,
    vector: Array<Array<number>>,
}

const FaceSchema = new Schema<Face>({
    id: ObjectId,
    vector: Array,
});

export const FaceModel =  model<Face>('ModelName', FaceSchema);