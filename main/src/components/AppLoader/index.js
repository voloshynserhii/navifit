import { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const LoaderInfo = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
}))

export default function Loader({ onFinishLoad }) {

    const [uploadOrDownloadCount,
        setUploadOrDownloadCount] = useState(1);

    useEffect(() => {
        const timer = setInterval(() => {
            setUploadOrDownloadCount(
                (beforeValue) => beforeValue + 1);
        }, 70);

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        if (uploadOrDownloadCount === 110) onFinishLoad()
    }, [uploadOrDownloadCount])

    return (
        <Box sx={{ width: 'fit-content' }} >
            <Box position="relative" display="inline-flex">
                <CircularProgress 
                    sx={{ zIndex: 1 }} 
                    variant="determinate" 
                    size={200} 
                    thickness={1.8}
                    value={uploadOrDownloadCount < 101 ? uploadOrDownloadCount : 100} 
                />
                <CircularProgress 
                    sx={{ position: 'absolute', color: 'secondary.greyLighten2' }} 
                    variant="determinate" 
                    size={200} 
                    thickness={1.8} 
                    value={100} 
                />
                <LoaderInfo>
                    <Typography variant='h2'>
                        <span style={{ fontSize: 50, lineHeight: 75 }}>{uploadOrDownloadCount < 101 ? Math.round(uploadOrDownloadCount) : 100}</span>%
                    </Typography>
                </LoaderInfo>
            </Box>
        </Box>
    );
}