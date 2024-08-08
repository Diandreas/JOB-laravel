import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Briefcase, GraduationCap, Heart } from 'lucide-react';
import './ExportableCv.css';

export default function ExportableCv({ cvInformation, experiencesByCategory }) {
    const { hobbies, competences, professions, summaries, personalInformation } = cvInformation;
    if (!experiencesByCategory || Object.keys(experiencesByCategory).length === 0) {
        return <p>Aucune expérience à afficher.</p>;
    }
    return (
        <div id="exportable-cv" className="max-w-4xl mx-auto bg-white p-8 font-sans shadow-lg rounded-lg">
            <header className="mb-6 text-center">
                <h1 className="text-4xl font-bold mb-2 text-blue-600">{personalInformation.firstName} {personalInformation.lastName}</h1>
                <p className="text-xl text-gray-700 mb-4">{professions.map(prof => (
                    <span key={prof.id} className="text-sm mb-1 bg-gray-200 text-gray-800 px-2 py-1 rounded-full mr-2">{prof.name}</span>
                ))}</p>
                <div className="flex flex-wrap justify-center text-sm text-gray-600">
                    <div className="mr-4 flex items-center"><Mail className="w-5 h-5 mr-1 text-blue-500" /> {personalInformation.email}</div>
                    <div className="mr-4 flex items-center"><Phone className="w-5 h-5 mr-1 text-blue-500" /> {personalInformation.phone}</div>
                    <div className="mr-4 flex items-center"><MapPin className="w-5 h-5 mr-1 text-blue-500" /> {personalInformation.address}</div>
                    <div className="mr-4 flex items-center"><Linkedin className="w-5 h-5 mr-1 text-blue-500" /> {personalInformation.linkedin} </div>
                    <div className="flex items-center"><Github className="w-5 h-5 mr-1 text-blue-500" />{personalInformation.github}</div>
                </div>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <section className="col-span-2">
                    {Object.keys(experiencesByCategory).map((category) => (
                        <div key={category} className="mb-6">
                            <h2 className="text-2xl font-semibold mb-3 text-blue-600">{category}</h2>
                            {experiencesByCategory[category].map((exp) => (
                                <div key={exp.id} className="mb-4 bg-gray-100 p-4 rounded-lg shadow-md">
                                    <h4 className="font-semibold text-blue-600">{exp.title}</h4>
                                    <p className="text-sm text-gray-600">{exp.company_name} | {exp.date_start} - {exp.date_end || 'Present'}</p>
                                    <p className="text-sm mt-1">{exp.description}</p>
                                    <p className="text-sm mt-1"><strong>Réalisations:</strong> {exp.output}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </section>

                <aside>
                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-3 flex items-center"><Heart className="w-6 h-6 mr-2 text-red-500" /> Résumé</h2>
                        <p className="text-sm text-gray-700">{summaries[0]?.description}</p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-3 flex items-center"><GraduationCap className="w-6 h-6 mr-2 text-green-500" /> Compétences</h2>
                        <div className="flex flex-wrap gap-2">
                            {competences.map(comp => (
                                <span key={comp.id} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs flex items-center">
                                    <GraduationCap className="w-4 h-4 mr-1 text-green-500" />
                                    {comp.name}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-3 flex items-center"><GraduationCap className="w-6 h-6 mr-2 text-purple-500" /> Formations</h2>
                        {professions.map(prof => (
                            <p key={prof.id} className="text-sm mb-1 bg-gray-200 text-gray-800 px-2 py-1 rounded-full">{prof.name}</p>
                        ))}
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 flex items-center"><Heart className="w-6 h-6 mr-2 text-pink-500" /> Centres d'Intérêt</h2>
                        <div className="flex flex-wrap gap-2">
                            {hobbies.map(hobby => (
                                <span key={hobby.id} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs flex items-center">
                                    <Heart className="w-4 h-4 mr-1 text-pink-500" />
                                    {hobby.name}
                                </span>
                            ))}
                        </div>
                    </section>
                </aside>
            </main>
        </div>
    );
}
