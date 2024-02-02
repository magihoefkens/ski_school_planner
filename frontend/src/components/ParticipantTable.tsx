import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import ParticipantRow from "./ParticipantRow.tsx";
import { Participant } from "../models/Participant.ts";
import {Course} from "../models/Course.ts";
type ParticipantTableProps={
    course:Course;
    participants:Participant[];
    updateParticipant:(oldParticipant:Participant,newParticipant:Participant)=>void;
    deleteParticipant:(participant:Participant)=>void;
    loadingParticipant:boolean;
}
export default function ParticipantTable(props:Readonly<ParticipantTableProps>) {
    const courseToEdit=props.course;
    const courseParticipants=courseToEdit.participants;
    const participantRows = courseParticipants.map((participant: Participant) =>
        <ParticipantRow key={participant.firstName+participant.lastName+participant.phoneNumber}
            updateParticipant={props.updateParticipant}
            handleDeleteParticipant={props.deleteParticipant}
            participant={participant}
            isLoading={props.loadingParticipant}
        />);



   return(
       <Box>

           <TableContainer component={Paper}>
               <Table stickyHeader aria-label="sticky table">
                   <TableHead>
                       <TableRow>
                           <TableCell component={"th"}><strong>Vorname</strong></TableCell>
                           <TableCell component={"th"}><strong>Nachname</strong></TableCell>
                           <TableCell component={"th"}><strong>Telefonnummer</strong></TableCell>
                           <TableCell component={"th"}><strong>Löschen</strong></TableCell>
                       </TableRow>

                   </TableHead>
                   <TableBody>{participantRows}</TableBody>
               </Table>

           </TableContainer>
       </Box>

   );

}