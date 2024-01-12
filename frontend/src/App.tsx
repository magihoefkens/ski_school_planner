import './App.css'
import InstructorApp from "./components/InstructorApp.tsx";
import {Route, Routes} from "react-router-dom";

function App() {

    return (
            <Routes>
                <Route path="/instructors" element={
                    <InstructorApp />
                }
                />
            </Routes>
    )
}

export default App


