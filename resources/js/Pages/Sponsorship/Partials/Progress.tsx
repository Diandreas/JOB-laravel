import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Progress = () => {
    const [progress, setProgress] = useState(null);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const response = await axios.get('/sponsorship/progress');
                setProgress(response.data);
            } catch (error) {
                console.error('Error fetching progress', error);
            }
        };
        fetchProgress();
    }, []);

    if (!progress) return <div>Loading...</div>;

    return (
        <div className="progress">
            <h2>Your Sponsorship Progress</h2>
            <p>Current Level: {progress.currentLevel}</p>
            <p>Next Level: {progress.nextLevel}</p>
            <div className="progress-bar" style={{ width: `${progress.progress}%` }}>
                {progress.progress}%
            </div>
        </div>
    );
};

export default Progress;
