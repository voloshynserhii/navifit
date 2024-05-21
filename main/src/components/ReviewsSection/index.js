// import { useState, useEffect } from 'react';
import { Avatar, Box, Rating, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import styles from './index.module.css'

const ReviewsContainer = styled(Stack)(({ theme }) => ({
    marginTop: 60,
    gap: 40,
    alignItems: 'center',
    [theme.breakpoints.down("md")]: {
        marginTop: 24,
    },
}))

const Review = ({ className, review, index, onSwipe }) => {
    const { fullName, rating, lastRating, text } = review
    
    return (
        <Box className={`${styles.review} ${className}`} onClick={onSwipe}>
            {index === 0 && (
            <>
                <Stack direction='row' gap={2}>
                    <Box>
                        <Avatar />
                    </Box>
                    <Stack>
                        <Typography variant='medium14'>{fullName}</Typography>
                        <Stack direction='row' gap={1}>
                            <Rating readOnly value={rating} />
                            <Typography variant='bodyRegular12' color='rgba(0, 0, 0, 0.58)'>{lastRating}</Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Typography variant='bodyRegular12' component='p' sx={{ md: { fontSize: 14 }, mt: 1 }}>{text}</Typography>
            </>
        )}

        </Box>
    )
}

const reviews = [
    {
        avatar: undefined,
        fullName: 'Name Surname1',
        rating: 5,
        lastRating: '1 week ago',
        text: 'Feedback text could be really looooooooooooooooooooong Feedback text could be really looooooooooooooooooooong Feedback text could be really looooooooooooooooooooong!'
    },
    {
        avatar: undefined,
        fullName: 'Name Surname2',
        rating: 4,
        lastRating: '1 month ago',
        text: 'Feedback text could be really looooooooooooooooooooong Feedback text could be really looooooooooooooooooooong Feedback text could be really looooooooooooooooooooong!'
    },
    {
        avatar: undefined,
        fullName: 'Name Surname3',
        rating: 4.5,
        lastRating: '2 weeks ago',
        text: 'Feedback text could be really looooooooooooooooooooong Feedback text could be really looooooooooooooooooooong Feedback text could be really looooooooooooooooooooong!'
    },
]

export default function Reviews() {
    
    const swipeReviewHandler = () => {
        const activeReview = reviews[0]
        
        const activeNode = document.querySelector('#reviews-container').children[0]
        activeNode.animate(
            [
                {},
                {
                    transform: 'translateY(-25%)',
                    opacity: '1',
                },
                {
                    transform: 'translateY(-50%)',
                    opacity: '0',
                },
            ],
            {
                duration: 300,
                fill: 'forwards',
            },
        )
        // activeNode.remove()
        // activeNode.classList.remove(styles.active)
        // activeNode.classList.add(styles.third)
        
        // const secondNode = document.querySelector('#reviews-container').children[1]
        // secondNode.classList.remove(styles.second)
        // secondNode.classList.add(styles.active)
        // secondNode.appendChild(activeNode)

        
        // reviews.shift()
        // reviews.push(activeReview)
    }

    return (
        <ReviewsContainer>
            <Stack alignItems='center'>
                <Stack direction='row' gap={1}>
                    <Typography variant='h1' color='primary'>18,400</Typography>
                    <Typography variant='h1'>osób</Typography>
                </Stack>
                <Typography variant='regular16'>już wybrało NAVIFIT</Typography>
            </Stack>
            <Box sx={{ height: 180 }}>
                <Stack alignItems='center' id='reviews-container'>
                    {reviews.map((review, i) => {
                        let className = styles.active
                        if (i === 1) className = styles.second
                        if (i === 2) className = styles.third
                        
                        return (
                            <Review key={review.fullName} className={className} review={review} index={i} onSwipe={swipeReviewHandler} />
                        )}
                    )}
                </Stack>
            </Box>
        </ReviewsContainer>
    );
}