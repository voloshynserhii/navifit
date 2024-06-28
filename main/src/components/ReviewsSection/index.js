import { useState, useEffect, useRef } from 'react';
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

const Review = ({ className, review, visible }) => {
    const { fullName, rating, lastRating, text } = review || {}

    return (
        <Box className={`${styles.review} ${className}`}>
            {visible && (
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
        fullName: 'Monika Kurzętkowska',
        rating: 5,
        lastRating: '1 week ago',
        text: 'Polecam. Dania są proste do przygotowania, zakupy w każdym sklepie. Polecam!'
    },
    {
        avatar: undefined,
        fullName: 'Maria Bartosz',
        rating: 4,
        lastRating: '1 month ago',
        text: 'Świetnie zbilansowane posiłki, proste w przygotowaniu i na pewno nie nudne! Duża oszczędność czasu i pieniędzy, duży plus za to, że wszystko kupuję w jednym sklepie. Przygotowywanie posiłków i zdrowe jedzenie przestało być męką, a naprawdę stało się przyjemnością!'
    },
    {
        avatar: undefined,
        fullName: 'Agata Szimanska',
        rating: 4.5,
        lastRating: '2 weeks ago',
        text: 'Ten jadłospis jest idealny! Posiłki są super smaczne i przede wszystkim SZYBKIE. Przy ograniczaniu spożycia mięsa świetnie urozmaica wege posiłki bez biegania po sklepach w poszukiwaniu cudownych składników. Na prawdę polecam z całego serca, jest warty każdej złotówki.'
    },
]

export default function Reviews() {
    const interval = useRef(null)
    const [currentReview, setCurrentReview] = useState(reviews[0])
    const [height, setHeight] = useState(180)

    useEffect(() => {        
        interval.current = setInterval(() => {
            swipeReview()
        }, 7000)
        
        return () => clearInterval(interval.current);
    }, [])

    const swipeReview = () => {
        const firstReview = reviews.shift()
        reviews.push(firstReview)
        setCurrentReview(reviews[0])
        
        const parentNode = document.querySelector('#reviews-container')
        const activeNode = parentNode.children[0]
        const secondNode = parentNode.children[1]
        const thirdNode = parentNode.children[2]

        activeNode.animate(
            [
                {
                    transform: 'translateY(-25%)',
                    opacity: '1',
                },
                {
                    transform: 'translateY(-50%)',
                    opacity: '0.25',
                },
                {
                    transform: 'translateY(-100%)',
                    opacity: '0',
                },
                {
                    transform: 'translateY(60%)',
                    opacity: '0',
                },
                {
                    transform: 'translateY(30%)',
                    opacity: '0.15',
                },
                {
                    transform: 'translateY(5%)',
                    opacity: '0.5',
                },
                {
                    transform: 'translateY(0%)',
                    opacity: '0.7',
                },
                {
                    transform: 'translateY(5%)',
                    opacity: '1',
                },
                {
                    transform: 'translateY(5%)',
                    opacity: '1',
                },
            ],
            {
                duration: 800,
                fill: 'forwards',
            },
        )
        
        secondNode.animate(
            [
                {
                    opacity: '0.5',
                    
                },
                {
                    opacity: '0.1',
                },
                {
                    opacity: '0.5',
                },
            ],
            {
                duration: 800,
                fill: 'forwards',
            },
        )
        
        thirdNode.animate(
            [
                {
                    opacity: '0.6',
                    
                },
                {
                    opacity: '0.2',
                },
                {
                    opacity: '0.6',
                },
            ],
            {
                duration: 800,
                fill: 'forwards',
            },
        )
    }
    
    useEffect(() => {
        const reviewsContainer = document.querySelector('#reviews-container')
        const countedHeight = 30 + reviewsContainer?.firstChild?.clientHeight
        
        setHeight(countedHeight)
    }, [currentReview])

    return (
        <ReviewsContainer>
            <Stack alignItems='center'>
                <Stack direction='row' gap={1}>
                    <Typography variant='h1' color='primary'>18,400</Typography>
                    <Typography variant='h1'>osób</Typography>
                </Stack>
                <Typography variant='regular16'>już wybrało NAVIFIT</Typography>
            </Stack>
            <Box sx={{ height: height, width: { md: '40vw'} }}>
                <Stack alignItems='center' id='reviews-container'>
                    <Review className={styles.active} review={currentReview} visible />
                    <Review className={styles.second} review={null} visible={false} />
                    <Review className={styles.third} review={null} visible={false} />
                </Stack>
            </Box>
        </ReviewsContainer>
    );
}