import React, { useState } from 'react';
import axios from 'axios';

const Support = () => {
    const [message, setMessage] = useState('');

    const submitTicket = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/sponsorship/support', { message });
            alert('Support ticket submitted successfully!');
            setMessage('');
        } catch (error) {
            console.error('Error submitting support ticket', error);
        }
    };

    return (
        <div className="support">
            <h2>Support</h2>
            <form onSubmit={submitTicket}>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your issue"
                />
                <button type="submit">Submit Ticket</button>
            </form>
        </div>
    );
};

export default Support;
