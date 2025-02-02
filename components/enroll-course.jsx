"use client";

import { createCheckoutSession } from "@/app/actions/stripe";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export const EnrollCourse = ({ asLink, courseId }) => {
    console.log("courseid", courseId)

    const formAction = async (data) => {
        console.log("data", data)
        const { url } = await createCheckoutSession(data);
        window.location.assign(url);
    }

    return (
        <form action={formAction}>
            <input type="hidden" name="courseId" value={courseId} />
            {
                asLink ? (
                    <Button
                        type="submit"
                        variant="ghost"
                        className="text-xs text-custom hover:text-customHover h-7 gap-1"
                    >
                        Enroll
                        <ArrowRight className="w-3" />
                    </Button>
                ) : (
                    <Button
                        type="submit"
                        className={cn(buttonVariants({ size: "lg" }))}
                    >
                        Enroll Now
                    </Button>
                )
            }
        </form>
    );
};
