import {CourseType} from "./CourseType.ts";
import {CourseLevel} from "./CourseLevel.ts";
import {Participant} from "./Participant.ts";

export type CourseDto={
    courseType: CourseType,
    courseLevel: CourseLevel,
    instructorId: string,
    participants: Participant[],
    completed: boolean,

}