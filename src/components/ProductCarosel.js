import {
    makeStyles,
    Grid,

} from "@material-ui/core";
import React from "react";

import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const images = [
    {
        photo:
            "https://static-01.daraz.com.bd/other/shop/746bee6a4737b5c945a07f92b13c608f.jpeg_2200x2200q75.jpg_.webp",
        label: "image2",
    },
    {
        photo:
            "https://static-01.daraz.com.bd/other/shop/273a8fd1a10ba1614ba0b53696c9ca80.jpeg_2200x2200q75.jpg_.webp",
        label: "image1",
    },
    {
        photo:
            "https://static-01.daraz.com.bd/other/shop/18b1f825fd81301e84050108129af1d3.jpeg_2200x2200q75.jpg_.webp",
        label: "image1",
    },
    {
        photo:
            "https://icms-image.slatic.net/images/ims-web/34be0b73-60cf-4766-8675-d97301e58299.jpg",
        label: "image1",
    },
    {
        photo:
            "https://icms-image.slatic.net/images/ims-web/5dd9cc0e-b3dc-4f77-938b-e5e34b6f8ff0.jpg",
        label: "image1",
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
        marginBottom: "20px",
        marginTop: "-10px",
        padding: "0 10px",
    },
    media: {
        borderRadius: "5px",
        height: "350px",
        overflow: "hidden",
        width: "100%",
        objectFit: "cover",
    },
    image: {
        height: "50px",
        marginRight: "10px",
    },
    list: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const ProductCarosel = () => {
    const classes = useStyles();
    // const state = useContext(GlobalState);
    // const [products] = state.productsAPI.products;

    // const sell = products.filter((product) => {
    //     return product.sold > 0;
    // });

    // const topSell = sell.sort(function (a, b) {
    //     return b - a;
    // });

    const settings = {
        pauseOnHover: true,
        indicators: true,
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xl={12} lg={12} md={12} xs={12}>
                    <Slide {...settings}>
                        {images.map((step) => (
                            <div key={step.label}>
                                <img
                                    src={step.photo}
                                    alt={step.label}
                                    className={classes.media}
                                />
                            </div>
                        ))}
                    </Slide>
                </Grid>

            </Grid>
        </div>
    );
};

export default ProductCarosel;