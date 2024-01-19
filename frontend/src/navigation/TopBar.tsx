import {useNavigate} from "react-router-dom";
import {ListItemIcon, ListItemText, MenuItem, Paper} from "@mui/material";
import ChaletIcon from '@mui/icons-material/Chalet';
import ContactsIcon from '@mui/icons-material/Contacts';
export default function TopBar(){
    const navigate=useNavigate()
    function handleHomeClick(){
        navigate("/");
    }
    function handleInstructorClick(){
        navigate("/instructors")
    }
    return(
        <Paper sx={{width: 320, maxWidth: '100%'}}>
            <MenuItem onClick={handleHomeClick}>
                <ListItemIcon>
                    <ChaletIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText>Startseite</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleInstructorClick}>
                <ListItemIcon>
                    <ContactsIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText>Lehrer</ListItemText>
            </MenuItem>
        </Paper>
    )
}