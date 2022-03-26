import React, { useEffect, useState } from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from './listItems';

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUserDetails, getUserUpdate } from "../../actions/userActions";
import Message from "../Message";
import { Bars } from "react-loader-spinner";
import { USER_UPDATE_RESET } from "../../constants/userConstants";

// import { Button, Col, Container, Form, Row } from 'react-bootstrap';






const drawerWidth = 240;



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

const UserUpdate = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [isAdmin, setIsAdmin] = useState(false);
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const dispatch = useDispatch();
    const history = useNavigate();
    const userDetails = useSelector(state => state.userDetails);
    const { error, loading, user } = userDetails;
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin
    const userUpdate = useSelector(state => state.userUpdate);
    const { success, loading: updateLoading } = userUpdate

    const params = useParams()
    const userId = params.id



    useEffect(() => {
        if (success) {
            dispatch({ 'type': USER_UPDATE_RESET })
            history('/userlist')
        } else {
            if (userInfo && userInfo.isAdmin) {
                if (!user.name || user._id !== Number(userId)) {
                    dispatch(getUserDetails(userId))
                } else {

                    setName(user.name)
                    setEmail(user.email)
                    setUsername(user.username)
                    setIsAdmin(user.isAdmin)
                }
            } else {

                history('/login')
            }

        }


    }, [user, userId, history])


    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            id: userId,
            email,
            name,
            username,
            isAdmin
        }
        dispatch(getUserUpdate(user))


    };

    const handleCheckBox = (e) => {
        e.preventDefault()

        if (isAdmin) {

            setIsAdmin(false)
        } else {

            setIsAdmin(true)
        }


    }
    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />

                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        {mainListItems}
                        <Divider sx={{ my: 1 }} />
                        {secondaryListItems}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />


                    <ThemeProvider theme={mdTheme}>
                        <Container component="main" maxWidth="xs">
                            <Link to='/' className='btn btn-light my-3'><i className="fas fa-angle-double-left"></i> Go Back</Link>
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >


                                {loading ?
                                    <div className="d-flex justify-content-center align-items-center " style={{ height: '80vh' }}> <Bars color="#00BFFF" height={80} width={80} /></div>
                                    : error
                                        ? <Message variant='danger'>{error}</Message>
                                        :

                                        <>
                                            <Box
                                                sx={{
                                                    marginTop: 8,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                }}
                                            >

                                                <Typography component="h1" variant="h5">
                                                    Update User Information
                                                </Typography>
                                                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} >
                                                            <TextField
                                                                autoComplete="given-name"
                                                                name="name"
                                                                required
                                                                fullWidth
                                                                id="name"
                                                                label="Name"
                                                                value={name}
                                                                onChange={(e) => setName(e.target.value)}
                                                                autoFocus
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} >
                                                            <TextField
                                                                required
                                                                fullWidth
                                                                id="username"
                                                                label="Username"
                                                                name="username"
                                                                value={username}
                                                                InputProps={{
                                                                    readOnly: true,
                                                                }}
                                                                onChange={(e) => setUsername(e.target.value)}
                                                                autoComplete="family-name"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <TextField
                                                                required
                                                                fullWidth
                                                                id="email"
                                                                label="Email Address"
                                                                name="email"
                                                                value={email}
                                                                InputProps={{
                                                                    readOnly: true,
                                                                }}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                autoComplete="email"
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <FormControlLabel
                                                                key={user._id}
                                                                control={
                                                                    <Checkbox

                                                                        onChange={handleCheckBox}
                                                                        color="primary"
                                                                        checked={isAdmin}
                                                                    />
                                                                }
                                                                label="Is Admin"
                                                            />

                                                        </Grid>
                                                    </Grid>
                                                    <Button
                                                        type="submit"
                                                        fullWidth
                                                        variant="contained"
                                                        sx={{ mt: 3, mb: 2 }}
                                                    >
                                                        Update User
                                                    </Button>

                                                </Box>
                                            </Box>

                                        </>
                                }
                            </Box>

                        </Container>
                    </ThemeProvider>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default UserUpdate;