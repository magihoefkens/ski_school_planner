import {Box, Button,  FormControl, TextField} from "@mui/material";
import {Participant} from "../models/Participant.ts";
import {ChangeEvent, FormEvent, useState} from "react";
type NewParticipantFormProps={
    addParticipant:(participant:Participant) =>void;
    closeDialog:()=>void;
}
export default function NewParticipantForm(props:NewParticipantFormProps) {
    const addParticipant = props.addParticipant;
    const [participant, setParticipant] = useState<Participant>({
        firstName: "", lastName: "", phoneNumber: ""
    });
    function handleSubmitNewParticipant(event:FormEvent<HTMLFormElement>){
        event.preventDefault();
        props.closeDialog();
        console.log(participant);
        addParticipant(participant, );
    }
    function handleChangeName(event: ChangeEvent<HTMLInputElement>) {
        setParticipant({...participant,[event.target.name]:event.target.value});
    }
    return (
        <Box sx={{minWidth: 120, mt: 2}} component={"form"} onSubmit={handleSubmitNewParticipant}>
            <FormControl fullWidth sx={{gap: 2}}>
                <TextField value={participant.firstName}
                           name="firstName"
                           onChange={handleChangeName}
                           label="Vorname"
                           variant="outlined"/>
                <TextField value={participant.lastName}
                           name="lastName"
                           onChange={handleChangeName}
                           label="Nachname"
                           variant="outlined"/>
                <TextField value={participant.phoneNumber}
                           name="phoneNumber"
                           onChange={handleChangeName}
                           label="Telefon"
                           variant="outlined"/>
                <Button type={"submit"}>Hinzufügen</Button>
            </FormControl>
        </Box>
    );

}
