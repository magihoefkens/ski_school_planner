import './App.css'
import InstructorApp from "./components/InstructorApp.tsx";
import {Route, Routes} from "react-router-dom";
import {Box, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import TopBar from "./navigation/TopBar.tsx";
import CourseApp from "./components/CourseApp.tsx";
import ParticipantApp from "./components/ParticipantApp.tsx";


const whiteTheme = createTheme({
    palette: {
        mode: 'light',
    },
});
function App() {


    return (
        <ThemeProvider theme={whiteTheme}>
            <CssBaseline/>

            <Box sx={{
                width: "100%",
                margin: 0,
            }}>
            <Routes>
                <Route path={"/"} element={<Box><p>Willkommen in unsere Skischule</p><TopBar/></Box>}/>
                <Route path={"/instructors"} element={<InstructorApp />}/>
                <Route path={"/courses"} element={<CourseApp />}/>
                <Route path="/courses/:id" element={
                        <ParticipantApp/>}/>
            </Routes>
            </Box>
        </ThemeProvider>
    )
}

export default App


