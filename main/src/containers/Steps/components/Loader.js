import { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material'

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
        <div>
            <Box position="relative" display="inline-flex">
                <CircularProgress variant="determinate"
                    value={uploadOrDownloadCount < 101 ? uploadOrDownloadCount : 100} />
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
                    {uploadOrDownloadCount < 101 ? `${Math.round(uploadOrDownloadCount)}%` : 100}
                </Box>
            </Box>
        </div>
    );
}