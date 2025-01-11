import { getLoggedInUser } from "@/lib/loggedin-user";
import { Watch } from "@/model/watch-model";
import { getLesson } from "@/queries/lessons";
import { getModuleBySlug } from "@/queries/modules";
import { createWatchReport } from "@/queries/reports";
import dbConnect from "@/service/mongo";
import { NextResponse } from "next/server";

const STARTED = "started";
const COMPLETED = "completed";

async function updateReport(userId, courseId, moduleId, lessonId) {
    try {
        createWatchReport({userId, courseId, moduleId, lessonId})
    } catch (err) {
        throw new Error(err);
    }
}


export async function POST(request) {
    const { courseId, lessonId, moduleSlug, state, lastTime } = await request.json();

    const lesson = await getLesson(lessonId);
    const loggedinUser = await getLoggedInUser();
    const myModule = await getModuleBySlug(moduleSlug);

    if (!loggedinUser) {
        return new NextResponse(`You are not authenticated.`, {
            status: 401,
        });
    }

    if (state !== STARTED && state !== COMPLETED) {
        return new NextResponse(`Invalid state. Can not process request.`, {
            status: 500,
        });
    }

    if (!lesson) {
        return new NextResponse(`Invalid lesson. Can not process request.`, {
            status: 500,
        });
    }

    const watchEntry = {
        lastTime,
        lesson: lesson.id,
        module: myModule.id,
        user: loggedinUser.id,
        state,
    };

    await dbConnect();

    try {
        const found = await Watch.findOne({
            lesson: lessonId,
            module: myModule.id,
            user: loggedinUser.id,
        }).lean();

        if (state === STARTED) {
            if (!found) {
                watchEntry["created_at"] = Date.now();
                await Watch.create(watchEntry);
            }
        } else if (state === COMPLETED) {
            if (!found) {
                watchEntry["created_at"] = Date.now();
                await Watch.create(watchEntry);

                await updateReport(loggedinUser.id, courseId, myModule.id, lessonId)
            } else {
                if (found.state === STARTED) {
                    watchEntry["modified_at"] = Date.now();
                    await Watch.findByIdAndUpdate(found._id, {
                        state: COMPLETED,
                    });

                    await updateReport(loggedinUser.id, courseId, myModule.id, lessonId)
                }
            }
        }
        return new NextResponse("Watch Record added Successfully.", {
            status: 200,
        });
    } catch (error) {
        console.error(error);
        return new NextResponse(error.message, {
            status: 500,
        });
    }
}
