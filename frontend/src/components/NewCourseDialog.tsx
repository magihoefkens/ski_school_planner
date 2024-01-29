import {CourseDto} from "../models/CourseDto.ts";
import {Instructor} from "../models/Instructor.ts";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import NewCourseForm from "./NewCourseForm.tsx";

type NewCourseDialogProps={
    open:boolean,
    onClose:() => void,
    addCourse:(course:CourseDto)=>void,
    instructors:Instructor[],
}
export default function NewCourseDialog(props:NewCourseDialogProps){
    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
        >
            <DialogTitle>Neuer Kurs</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Hier kannst du einen neuen Kurs hinzufügen.
                </DialogContentText>
                <NewCourseForm
                    instructors={props.instructors}
                    addCourse={props.addCourse}
                    closeDialog={props.onClose}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Abbrechen</Button>
            </DialogActions>
        </Dialog>
    );
}