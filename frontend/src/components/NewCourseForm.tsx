import {CourseDto} from "../models/CourseDto.ts";
import {Instructor} from "../models/Instructor.ts";
import { FormEvent, useState} from "react";
import {
    Box,
    Button,
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import {CourseType} from "../models/CourseType.ts";
import {CourseLevel} from "../models/CourseLevel.ts";



type NewCourseFormProps={
    addCourse:(course:CourseDto) => void;
    closeDialog:() =>void;
    instructors:Instructor[];
}
export default function NewCourseForm(props:Readonly<NewCourseFormProps>){
    const [courseDto, setCourseDto] = useState<CourseDto>({
        courseType: CourseType.SKI,
        courseLevel: CourseLevel.BEGINNER,
        instructorId:"",
        participants:[],
        completed:false,
    });
    const [filteredInstructorsByCourseType,setFilteredInstructorsByCourseType]=useState<Instructor[]>(props.instructors);

    function handleSubmitNewCourse(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.addCourse(courseDto);
        props.closeDialog();
    }
    function getInstructorsByQualification(courseType: CourseType, instructors: Instructor[]): Instructor[] {
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
        })
    }
    function handleChangeCourseType(event:SelectChangeEvent){
        const value = event.target.value;
        setCourseDto({...courseDto, courseType: value as CourseType});
        const filteredInst=getInstructorsByQualification(courseDto.courseType,props.instructors);
        setFilteredInstructorsByCourseType(filteredInst);
    }
    function handleChangeInstructor(event:SelectChangeEvent){
        const value=event.target.value;
        setCourseDto({...courseDto,instructorId:value})
    }


    return (
        <Box sx={{minWidth: 150, mt: 2}} component={"form"} onSubmit={handleSubmitNewCourse}>
            <FormControl fullWidth sx={{gap: 2}}>

                <Select value ={courseDto.courseType}
                        onChange={handleChangeCourseType}
                >
                    <MenuItem value={CourseType.SKI}>Ski</MenuItem>
                    <MenuItem value={CourseType.SNOWBOARD}>Snowboard</MenuItem>
                    <MenuItem value={CourseType.NORDIC_SKI}>Nordic-Ski</MenuItem>
                    <MenuItem value={CourseType.SEGWAY}>Segway</MenuItem>
                    <MenuItem value={CourseType.HIKE}>Hiking</MenuItem>
                </Select>
                <Select value ={courseDto.courseLevel}
                        onChange={(event) => setCourseDto({...courseDto,courseLevel:event.target.value as CourseLevel})}
                >
                    <MenuItem value={CourseLevel.BEGINNER}>Anfänger</MenuItem>
                    <MenuItem value={CourseLevel.INTERMEDIATE}>Mittelschwer</MenuItem>
                    <MenuItem value={CourseLevel.ADVANCED}>Fortgeschritten</MenuItem>
                </Select>
                <Select value ={courseDto.instructorId}
                        onChange={handleChangeInstructor}
                >
                    {filteredInstructorsByCourseType.map(instructor=>(
                        <MenuItem key={instructor.id} value={instructor.id}>{instructor.firstName} {instructor.lastName}</MenuItem>
                    ))}

                </Select>

                <Button variant="contained" type={"submit"}>Hinzufügen</Button>
            </FormControl>
        </Box>
    )
        ;
}