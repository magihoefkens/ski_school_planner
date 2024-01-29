import {Course} from "../models/Course.ts";
import {CourseDto} from "../models/CourseDto.ts";
import {Instructor} from "../models/Instructor.ts";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import CourseRow from "./CourseRow.tsx";

type CourseTableProps={
    courses:Course[];
    handleDeleteCourse:(id:string) => void;
    isLoading:boolean;
    updateCourse:(id:string,course:CourseDto) =>void;
    instructors:Instructor[];
}


export default function CourseTable(props:CourseTableProps){
    const courseRows = props.courses.map(course =>
        <CourseRow
            instructors={props.instructors}
            key={course.id}
            updateCourse={props.updateCourse}
            isLoading={props.isLoading}
            handleDeleteCourse={props.handleDeleteCourse}
            course={course}
        />);

    return(
        <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell component={"th"}><strong>Kursart</strong></TableCell>
                        <TableCell component={"th"}><strong>Kurslevel</strong></TableCell>
                        <TableCell component={"th"}><strong>Instruktor</strong></TableCell>
                        <TableCell component={"th"}><strong>Ist der Kurs vollständig?</strong></TableCell>
                        <TableCell component={"th"}><strong>Teilnehmer</strong></TableCell>
                        <TableCell component={"th"}><strong>Löschen</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {courseRows}
                </TableBody>
            </Table>
        </TableContainer>
    );
}