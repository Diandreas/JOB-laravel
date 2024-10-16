import React from 'react';
import { Head } from '@inertiajs/react';
import { User, GraduationCap, Briefcase, Heart } from 'lucide-react';

export default function Show({ portfolio, username }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Head title={`Portfolio de ${username}`} />

            <main className="container mx-auto py-6">
                <h1 className="text-3xl font-bold mb-6">Portfolio de {username}</h1>

                <section className="bg-white shadow rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4 flex items-center">
                        <User className="mr-2" /> Informations personnelles
                    </h2>
                    <p>Nom: {portfolio.personalInfo.firstName} {portfolio.personalInfo.lastName}</p>
                    <p>Email: {portfolio.personalInfo.email}</p>
                    <p>Téléphone: {portfolio.personalInfo.phone}</p>
                </section>

                <section className="bg-white shadow rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4 flex items-center">
                        <Briefcase className="mr-2" /> Expériences
                    </h2>
                    {portfolio.experiences.map((exp, index) => (
                        <div key={index} className="mb-4">
                            <h3 className="text-xl font-medium">{exp.title}</h3>
                            <p>{exp.company_name}</p>
                            <p>{exp.date_start} - {exp.date_end || 'Present'}</p>
                            <p>{exp.description}</p>
                        </div>
                    ))}
                </section>

                <section className="bg-white shadow rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4 flex items-center">
                        <GraduationCap className="mr-2" /> Compétences
                    </h2>
                    <ul className="list-disc list-inside">
                        {portfolio.competences.map((comp, index) => (
                            <li key={index}>{comp.name}</li>
                        ))}
                    </ul>
                </section>

                <section className="bg-white shadow rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4 flex items-center">
                        <Heart className="mr-2" /> Loisirs
                    </h2>
                    <ul className="list-disc list-inside">
                        {portfolio.hobbies.map((hobby, index) => (
                            <li key={index}>{hobby.name}</li>
                        ))}
                    </ul>
                </section>

            </main>
        </div>
    );
}
