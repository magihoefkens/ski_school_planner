import {Participant} from "./Participant.ts";
import {CourseLevel} from "./CourseLevel.ts";
import {CourseType} from "./CourseType.ts";

export type Course={
    id: string,
    courseType: CourseType,
    courseLevel: CourseLevel,
    instructorId: string,
    participants: Participant[],
    completed: boolean,
}