import {useState} from "react";
import {Box, Button, Container} from "@mui/material";
import NewParticipantDialog from "./NewParticipantDialog.tsx";
import ParticipantTable from "./ParticipantTable.tsx";
import useCourses from "../hooks/useCourses.tsx";
import {Participant} from "../models/Participant.ts";

import {useLocation} from "react-router-dom";

export default function ParticipantApp() {
    const {loading,updateCourse }=useCourses();
    const { state } = useLocation();

    const [open, setOpen] = useState<boolean>(false);


    const updateCourseFromState = () => {
        updateCourse(state.courseToUpdate.id,
            {
                courseType:state.courseToUpdate.courseType,
                courseLevel:state.courseToUpdate.courseLevel,
                instructorId:state.courseToUpdate.instructorId,
                participants:state.courseToUpdate.participants,
                completed:state.courseToUpdate.completed
            }
        );
    }

    function addParticipant(newParticipant: Participant) {

        state.courseToUpdate.participants.push(newParticipant);
        console.log(state.courseToUpdate);
        updateCourseFromState();

    }

    function deleteParticipant(participant: Participant) {

        state.courseToUpdate.participants = state.courseToUpdate.participants.filter((p: Participant) =>
            p.firstName !== participant.firstName ||
            p.lastName !== participant.lastName ||
            p.phoneNumber !== participant.phoneNumber
        );
        updateCourseFromState();
    }

    function updateParticipant(
        originalParticipant: Participant,
        updatedParticipant: Participant
    ){

        state.courseToUpdate.participants = state.courseToUpdate.participants.map((p: Participant) =>
                p.firstName === originalParticipant.firstName &&
                p.lastName === originalParticipant.lastName &&
                p.phoneNumber === originalParticipant.phoneNumber
                    ? updatedParticipant
                    : p
        );
        updateCourseFromState();
    }

    function handleOpen(){
        setOpen(true);
    }
    function handleClose(){
        setOpen(false);
    }
    return (
        <Box sx={{mt: 2}}>
            <Container>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                }}>
                    <Button sx={{mb: 2}} onClick={handleOpen} variant={"outlined"}>Neuer Teilnehmer</Button>
                    <button onClick={() => history.back()}>Back</button>
                </Box>
                {
                    state.courseToUpdate ? (
                <ParticipantTable course={state.courseToUpdate} participants={state.courseToUpdate.participants} updateParticipant={updateParticipant} deleteParticipant={deleteParticipant} loadingParticipant={loading}/>
                    ): (<p>Kurs nicht gefunden</p>)
                }
                <NewParticipantDialog open={open} onClose={handleClose} addParticipant={addParticipant}/>
            </Container>
        </Box>
    );

}