import useParticipant from "../hooks/useParticipant.tsx";
import {useEffect, useState} from "react";
import {Course} from "../models/Course.ts";
import {Box, Button, Container} from "@mui/material";
import NewParticipantDialog from "./NewParticipantDialog.tsx";
import ParticipantTable from "./ParticipantTable.tsx";
import {useParams} from "react-router-dom";

type ParticipantAppProps={
    courses:Course[];
}

export default function ParticipantApp(props:ParticipantAppProps) {
    const[courseToUpdate,setCourseToUpdate]=useState<Course |undefined>();
    const { id: pathId } = useParams();
    useEffect(() => {
        const cours = props.courses.find(course=>(course.id===pathId))
        if(cours) {
            setCourseToUpdate(cours);

        }else {
            console.error("Kurs wurde nicht gefunden")
        }

    }, [pathId]);

    const [open, setOpen] = useState<boolean>(false);
    const {participants,addParticipant,updateParticipant,deleteParticipant,loading}=useParticipant(courseToUpdate)
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
                    courseToUpdate ? (
                <ParticipantTable course={courseToUpdate} participants={participants} updateParticipant={updateParticipant} deleteParticipant={deleteParticipant} loadingParticipant={loading}/>
                    ): (<p>Kurs nicht gefunden</p>)
                }
                <NewParticipantDialog open={open} onClose={handleClose} addParticipant={addParticipant}/>
            </Container>
        </Box>
    );

}