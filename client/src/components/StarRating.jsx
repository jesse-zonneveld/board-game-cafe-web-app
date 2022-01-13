import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarReg } from '@fortawesome/free-regular-svg-icons';

const StarRating = ({ rating, count }) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<FontAwesomeIcon icon={faStar} color={'yellow'} key={i} />);
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars.push(<FontAwesomeIcon icon={faStarHalfAlt} color={'yellow'} key={i} />);
        } else {
            stars.push(<FontAwesomeIcon icon={faStarReg} color={'yellow'} key={i} />);
        }
    }

    return (
        <>
            {rating ? (
                <>
                    <span>{stars}</span>
                    {count ? <span>({count})</span> : ""}
                </>
            ) : (
                <span>0 Reviews</span>
            )}
        </>
    );
};

export default StarRating;
