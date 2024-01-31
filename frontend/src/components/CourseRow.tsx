import {Course} from "../models/Course.ts";
import {CourseDto} from "../models/CourseDto.ts";
import {Instructor} from "../models/Instructor.ts";
import {ChangeEvent, Fragment, useState} from "react";
import Swal from "sweetalert2";
import {
    Button,
    CircularProgress, Divider,
    IconButton, List, ListItem, ListItemText,
    MenuItem,
    Select,
    SelectChangeEvent, Switch,
    TableCell,
    TableRow,
} from "@mui/material";

import {CourseType} from "../models/CourseType.ts";
import {CourseLevel} from "../models/CourseLevel.ts";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {useNavigate} from "react-router-dom";
import {getInstructorsByQualification} from "../util/courseUtils.ts";

export type CourseRowProps = {
    course: Course;
    handleDeleteCourse: (id: string) => void;
    isLoading: boolean;
    updateCourse: (id: string, course: CourseDto) => void;
    instructors: Instructor[];
}
const style = {
    p: 0,
    width: '100%',
    maxWidth: 360,
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
};

export default function CourseRow(props:Readonly<CourseRowProps>){
    const [editMode,setEditMode]=useState<boolean>(false);
    const[courseToUpdate,setCourseToUpdate]=useState<Course>(props.course);
    const[checked,setChecked]=useState<boolean>(props.course.completed);
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
    function handleChangeCompleted(event:ChangeEvent<HTMLInputElement>){
        const value=event.target.checked;
        setChecked(value);
        setCourseToEdit({...courseToEdit,completed:value});
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
                <Switch
                    checked={checked}
                    onChange={handleChangeCompleted}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </TableCell>
            <TableCell component={"td"}>
                <List sx={style} aria-label="teilnenmer folders">
                {courseToEdit.participants.map((participant, index) => (
                    <Fragment key={participant.lastName}>
                        <ListItem>
                            <ListItemText primary={`${participant.firstName} ${participant.lastName} - ${participant.phoneNumber}`} />
                        </ListItem>
                        {index < courseToEdit.participants.length - 1 && <Divider />}
                    </Fragment>
                ))}
                </List>
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
