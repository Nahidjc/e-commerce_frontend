import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
    AppBar,
    IconButton,
    Toolbar,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Container
} from "@material-ui/core";
// import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
// // import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import { Link } from "react-router-dom";
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));



const usedStyles = makeStyles({
    navbarDisplayFlex: {
        display: "flex",
        justifyContent: "space-between"
    },
    navDisplayFlex: {
        display: "flex",
        justifyContent: "space-between"
    },
    linkText: {
        textDecoration: "none",
        textTransform: "uppercase",
        width: "auto",
        color: "white"
    }
});

const navLinks = [

    { title: "Register", path: "/register" },
    { title: "Login", path: "/login" }
];

const Navbar = () => {


    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const userLogin = useSelector(state => state.userLogin);
    const dispatch = useDispatch()
    const { userInfo } = userLogin
    const logoutHandler = () => {
        dispatch(logout())
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >

            <MenuItem > <ListItem button component={Link} to='/profile'>
                <ListItemText primary="Profile" />
            </ListItem></MenuItem>


            <MenuItem onClick={logoutHandler}> <ListItem button >
                <ListItemText primary="Logout" />
            </ListItem></MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );
    const classes = usedStyles();
    return (

        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        <ListItem button component={Link} to='/'>


                            <ListItemText sx={{ padding: 2 }} className={classes.linkText} primary='NihaShopBD' />
                        </ListItem>

                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                        <IconButton
                            size="small"
                            aria-label="show number of product"
                            color="inherit"
                        >
                            <ListItem button component={Link} to='/cart'>

                                <Badge badgeContent={cartItems.length} color="error">
                                    <ShoppingCartIcon />
                                </Badge>

                            </ListItem>

                        </IconButton>


                        {userInfo ? <>
                            <IconButton
                                size="small"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                {userInfo.name}

                                <AccountCircle />
                            </IconButton>
                        </> :

                            <>
                                <Toolbar>
                                    <Container maxWidth="lg" className={classes.navbarDisplayFlex}>

                                        <List
                                            component="nav"
                                            aria-labelledby="main navigation"
                                            className={classes.navDisplayFlex}
                                        >
                                            {navLinks.map(({ title, path }) => (
                                                <ListItem button key={title} component={Link} to={path}>
                                                    <ListItemText className={classes.linkText} primary={title} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Container>
                                </Toolbar>


                            </>
                        }

                    </Box>


                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
};

export default Navbar;