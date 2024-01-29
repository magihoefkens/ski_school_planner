import {Participant} from "../models/Participant.ts";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import NewParticipantForm from "./NewParticipantForm.tsx";

type NewParticipantDialogProps={
    open:boolean,
    onClose:()=>void,
    addParticipant:(participant:Participant)=>void
}

export default function NewParticipantDialog(props:NewParticipantDialogProps){
    return(
        <Dialog
            open={props.open}
            onClose={props.onClose}
            >
            <DialogTitle>Neuer Teilnehmer</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Füge Teilnehmer hinzu
            </DialogContentText>
            <NewParticipantForm
                closeDialog={props.onClose}
                addParticipant={props.addParticipant}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Abbrechen</Button>
            </DialogActions>
        </Dialog>
    )
}