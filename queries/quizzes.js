import { Quizset } from "@/model/quizset-model";
import { Quiz } from "@/model/quizzes-model";

import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";
import dbConnect from "@/service/mongo";

export async function getAllQuizSets(excludeUnPublished) {
    await dbConnect();

    try {
        let quizSets = [];

        if (excludeUnPublished) {
            quizSets = await Quizset.find({active: true}).lean();
        } else {
            quizSets = await Quizset.find().lean();
        }
          return replaceMongoIdInArray(quizSets);
    } catch (e) {
        throw new Error(e);
    }
}

export async function getQuizSetById(id) {
    await dbConnect();

    try {
        const quizSet = await Quizset.findById(id)
            .populate({
                path: "quizIds",
                model: Quiz,
          }).lean();
          return replaceMongoIdInObject(quizSet);
    } catch (e) {
        throw new Error(e);
    }
}

export async function createQuiz(quizData) {
    await dbConnect();
    
    try{
        const quiz = await Quiz.create(quizData);
        return quiz._id.toString();
    } catch (e) {
        throw new Error(e);
    }
}