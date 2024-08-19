import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Briefcase, GraduationCap, Heart } from 'lucide-react';

export default function ExportableCv({ cvInformation, experiencesByCategory }) {
    const { hobbies, competences, professions, summaries, personalInformation } = cvInformation;

    if (!experiencesByCategory || Object.keys(experiencesByCategory).length === 0) {
        return <p>Aucune expérience à afficher.</p>;
    }

    return (
        <div id="exportable-cv" className="cv-container">
            <div className="cv-header">
                <div className="avatar-container">
                    <img src={personalInformation.avatar} alt={`${personalInformation.firstName} ${personalInformation.lastName}`} className="avatar" />
                </div>
                <h1 className="cv-title">{personalInformation.firstName} {personalInformation.lastName}</h1>
                <div className="professions-container">
                    {professions.map(prof => (
                        <span key={prof.id} className="profession-tag">{prof.name}</span>
                    ))}
                </div>
                <div className="contact-info">
                    <div className="contact-item"><Mail className="icon" /> {personalInformation.email}</div>
                    <div className="contact-item"><Phone className="icon" /> {personalInformation.phone}</div>
                    <div className="contact-item"><MapPin className="icon" /> {personalInformation.address}</div>
                    <div className="contact-item"><Linkedin className="icon" /> {personalInformation.linkedin}</div>
                    <div className="contact-item"><Github className="icon" />{personalInformation.github}</div>
                </div>
            </div>

            <hr className="cv-divider" />

            <div className="cv-main">
                <div className="cv-section">
                    {Object.entries(experiencesByCategory).map(([category, experiences]) => (
                        <div key={category} className="experience-category">
                            <h2 className="category-title">{category}</h2>
                            {experiences.map((exp) => (
                                <div key={exp.id} className="experience-item">
                                    <h4 className="experience-title">{exp.title}</h4>
                                    <p className="experience-meta">{exp.company_name} | {exp.date_start} - {exp.date_end || 'Present'}</p>
                                    <p className="experience-description">{exp.description}</p>
                                    <p className="experience-output"><strong>Réalisations:</strong> {exp.output}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="cv-aside">
                    <div className="aside-section">
                        <h2 className="aside-title"><Heart className="icon" /> Résumé</h2>
                        <p className="aside-content">{summaries[0]?.description}</p>
                    </div>

                    <div className="aside-section">
                        <h2 className="aside-title"><GraduationCap className="icon" /> Compétences</h2>
                        <div className="tags-container">
                            {competences.map(comp => (
                                <span key={comp.id} className="tag">{comp.name}</span>
                            ))}
                        </div>
                    </div>

                    <div className="aside-section">
                        <h2 className="aside-title"><GraduationCap className="icon" /> Formations</h2>
                        <div className="tags-container">
                            {professions.map(prof => (
                                <span key={prof.id} className="tag">{prof.name}</span>
                            ))}
                        </div>
                    </div>

                    <div className="aside-section">
                        <h2 className="aside-title"><Heart className="icon" /> Centres d'Intérêt</h2>
                        <div className="tags-container">
                            {hobbies.map(hobby => (
                                <span key={hobby.id} className="tag">{hobby.name}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
