import React, { useState } from 'react';
import axios from 'axios';

const Invitation = ({ referralCode }) => {
    const [invitationLink, setInvitationLink] = useState('');

    const generateInvitation = async () => {
        try {
            const response = await axios.post('/sponsorship/generate-invitation');
            setInvitationLink(`https://yourapp.com/register?ref=${response.data.invitationLink}`);
        } catch (error) {
            console.error('Error generating invitation link', error);
        }
    };

    return (
        <div className="invitation">
            <h2>Invite Friends</h2>
            <p>Your referral code: {referralCode}</p>
            <button onClick={generateInvitation}>Generate Invitation Link</button>
            {invitationLink && (
                <div>
                    <p>Share this link: {invitationLink}</p>
                </div>
            )}
        </div>
    );
};

export default Invitation;
