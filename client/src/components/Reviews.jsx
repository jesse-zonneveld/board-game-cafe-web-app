import React from 'react';
import { Card } from 'react-bootstrap';
import StarRating from './StarRating';
import styled from 'styled-components';

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    color: #fff;
`;

const StyledCard = styled(Card)`
    background: #4287f5;
`;

const Reviews = ({ reviews }) => {
    return (
        <Grid>
            {reviews.map( (review, i) => (
                <StyledCard key={i} >
                    <StyledCard.Body>
                        <StyledCard.Title>{review.username}</StyledCard.Title>
                        <StyledCard.Text><StarRating rating={review.rating} /></StyledCard.Text>
                        <StyledCard.Text>{review.body}</StyledCard.Text>
                    </StyledCard.Body>
                </StyledCard>
            ))}
        </Grid>
    );
};

export default Reviews;
