import React from 'react';

// @ts-ignore
const Dashboard = ({ referralCount, earnings, level }) => {
    return (
        <div className="dashboard">
            <h2>Your Sponsorship Dashboard</h2>
            <div className="stats">
                <div>Total Referrals: {referralCount}</div>
                <div>Total Earnings: {earnings} FCFA</div>
                <div>Current Level: {level}</div>
            </div>
        </div>
    );
};

export default Dashboard;
