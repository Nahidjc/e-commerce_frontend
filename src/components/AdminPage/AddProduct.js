import React, { useEffect, useState } from "react";
import { createTheme } from '@mui/material/styles';
import './AddProduct.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';



import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Message from "../Message";
import { Bars } from "react-loader-spinner";

import { makeStyles, Paper } from "@material-ui/core";
import { addProduct } from "../../actions/productActions";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import { PRODUCT_CREATE_RESET } from "../../constants/productConstants";






const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: "40px auto",
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.primary,
    },
    title: {
        textTransform: "uppercase",
        padding: "15px 0",
        borderBottom: "1px solid #eee",
    },
    inputFeild: {
        width: "100%",
        margin: "13px",
    },
}));

const mdTheme = createTheme();

const AddProduct = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false)
    const [name, setName] = useState('')
    const [image, setImage] = useState(false);
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState(0);
    const [countInStock, setStock] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [open, setOpen] = useState(true);

    const dispatch = useDispatch();
    const history = useNavigate();
    const navigate = useNavigate()
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin
    const formData = new FormData()

    const createProduct = useSelector(state => state.createProduct);
    const { product, loading: addProductLoading, successProduct, error } = createProduct
    const params = useParams()
    useEffect(() => {
        if (successProduct) {

            toast.success("Successfully Added The Product");
            setBrand('')
            setCategory('')
            setDescription('')
            setName('')
            setPrice()
            setStock()

        }

    }, [history, successProduct, dispatch])


    const styleUpload = {
        display: image ? "block" : "none",
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        formData.append('image', file)
        formData.append('product_id', product._id)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = axios.post('http://127.0.0.1:8000/api/products/upload/', formData, config)
            // setImage(data.image)
            setUploading(false)
            dispatch({ type: PRODUCT_CREATE_RESET })
            navigate('/admin/productlist')



        } catch (error) {
            setUploading(false)
        }
    }

    //   const handleDestroy = async () => {
    //     try {
    //       setLoading(true);
    //       await axios.post(
    //         "https://shop-clue.herokuapp.com/api/destroy",
    //         { public_id: image.public_id },
    //         {
    //           headers: { Authorization: token },
    //         }
    //       );
    //       setLoading(false);
    //       setImage(false);
    //     } catch (err) {
    //       toast.error(err.response.data.msg);
    //     }
    //   };



    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addProduct({
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))

    }



    return (
        <div className={classes.root}>
            <Container maxWidth="lg">
                <ToastContainer />
                {uploading && <div className="d-flex justify-content-center align-items-center " style={{ height: '80vh' }}> <Bars color="#00BFFF" height={80} width={80} /></div>}
                {addProductLoading && <div className="d-flex justify-content-center align-items-center " style={{ height: '80vh' }}> <Bars color="#00BFFF" height={80} width={80} /></div>}
                <Grid container spacing={3}>
                    <Grid item xl={5} lg={5} md={5} xs={12}>
                        <div className="upload">
                            <input
                                type="file"
                                name="file"
                                id="file_up"
                                onChange={uploadFileHandler}

                            />
                            {loading ? (
                                "Uploading..."
                            ) : (
                                <Paper
                                    className={classes.paper}
                                    id="file_img"
                                    style={styleUpload}
                                >
                                    <img src={image ? image.url : ""} alt="" />
                                    <span >X</span>
                                </Paper>
                            )}
                        </div>
                    </Grid>
                    <Grid item xl={7} lg={7} md={7} xs={12} >
                        <Paper className={classes.paper} spacing={2}>
                            <Typography
                                className={classes.title}
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                Create Product
                            </Typography>
                            <form style={{ padding: "15px 0" }} onSubmit={submitHandler}>

                                <TextField
                                    id="outlined-basic"
                                    required
                                    label="Product Name"
                                    variant="outlined"
                                    value={name}
                                    style={{ marginBottom: "15px" }}
                                    className={classes.inputFeild}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}


                                />
                                <TextField
                                    required
                                    label="Brand"
                                    value={brand}
                                    variant="outlined"
                                    style={{ marginBottom: "15px" }}
                                    className={classes.inputFeild}
                                    onChange={(e) => {
                                        setBrand(e.target.value);
                                    }}

                                />
                                <Grid item xs={12} >
                                    <TextField
                                        id="outlined-basic"
                                        required
                                        value={category}
                                        label="Category"
                                        style={{ marginBottom: "15px" }}
                                        variant="outlined"
                                        className={classes.inputFeild}
                                        onChange={(e) => {
                                            setCategory(e.target.value);
                                        }}

                                    />
                                </Grid>

                                <TextField
                                    id="outlined-basic"
                                    label="Price"
                                    variant="outlined"
                                    style={{ marginBottom: "15px" }}
                                    className={classes.inputFeild}
                                    type="number"
                                    value={price}
                                    onChange={(e) => {
                                        setPrice(e.target.value);
                                    }}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="Product Stock"
                                    variant="outlined"
                                    style={{ marginBottom: "15px" }}
                                    className={classes.inputFeild}
                                    type="number"
                                    value={countInStock}
                                    onChange={(e) => {
                                        setStock(e.target.value);
                                    }}
                                />


                                <TextField
                                    id="outlined-multiline-static"
                                    label="Description"
                                    multiline
                                    style={{ marginBottom: "15px" }}
                                    rows={4}
                                    variant="outlined"
                                    className={classes.inputFeild}
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}
                                />
                                <Button type="submit" variant="contained" color="primary">
                                    Add Product
                                </Button>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default AddProduct;