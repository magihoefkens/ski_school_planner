import {Checkbox, CircularProgress, Grid, IconButton, TableCell, TableRow, TextField} from "@mui/material";
import {Instructor} from "../models/Instructor.ts";
import {InstructorDto} from "../models/InstructorDto.ts";
import {ChangeEvent, useState} from "react";
import Swal from 'sweetalert2';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type InstructorCardProps = {
    instructor: Instructor;
    deleteInstructor: (id: string) => void;
    updateInstructor: (id: string, instructor: InstructorDto) => void;
    loadingInstructor:boolean;

}
export default function InstructorRow(props: InstructorCardProps) {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [instructor, setInstructor] = useState<Instructor>(props.instructor);

    function handleEditInstructor() {
        setEditMode(true);
    }

    function handleChangeName(event: ChangeEvent<HTMLInputElement>) {
        setInstructor({...instructor, [event.target.name]: event.target.value})
    }
    function handleCheckbox(event:ChangeEvent<HTMLInputElement>){
        const {name,checked}=event.target;

        setInstructor(
            (prevInstructor) => ({
                ...prevInstructor,
                qualification: {
                    ...prevInstructor.qualification,
                    [name]:checked,
                },
            })
        );
        console.log(instructor)
    }
    function handleUpdateInstructor() {
        Swal.fire({
            title: 'Änderungen speichern?',
            text: "Möchtest du die Änderungen speichern?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Abbrechen',
            confirmButtonText: 'Ja, bitte speichern!',
        }).then((result) => {
            if (result.isConfirmed) {
                props.updateInstructor(instructor.id, instructor);
                setEditMode(false);
            }
            setEditMode(false);
        });
    }
    function handleDeleteInstructor() {
        Swal.fire({
            title: 'Möchtest du ' + instructor.firstName + ' ' + instructor.lastName + ' wirklich löschen?',
            text: "Bist du sicher?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Abbrechen',
            confirmButtonText: 'Ja, bitte löschen!',
        }).then((result) => {
            if (result.isConfirmed) {
                props.deleteInstructor(instructor.id);
            }
        })
    }



    return (
        <TableRow>
            <TableCell component = {"td"} onClick = {handleEditInstructor} >
                {
                    editMode ?
                    <TextField
                        name = {"firstName"}
                        value = {instructor.firstName}
                        onChange = {handleChangeName}
                    /> :
                    instructor.firstName
                }
            </TableCell>
            <TableCell component = {"td"} onClick = {handleEditInstructor} >
                {
                    editMode ?
                    <TextField
                        name = {"lastName"}
                         value = {instructor.lastName}
                        onChange = {handleChangeName}
                    /> :
                    instructor.lastName
                }
            </TableCell>
            <TableCell component = {"td"} onClick = {handleEditInstructor} >
                {
                    editMode ?
                        <TextField
                            name = {"phoneNumber"}
                            value = {instructor.phoneNumber}
                            onChange = {handleChangeName}
                        /> :
                        instructor.phoneNumber
                }
            </TableCell>
            <TableCell component = {"td"} onClick = {handleEditInstructor} >
                {
                    editMode ?
                        <TextField
                            name = {"email"}
                            value = {instructor.email}
                            onChange = {handleChangeName}
                        /> :
                        instructor.email
                }
            </TableCell>
            <TableCell component={"td"} onClick={handleEditInstructor}>
                <Grid container spacing={5} >
                    <Grid item xs={2}>
                        {editMode ?
                            <Checkbox checked={instructor.qualification.isSkiInstructor} onChange={handleCheckbox} name="isSkiInstructor" /> :instructor.qualification.isSkiInstructor

                        }
                        {instructor.qualification.isSkiInstructor ? <CheckIcon color = {"success"}/> : <CloseIcon color = {"error"}/>}
                    </Grid>
                    <Grid item xs={2}>
                        {editMode ?
                            <Checkbox checked={instructor.qualification.isSnowboardInstructor} onChange={handleCheckbox} name="isSnowboardInstructor" /> :instructor.qualification.isSnowboardInstructor

                        }
                        {instructor.qualification.isSnowboardInstructor ? <CheckIcon color = {"success"}/> : <CloseIcon color = {"error"}/>}
                    </Grid>
                    <Grid item xs={2}>

                        {editMode ?
                            <Checkbox checked={instructor.qualification.isNordicSkiInstructor} onChange={handleCheckbox} name="isNordicSkiInstructor" /> :instructor.qualification.isNordicSkiInstructor

                        }
                        {instructor.qualification.isNordicSkiInstructor ? <CheckIcon color = {"success"}/> : <CloseIcon color = {"error"}/>}
                    </Grid>
                    <Grid item xs={2}>
                        {
                            editMode ?
                            <Checkbox checked={instructor.qualification.isSegwayInstructor} onChange={handleCheckbox} name="isSegwayInstructor" /> :instructor.qualification.isSegwayInstructor

                        }
                        {instructor.qualification.isSegwayInstructor ? <CheckIcon color = {"success"}/> : <CloseIcon color = {"error"}/>}
                    </Grid>
                    <Grid item xs={2}>
                        {editMode ?
                            <Checkbox checked={instructor.qualification.isHikingGuide} onChange={handleCheckbox} name="isHikingGuide" /> :instructor.qualification.isHikingGuide

                        }
                        {instructor.qualification.isHikingGuide ? <CheckIcon color = {"success"}/> : <CloseIcon color = {"error"}/>}
                    </Grid>

                </Grid>
            </TableCell>
            < TableCell component = {"td"} >
                 {
                    editMode ?
                        <>
                            <IconButton onClick = {handleUpdateInstructor}>
                                <CheckIcon color = {"success"}/>
                            </IconButton>
                            <IconButton onClick = {() => setEditMode(false)}>
                                <CloseIcon color = {"error"}/>
                             </IconButton>
                        </> :
                    <IconButton onClick = {handleDeleteInstructor}>
                        {
                            props.loadingInstructor ?
                            <CircularProgress color = {"error"}/> :
                            <DeleteForeverIcon color = {"error"}/>
                        }
                    </IconButton>
                 }
            </TableCell>
        </TableRow>
    )

}