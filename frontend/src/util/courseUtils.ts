// courseUtils.ts
import { CourseType } from "../models/CourseType";
import { Instructor } from "../models/Instructor";

export function getInstructorsByQualification(courseType: CourseType, instructors: Instructor[]): Instructor[] {
    return instructors.filter(instructor => {
        switch (courseType) {
            case CourseType.SKI:
                return instructor.qualification.isSkiInstructor;
            case CourseType.SNOWBOARD:
                return instructor.qualification.isSnowboardInstructor;
            case CourseType.NORDIC_SKI:
                return instructor.qualification.isNordicSkiInstructor;
            case CourseType.SEGWAY:
                return instructor.qualification.isSegwayInstructor;
            case CourseType.HIKE:
                return instructor.qualification.isHikingGuide;
            default:
                return false;
        }
    });
}
