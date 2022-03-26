import React, { useEffect } from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from './listItems';

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserList } from "../../actions/userActions";
import Message from "../Message";
import { Bars } from "react-loader-spinner";
import ProductList from "./ProductList";
import { getDeleteProduct, listProducts } from "../../actions/productActions";
import { Typography } from "@material-ui/core";
import { Button } from "@mui/material";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from 'react-toastify';
import { PRODUCT_DELETE_RESET } from "../../constants/productConstants";


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

const Products = () => {


    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const deleteProduct = useSelector(state => state.deleteProduct)
    const { error: deleteError, loading: deleteLoading, message, deleteSuccess } = deleteProduct

    const handleDeleteProduct = (id) => {
        confirmAlert({
            title: "Delete Product",
            message: "Are you sure to delete the product",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => dispatch(getDeleteProduct(id))
                },
                {
                    label: "No"
                    // onClick: () => alert("Click No")
                }
            ]
        })
    }

    const productList = useSelector(state => state.productList)
    const { error, loading, products } = productList
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin


    useEffect(() => {
        if (userInfo) {
            if (userInfo.isAdmin) {
                dispatch(getUserList())
                dispatch(listProducts())
            } else {
                navigate('/login')
            }
        } else {
            navigate('/login')
        }
        if (deleteSuccess) {
            toast.success(message);
            dispatch({ type: PRODUCT_DELETE_RESET })
        }

    }, [dispatch, navigate, message, userInfo, deleteSuccess])

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
                    <Container maxWidth="lg" sx={{ mb: 4 }}>
                        <Grid
                            sx={{ mb: 4 }}
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography variant="h3" component="h2">
                                Products
                            </Typography>
                            <Link to='/admin/addproduct'>
                                <Button variant="contained" startIcon={<AddIcon />}>
                                    Add Product
                                </Button>
                            </Link>

                        </Grid>
                        <ToastContainer />
                        {deleteError && <Message variant='danger'>{deleteError}</Message>}
                        {deleteLoading && <div className="d-flex justify-content-center align-items-center " style={{ height: '80vh' }}> <Bars color="#00BFFF" height={80} width={80} /></div>}


                        {loading ? <div className="d-flex justify-content-center align-items-center " style={{ height: '80vh' }}> <Bars color="#00BFFF" height={80} width={80} /></div>
                            : error ? <Message variant='danger'>{error}</Message>
                                : <>
                                    <ProductList handleDeleteProduct={handleDeleteProduct} products={products} />
                                </>}
                    </Container>
                </Box>
            </Box>
        </ThemeProvider >
    );
}

export default Products;