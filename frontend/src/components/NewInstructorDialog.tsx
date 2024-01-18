import {InstructorDto} from "../models/InstructorDto.ts";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import NewInstructorForm from "./NewInstructorForm.tsx";

type NewInstructorDialogProps = {
    open:boolean,
    onClose: () =>void,
    addInstructor: (instructor:InstructorDto) => void,
}
export default function NewInstructorDialog(props:NewInstructorDialogProps){
    return(
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Neuer Skilehrer</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Skilehrer hinzufügen.
                </DialogContentText>
                <NewInstructorForm closeDialog={props.onClose} addInstructor={props.addInstructor}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Abbrechen</Button>
            </DialogActions>
        </Dialog>
    )
}