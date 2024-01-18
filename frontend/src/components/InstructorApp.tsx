
import {useState} from "react";
import {Box, Button, Container} from "@mui/material";
import SearchBar from "../util/SearchBar.tsx";
import InstructorTable from "./InstructorTable.tsx";
import useInstructors from "../hooks/useInstructors.tsx";
import NewInstructorDialog from "./NewInstructorDialog.tsx";


export default function InstructorApp(){
    const {instructors,addInstructor,deleteInstructor,updateInstructor,loading}=useInstructors()
    const[open,setOpen]=useState<boolean>(false);
    const[searchTerm,setSearchTerm] = useState<string>("");
    const filteredInstructors = instructors.filter(instructor => {
        console.log(instructors);
        return instructor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || instructor.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    }).reverse();
    function handleOpen(){
        setOpen(true);
    }


    function handleClose() {
        setOpen(false);
    }

    return(

            <Box sx={{mt: 2}}>
                <Container>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                    }}>
                        <Button sx={{mb: 2}} onClick={handleOpen} variant={"outlined"}>Neuer Skilehrer</Button>
                        <SearchBar handleSearchTerm={setSearchTerm} placeholder={"Suche nach Skilehrer..."}/>
                    </Box>
                    <InstructorTable instructors={filteredInstructors} updateInstructor={updateInstructor}
                                  deleteInstructor={deleteInstructor} loadingInstructor={loading}/>
                    <NewInstructorDialog open={open} onClose={handleClose} addInstructor={addInstructor}/>
                </Container>
            </Box>
    )
}