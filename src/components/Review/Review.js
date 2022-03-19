import React from 'react';
import Rating from './Rating';

import VerifiedIcon from '@mui/icons-material/Verified';
const Review = () => {
    return (
        <div>
            <div className="d-flex justify-content-between">
                <div className="">
                    <Rating stars={5}></Rating>
                </div>
                <div className="">
                    <span>24 Jun 2021</span>
                </div>
            </div>
            <div><span>by <h5 style={{ display: 'inline-block' }}>Nahid Hasan </h5> <span style={{ color: 'green' }} ><VerifiedIcon />Verified Purchase</span></span>

            </div>
            <div>
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quibusdam facilis placeat, labore, corrupti asperiores odit quod possimus impedit sapiente ut. Vitae laboriosam veniam itaque recusandae optio vel, repellendus incidunt.</span>
            </div>
            <hr />

        </div>
    );
};

export default Review;