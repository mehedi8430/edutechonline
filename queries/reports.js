import { replaceMongoIdInObject } from "@/lib/convertData";
import { Assessment } from "@/model/assessment-model";
import { Module } from "@/model/module-model";
import { Report } from "@/model/report-model";
import dbConnect from "@/service/mongo";
import mongoose from "mongoose";

export async function getAReport(filter) {
    await dbConnect();

    try {
        const report = await Report.findOne(filter)
            .populate({
                path: "quizAssessment",
                model: Assessment,
            }).lean();

        return replaceMongoIdInObject(report);
    } catch (error) {
        throw new Error(error)
    }
}

export async function createWatchReport(data) {
    await dbConnect();

    try {
        let report = await Report.findOne({
            course: data.courseId,
            student: data.userId,
        });

        if (!report) {
            report = await Report.create({
                course: data.courseId,
                student: data.userId,
            });
        }

        const foundLesson = report.totalCompletedLessons.find(
            (lessonId) => lessonId.toString() === data.lessonId
        );

        if (!foundLesson) {
            report.totalCompletedLessons.push(
                new mongoose.Types.ObjectId(data.lessonId)
            );
        }

        const myModule = await Module.findById(data.moduleId);
        const lessonIdsToCheck = myModule.lessonIds;
        const completedLessonsIds = report.totalCompletedLessons;

        const isModuleComplete = lessonIdsToCheck.every((lesson) =>
            completedLessonsIds.includes(lesson)
        );

        if (isModuleComplete) {
            const foundModule = report.totalCompletedModeules.find(
                (module) => module.toString() === data.moduleId
            );
            
            if (!foundModule) {
                report.totalCompletedModeules.push(
                    new mongoose.Types.ObjectId(data.moduleId)
                );
            }
        }

        report.save();
    } catch (error) {
        throw new Error(error);
    }
}