import {useNavigate} from "react-router-dom";
import {
    AppBar,
    Box, Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from "@mui/material";

import {Terrain} from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import {useState} from "react";

export default function TopBar(){
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const navigate=useNavigate()
    function handleHomeClick(){
        navigate("/");
    }
    function handleInstructorClick(){
        navigate("/instructors");
        handleCloseNavMenu();
    }
    function handleCourseClick(){
        navigate("/courses");
        handleCloseNavMenu();
    }
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);

    };
    return(
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Terrain sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#" onClick={handleHomeClick}
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Skischule
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                <MenuItem key={"Skilehrer"} onClick={handleInstructorClick}>
                                    <Typography textAlign="center">Skilehrer</Typography>
                                </MenuItem>
                                <MenuItem key={"Kurse"} onClick={handleCourseClick}>
                                    <Typography textAlign="center">Kurse</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                        <Terrain sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#" onClick={handleHomeClick}
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Skischule
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                <Button
                                    key="Skilehrer"
                                    onClick={handleInstructorClick}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Skilehrer
                                </Button>
                                <Button
                                key="Kurse"
                                onClick={handleCourseClick}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Kurse
                        </Button>
                        </Box>


                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}