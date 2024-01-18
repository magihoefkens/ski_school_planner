import {Instructor} from "../models/Instructor.ts";
import {InstructorDto} from "../models/InstructorDto.ts";
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import InstructorRow from "./InstructorRow.tsx";

type InstructorTableProps= {
    instructors: Instructor[];
    deleteInstructor: (id: string) => void;
    updateInstructor: (id: string, instructor: InstructorDto) => void;
    loadingInstructor: boolean;
}
export default function InstructorTable( props: InstructorTableProps) {
    const instructor: Instructor[]=props.instructors;
    const instructorRows=instructor.map((instructor) => <InstructorRow key={instructor.id} loadingInstructor={props.loadingInstructor}
                                                                    updateInstructor={props.updateInstructor}
                                                                    deleteInstructor={props.deleteInstructor}
                                                                    instructor={instructor}/>)
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ width: '10%' }} align={"center"} component={"th"}><strong>Vorname</strong></TableCell>
                        <TableCell style={{ width: '10%' }} align={"center"} component={"th"}><strong>Nachname</strong></TableCell>
                        <TableCell style={{ width: '13%' }} align={"center"} component={"th"}><strong>Telefon</strong></TableCell>
                        <TableCell style={{ width: '20%' }} align={"center"} component={"th"}><strong>Email</strong></TableCell>
                        <TableCell style={{ width: '50%' }} align={"center"} component={"th"}><strong>Qualifikation</strong>
                            <Grid container spacing={5} wrap="wrap">
                                <Grid item xs={2}><Typography noWrap={false}>{'Ski-lehrer'}</Typography></Grid>
                                <Grid item xs={2}><Typography noWrap={false}>{'Snowbrd-lehrer'}</Typography></Grid>
                                <Grid item xs={2}><Typography noWrap={false}>{'Nordicski-lehrer'}</Typography></Grid>
                                <Grid item xs={2}><Typography noWrap={false}>{'Segway-lehrer'}</Typography></Grid>
                                <Grid item xs={2}><Typography noWrap={false}>{'Hiking-guide'}</Typography></Grid>
                            </Grid>
                        </TableCell>
                        <TableCell style={{ width: '2%' }} component={"th"}><strong>Löschen</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {instructorRows}
                </TableBody>
            </Table>
        </TableContainer>
    )
}