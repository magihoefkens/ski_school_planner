import useCourses from "../hooks/useCourses.tsx";
import useInstructors from "../hooks/useInstructors.tsx";
import {useState} from "react";
import {Box, Button, Container} from "@mui/material";
import SearchBar from "../util/SearchBar.tsx";
import CourseTable from "./CourseTable.tsx";
import NewCourseDialog from "./NewCourseDialog.tsx";
import TopBar from "../navigation/TopBar.tsx";

export default function CourseApp(){
    const {courses,deleteCourse,addCourse,loading,updateCourse}=useCourses();
    const{instructors}=useInstructors();
    const [openNewCourseDialog,setOpenNewCourseDialog]=useState<boolean>(false);
    const [searchTerm,setSearchTerm]=useState<string>("");
    function handleOpenNewCourseDialog(){
        setOpenNewCourseDialog(true);
    }
    function handleCloseNewCourseDialog(){
        setOpenNewCourseDialog(false);
    }
    const filteredCourses = courses.filter(course => {
        return course.courseType.toLowerCase().includes(searchTerm.toLowerCase());
    }).reverse();
    return (
        <>
        <TopBar/>
    <Box
        sx={{mt: 2}}
    >

        <Container>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
            }}>
                <Button variant={"outlined"} onClick={handleOpenNewCourseDialog} sx={{mb: 2}}>Neuer Kurs</Button>
                <SearchBar handleSearchTerm={setSearchTerm} placeholder={"Suche nach Kurs..."}/>
            </Box>
            <CourseTable
                isLoading={loading}
                instructors={instructors}
                updateCourse={updateCourse}
                handleDeleteCourse={deleteCourse}
                courses={filteredCourses}
            />
        </Container>
        <NewCourseDialog
            open={openNewCourseDialog}
            onClose={handleCloseNewCourseDialog}
            instructors={instructors}
            addCourse={addCourse}
        />
    </Box>
        </>
);
}