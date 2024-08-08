import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';

const ExperienceIndex = ({ auth, experiences }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Mes expériences" />
            <div className="p-4">
                <h1 className="text-2xl font-semibold mb-4">Mes expériences</h1>

                <div className="mb-4">
                    <Link href={route('experiences.create')}>
                        <Button>Ajouter une expérience</Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {experiences.map((experience) => (
                        <div key={experience.id} className="bg-white rounded-md shadow-md p-4">
                            <h2 className="text-lg font-semibold mb-2">{experience.name}</h2>
                            <p className="text-gray-600 mb-2">
                                {experience.date_start} - {experience.date_end || 'Présent'}
                            </p>
                            <p className="text-gray-800 mb-4">{experience.description}</p>

                            <div className="flex justify-end space-x-2">
                                <Link href={route('experiences.show', experience.id)}>
                                    <Button variant="outline">Voir</Button>
                                </Link>
                                <Link href={route('experiences.edit', experience.id)}>
                                    <Button variant="outline">Modifier</Button>
                                </Link>
                                <Button variant="destructive" onClick={() => {/* Logique de suppression */}}>Supprimer</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ExperienceIndex;
