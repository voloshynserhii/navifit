import { useState, useEffect } from 'react';
import CircularProgress from '../CircularProgress'

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
        <CircularProgress value={uploadOrDownloadCount < 101 ? uploadOrDownloadCount : 100} />
    );
}