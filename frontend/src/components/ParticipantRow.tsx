import {Participant} from "../models/Participant.ts";
import {useState} from "react";
import {CircularProgress, IconButton, TableCell, TableRow, TextField} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Swal from "sweetalert2";

type ParticipantRowProps={
    participant:Participant;
    handleDeleteParticipant:(participant:Participant) =>void;
    updateParticipant:(participant:Participant,participantToEdit:Participant) => void;
    isLoading:boolean;
}
export default function ParticipantRow(props:ParticipantRowProps){
    const[editMode,setEditMode]=useState<boolean>(false);
    const[participantToEdit,setParticipantToEdit]=useState<Participant>({
        firstName:props.participant.firstName,
        lastName:props.participant.lastName,
        phoneNumber:props.participant.phoneNumber,

    });
    function handleEditParticipantButtonClick(){
        Swal.fire({
            title: 'Bist du sicher?',
            text: "Du kannst die Änderungen nicht rückgängig machen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ja, speichern!',
            cancelButtonText: 'Abbrechen'
        }).then((result) => {
            if (result.isConfirmed) {
                props.updateParticipant(props.participant,participantToEdit);
                setEditMode(false);
            }
            if (result.isDismissed) {
                setEditMode(false);
            }
        });

    }
    function handleDeleteParticipantButtonClick() {
        Swal.fire({
            title: 'Bist du sicher?',
            text: "Du kannst diesen Kurs nicht wiederherstellen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ja, löschen!',
            cancelButtonText: 'Abbrechen'

        }).then((result) => {
            if (result.isConfirmed) {
                props.handleDeleteParticipant(props.participant);
            }
        }).then()
    }
    return(
        <TableRow>
            <TableCell component={"td"} onClick={()=>setEditMode(true)}>
                {
                    editMode ?
                        <TextField
                            label={"Vorname"}
                            value={participantToEdit.firstName}
                            onChange={(event) => setParticipantToEdit({...participantToEdit, firstName: event.target.value})}
                        /> :
                        props.participant.firstName

                }
            </TableCell>
            <TableCell component={"td"} onClick={()=>setEditMode(true)}>
                {
                    editMode ?
                        <TextField
                            label={"Nachname"}
                            value={participantToEdit.lastName}
                            onChange={(event) => setParticipantToEdit({...participantToEdit, lastName: event.target.value})}
                        /> :
                        props.participant.lastName

                }
            </TableCell>
            <TableCell component={"td"} onClick={()=>setEditMode(true)}>
                {
                    editMode ?
                        <TextField
                            label={"Telefon"}
                            value={participantToEdit.phoneNumber}
                            onChange={(event) => setParticipantToEdit({...participantToEdit, phoneNumber: event.target.value})}
                        /> :
                        props.participant.phoneNumber

                }
            </TableCell>

            <TableCell component={"td"}>
                {
                    editMode ?
                        <>
                            <IconButton onClick={handleEditParticipantButtonClick}>
                                <CheckIcon color={"success"}/>
                            </IconButton>
                            <IconButton onClick={() => setEditMode(false)}>
                                <CloseIcon color={"error"}/>
                            </IconButton>
                        </> :
                        <IconButton onClick={handleDeleteParticipantButtonClick}>
                            {
                                    props.isLoading ?
                                    <CircularProgress color={"error"}/>:
                                    <DeleteForeverIcon color={"error"}/>
                            }
                        </IconButton>
                }
            </TableCell>
        </TableRow>
    )

}