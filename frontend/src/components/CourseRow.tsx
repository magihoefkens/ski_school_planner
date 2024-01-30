import {Course} from "../models/Course.ts";
import {CourseDto} from "../models/CourseDto.ts";
import {Instructor} from "../models/Instructor.ts";
import {useState} from "react";
import Swal from "sweetalert2";
import {
    Button,
    CircularProgress,
    IconButton,
    MenuItem,
    Select,
    SelectChangeEvent,
    TableCell,
    TableRow,
} from "@mui/material";
import {CourseType} from "../models/CourseType.ts";
import {CourseLevel} from "../models/CourseLevel.ts";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {useNavigate} from "react-router-dom";

export type CourseRowProps = {
    course: Course;
    handleDeleteCourse: (id: string) => void;
    isLoading: boolean;
    updateCourse: (id: string, course: CourseDto) => void;
    instructors: Instructor[];
}
export default function CourseRow(props:CourseRowProps){
    const [editMode,setEditMode]=useState<boolean>(false);
    const[courseToUpdate,setCourseToUpdate]=useState<Course>(props.course);
    const [courseToEdit,setCourseToEdit]=useState<CourseDto>({
        courseType:props.course.courseType,
        courseLevel:props.course.courseLevel,
        instructorId:props.course.instructorId,
        participants:props.course.participants,
        completed:props.course.completed
    });
    const [filteredInstructorsByCourseType,setFilteredInstructorsByCourseType]=useState<Instructor[]>(props.instructors);
    const navigate = useNavigate();
    async function handleRouteToParticipantDialog(){
        console.log(props.course.id)
        setCourseToUpdate(props.course);
        console.log('Setting course to update');
        console.log(courseToUpdate);


        navigate(`/courses/${props.course.id}`, {state: { courseToUpdate: courseToUpdate} });

        setEditMode(false);
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
    function getInstructorName(instructorId:string) {
        const selectedInstructor = filteredInstructorsByCourseType.find(instructor => instructor.id === instructorId);
        return selectedInstructor ? `${selectedInstructor.firstName} ${selectedInstructor.lastName}` : '';
    }

    function handleDeleteCourseButtonClick() {
        Swal.fire({
            title: 'Bist du sicher?',
            text: "Du kannst diesen Kurs nicht wiederherstellen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Löschen',
            cancelButtonText: 'Abbrechen'

        }).then((result) => {
            if (result.isConfirmed) {
                props.handleDeleteCourse(props.course.id);
            }
        }).then()
    }
    function handleChangeCourseType(event:SelectChangeEvent){
        const value = event.target.value;
        setCourseToEdit({...courseToEdit, courseType: value as CourseType});
        const filteredInst=getInstructorsByQualification(courseToEdit.courseType,props.instructors);
        setFilteredInstructorsByCourseType(filteredInst);
    }
    function handleChangeCourseLevel(event:SelectChangeEvent){
        const value=event.target.value;
        setCourseToEdit({...courseToEdit,courseLevel:value as CourseLevel})
    }
    function handleChangeInstructor(event:SelectChangeEvent){
        const value=event.target.value;
        setCourseToEdit({...courseToEdit,instructorId:value})
    }


    function handleEditCourseButtonClick() {
        Swal.fire({
            title: 'Bist du sicher?',
            text: "Du kannst die Änderungen nicht rückgängig machen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Speichern',
            cancelButtonText: 'Abbrechen'
        }).then((result) => {
            if (result.isConfirmed) {
                props.updateCourse(props.course.id, courseToEdit);
                setEditMode(false);
            }
            if (result.isDismissed) {
                setEditMode(false);
            }
        });


    }

    return (
        <TableRow>
            <TableCell
                component={"td"}
                onClick={() => setEditMode(true)}
            >
                {
                    editMode ?
                        <Select value ={courseToEdit.courseType}
                        onChange={handleChangeCourseType}
                        >
                            <MenuItem value={CourseType.SKI}>Ski</MenuItem>
                            <MenuItem value={CourseType.SNOWBOARD}>Snowboard</MenuItem>
                            <MenuItem value={CourseType.NORDIC_SKI}>Nordic-Ski</MenuItem>
                            <MenuItem value={CourseType.SEGWAY}>Segway</MenuItem>
                            <MenuItem value={CourseType.HIKE}>Hiking</MenuItem>
                        </Select> :
                        props.course.courseType
                }
            </TableCell>
            <TableCell
                component={"td"}
                onClick={() => setEditMode(true)}
            >
                {
                    editMode ?
                        <Select value ={courseToEdit.courseLevel}
                                onChange={handleChangeCourseLevel}
                        >
                            <MenuItem value={CourseLevel.BEGINNER}>Anfänger</MenuItem>
                            <MenuItem value={CourseLevel.INTERMEDIATE}>Mittelschwer</MenuItem>
                            <MenuItem value={CourseLevel.ADVANCED}>Fortgeschritten</MenuItem>
                        </Select> :
                        props.course.courseLevel
                }
            </TableCell>
            <TableCell
                component={"td"}
                onClick={() => setEditMode(true)}
            >
                {
                    editMode ?
                        <Select value ={courseToEdit.instructorId}
                                onChange={handleChangeInstructor}
                        >
                            {filteredInstructorsByCourseType.map(instructor=>(
                                    <MenuItem key={instructor.id} value={instructor.id}>{instructor.firstName} {instructor.lastName}</MenuItem>
                                ))}

                        </Select> :

                        getInstructorName(props.course.instructorId)
                }
            </TableCell>
            <TableCell component={"td"}
                       onClick={() => setEditMode(true)}>
                {props.course.completed ?  <CheckIcon color={"success"}/>: <CloseIcon color={"error"}/>}
            </TableCell>
            <TableCell component={"td"}>
                {
                courseToEdit.participants.map((participant) => (
                <div key={participant.lastName}>
                    {`${participant.firstName} ${participant.lastName} - ${participant.phoneNumber}`}
                </div>
                ))
                    }

                <Button variant={"outlined"} onClick={handleRouteToParticipantDialog} sx={{mb: 2}}>Teilnehmer verwalten</Button>
            </TableCell>



            <TableCell component={"td"}>
                {
                   editMode ?
                        <>
                            <IconButton onClick={handleEditCourseButtonClick}>
                                <CheckIcon color={"success"}/>
                            </IconButton>
                            <IconButton onClick={() => setEditMode(false)}>
                                <CloseIcon color={"error"}/>
                            </IconButton>
                        </> :
                        <IconButton onClick={handleDeleteCourseButtonClick}>
                            {
                                props.isLoading ?
                                    <CircularProgress color={"error"}/> :
                                    <DeleteForeverIcon color={"error"}/>
                            }
                        </IconButton>
                }
            </TableCell>

        </TableRow>
    );
}
