import React from 'react';
import Rating from './Rating';
import moment from 'moment';
import VerifiedIcon from '@mui/icons-material/Verified';
const Review = ({ review }) => {


    return (
        <div>
            <div className="d-flex justify-content-between">
                <div className="">
                    <Rating stars={review.rating}></Rating>
                </div>
                <div className="">
                    <span>{moment(review.createdAt).format('YYYY-MM-DD HH:MM:SS')}</span>
                </div>
            </div>
            <div><span>by <h5 style={{ display: 'inline-block' }}>{review.name}</h5> <span style={{ color: 'green' }} ><VerifiedIcon />Verified Purchase</span></span>

            </div>
            <div>
                <span>{review.comment}</span>
            </div>
            <hr />

        </div>
    );
};

export default Review;