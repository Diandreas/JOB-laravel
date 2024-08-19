import React from 'react';

export default function ExportableCv({ cvInformation, experiencesByCategory }) {
    const { hobbies, competences, professions, summaries, personalInformation } = cvInformation;

    if (!experiencesByCategory || Object.keys(experiencesByCategory).length === 0) {
        return <p>Aucune expérience à afficher.</p>;
    }

    return (
        <div id="exportable-cv" style={{ width: '800px', margin: 'auto', fontFamily: 'Arial, sans-serif', backgroundColor: 'white', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>

            <header style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ width: '100px', height: '100px', margin: 'auto', marginBottom: '10px', borderRadius: '50%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', color: '#555' }}>
                    {personalInformation.firstName[0]}{personalInformation.firstName[0]}
                </div>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>{personalInformation.firstName} {personalInformation.firstName}</h1>
                <p style={{ fontSize: '12px', color: '#777' }}>{personalInformation.email} | {personalInformation.phone} | {personalInformation.address}</p>
            </header>

            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <div style={{ flex: 1, paddingRight: '20px' }}>
                    <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px solid #555' }}>Profile</h2>
                    <p style={{ fontSize: '12px', color: '#555' }}>{summaries[0]?.description}</p>

                    <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px', borderBottom: '1px solid #555' }}>Skills</h2>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0, color: '#555', fontSize: '12px' }}>
                        {competences.map(comp => (
                            <li key={comp.id} style={{ marginBottom: '5px' }}>{comp.name}</li>
                        ))}
                    </ul>

                    <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px', borderBottom: '1px solid #555' }}>Languages</h2>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0, color: '#555', fontSize: '12px' }}>
                        {/*{cvInformation.languages.map(lang => (*/}
                        {/*    <li key={lang.id} style={{ marginBottom: '5px' }}>{lang.name} ({lang.level})</li>*/}
                        {/*))}*/}
                    </ul>

                    <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px', borderBottom: '1px solid #555' }}>Hobbies</h2>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0, color: '#555', fontSize: '12px' }}>
                        {hobbies.map(hobby => (
                            <li key={hobby.id} style={{ marginBottom: '5px' }}>{hobby.name}</li>
                        ))}
                    </ul>
                </div>

                <div style={{ flex: 2 }}>
                    <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px solid #555' }}>Education</h2>
                    <div style={{ marginBottom: '20px' }}>
                        {professions.map(prof => (
                            <div key={prof.id} style={{ marginBottom: '10px' }}>
                                <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#333' }}>{prof.name}</p>
                                <p style={{ fontSize: '12px', color: '#777' }}>{prof.institution} | {prof.date_start} - {prof.date_end || 'Present'}</p>
                            </div>
                        ))}
                    </div>

                    <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px solid #555' }}>Experience</h2>
                    {Object.entries(experiencesByCategory).map(([category, experiences]) => (
                        <div key={category} style={{ marginBottom: '20px' }}>
                            {experiences.map(exp => (
                                <div key={exp.id} style={{ marginBottom: '10px' }}>
                                    <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#333' }}>{exp.title} at {exp.company_name}</p>
                                    <p style={{ fontSize: '12px', color: '#777' }}>{exp.date_start} - {exp.date_end || 'Present'}</p>
                                    <p style={{ fontSize: '12px', color: '#555' }}>{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
