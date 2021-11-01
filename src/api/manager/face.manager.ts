import { Face } from "../../models/Face";
import FaceRepository from "../repository/face.repository";

export default class FaceManager {

    private repository: FaceRepository;

    constructor() {
        this.repository = new FaceRepository()
    }

    public async addPerson(vector: Array<number>) {
        const splitVector = this.splitVector(vector);
        console.log(splitVector)
        return this.repository.addPerson(splitVector);
    }
    public async finedPerson(id: string) {
        const face = await this.repository.getByID(id);
        if (face) {
            return this.compere(face._id, face.vector);
        }
        return face;
    }

    public allFaces() {
        return this.repository.all();
    }

    public allFacesExcept(id: string) {
        return this.repository.allExcept(id);
    }

    private async compere(id: string, vector: Array<Array<number>>) {
        const allFaces = await this.allFacesExcept(id);
        const topThree: { id: string, score: number, vector: Array<Array<number>> }[] = [];
        allFaces.forEach((face, i) => {
            let score = 0;
            vector.forEach((partA, j) => {
                const partB = face.vector[j];
                score += this.compereArraysValue(partA, partB);
                for (let x = 0; x < topThree.length; x++) {
                    const top = topThree[x];
                    if (top.score <= score) {
                        topThree.splice(x, 0, { id: face._id, score, vector: face.vector });
                        if (topThree.length > 3) {
                            topThree.pop();
                        }
                        return;
                    }
                }
            })
            if (topThree.length == 0) {
                topThree.push({ id: face._id, score, vector: face.vector })
            }
        });
        return topThree.map((top) => {
            let vector: Array<number> = [];
            top.vector.forEach((part) => {
                vector = vector.concat(part);
            })
            return {
                id: top.id,
                vector
            }
        });
    }

    private compereArraysValue<T>(a: Array<T>, b: Array<T>) {
        let sum = 0;
        a.forEach((val, i) => {
            if (val === b[i]) {
                sum++;
            }
        })
        return sum;
    }

    private splitVector(vector: Array<number>) {
        const splitArray: any[] = [];
        for (let i = 0; i < vector.length; i += 4) {
            splitArray.push(vector.slice(i, i + 4));
        }
        return splitArray;
    }

}