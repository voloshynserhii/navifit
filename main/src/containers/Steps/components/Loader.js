import { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material'

export default function Loader({ onFinishLoad }) {

    const [uploadOrDownloadCount,
        setUploadOrDownloadCount] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setUploadOrDownloadCount(
                (beforeValue) => (beforeValue >= 100 ? 0
                    : beforeValue + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);
    
    useEffect(() => {
        if (uploadOrDownloadCount === 100) onFinishLoad()
    }, [uploadOrDownloadCount])

    return (
        <div>
            <Box position="relative" display="inline-flex">
                <CircularProgress variant="determinate"
                    value={uploadOrDownloadCount} />
                <Box
                    bottom={0}
                    right={0}
                    top={0}
                    justifyContent="center"
                    left={0}
                    display="flex"
                    alignItems="center"
                    position="absolute"
                >
                    {`${Math.round(uploadOrDownloadCount)}%`}
                </Box>
            </Box>
        </div>
    );
}