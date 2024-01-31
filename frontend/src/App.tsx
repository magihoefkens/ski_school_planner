import './App.css'
import InstructorApp from "./components/InstructorApp.tsx";
import {Route, Routes} from "react-router-dom";
import {Box, createTheme, CssBaseline, styled, ThemeProvider} from "@mui/material";
import TopBar from "./navigation/TopBar.tsx";
import CourseApp from "./components/CourseApp.tsx";
import ParticipantApp from "./components/ParticipantApp.tsx";


const whiteTheme = createTheme({
    palette: {
        mode: 'light',
    },
});
const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
}));
function App() {


    return (
        <ThemeProvider theme={whiteTheme}>
            <CssBaseline/>

            <Box sx={{
                width: "100%",
                margin: 0,
            }}>
            <Routes>
                <Route path={"/"} element={<Box><TopBar/><Div>Willkommen in unsere Skischule!</Div></Box>}/>
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


