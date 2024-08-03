import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Briefcase, GraduationCap, Heart } from 'lucide-react';
import './ExportableCv.css';
// @ts-ignore
export default function ExportableCv({ cvInformation }) {
    const { hobbies, competences, experiences, professions, summaries, personalInformation } = cvInformation;

    return (
        <div id="exportable-cv" className="max-w-4xl mx-auto bg-white p-8 font-sans">
            <header className="mb-6">
                <h1 className="text-3xl font-bold mb-1">{personalInformation.firstName} {personalInformation.lastName}</h1>
                <p className="text-xl text-gray-600 mb-2">{professions.map(prof => (
                    <p key={prof.id} className="text-sm mb-1">{prof.name}</p>
                ))}</p>
                <div className="flex flex-wrap text-sm text-gray-600">
                    <div className="mr-4 flex items-center"><Mail className="w-4 h-4 mr-1" /> {personalInformation.email}</div>
                    <div className="mr-4 flex items-center"><Phone className="w-4 h-4 mr-1" /> {personalInformation.phone}</div>
                    <div className="mr-4 flex items-center"><MapPin className="w-4 h-4 mr-1" /> {personalInformation.address}</div>
                    <div className="mr-4 flex items-center"><Linkedin className="w-4 h-4 mr-1" /> <a href={personalInformation.linkedin} className="text-blue-600">LinkedIn</a></div>
                    <div className="flex items-center"><Github className="w-4 h-4 mr-1" /> <a href={personalInformation.github} className="text-blue-600">GitHub</a></div>
                </div>
            </header>

            <main className="grid grid-cols-3 gap-6">
                <section className="col-span-2">
                    <h2 className="text-xl font-semibold mb-3 flex items-center"><Briefcase className="w-5 h-5 mr-2" /> Expériences Professionnelles</h2>
                    {experiences.map((exp, index) => (
                        <div key={exp.id} className={`mb-4 ${index !== experiences.length - 1 ? 'pb-4 border-b' : ''}`}>
                            <h3 className="font-semibold">{exp.name}</h3>
                            <p className="text-sm text-gray-600">{exp.InstitutionName} | {exp.date_start} - {exp.date_end || 'Present'}</p>
                            <p className="text-sm mt-1">{exp.description}</p>
                            <p className="text-sm mt-1"><strong>Réalisations:</strong> {exp.output}</p>
                        </div>
                    ))}
                </section>

                <aside>
                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-3 flex items-center"><Heart className="w-5 h-5 mr-2" /> Résumé</h2>
                        <p className="text-sm">{summaries[0]?.description}</p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-3 flex items-center"><GraduationCap className="w-5 h-5 mr-2" /> Compétences</h2>
                        <div className="flex flex-wrap gap-2">
                            {competences.map(comp => (
                                <span key={comp.id} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">{comp.name}</span>
                            ))}
                        </div>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-3 flex items-center"><GraduationCap className="w-5 h-5 mr-2" /> Formations</h2>
                        {professions.map(prof => (
                            <p key={prof.id} className="text-sm mb-1">{prof.name}</p>
                        ))}
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3 flex items-center"><Heart className="w-5 h-5 mr-2" /> Centres d'Intérêt</h2>
                        <div className="flex flex-wrap gap-2">
                            {hobbies.map(hobby => (
                                <span key={hobby.id} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">{hobby.name}</span>
                            ))}
                        </div>
                    </section>
                </aside>
            </main>
        </div>
    );
}
