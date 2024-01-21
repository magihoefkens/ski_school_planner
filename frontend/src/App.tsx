import './App.css'
import InstructorApp from "./components/InstructorApp.tsx";
import {Route, Routes} from "react-router-dom";
import {Box, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import TopBar from "./navigation/TopBar.tsx";

const whiteTheme = createTheme({
    palette: {
        mode: 'light',
    },
});
function App() {

    return (
        <ThemeProvider theme={whiteTheme}>
            <CssBaseline/>
            <TopBar/>
            <Box sx={{
                width: "100%",
                margin: 0,
            }}>
            <Routes>
                <Route path={"/"} element={<p>Willkommen in unsere Skischule</p>}/>
                <Route path={"/instructors"} element={<InstructorApp />}/>
            </Routes>
            </Box>
        </ThemeProvider>
    )
}

export default App


