import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";

interface CvInformationProps {
    cvInformation: {
        hobbies: { id: number, name: string }[];
        competences: { id: number, name: string }[];
        experiences: { id: number, title: string, company_name: string, date_start: string, date_end: string | null, category_name: string, description: string, output: string }[];
        professions: { id: number, name: string }[];
        summaries: { id: number, description: string }[];
        personalInformation: {
            id: number,
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            address: string;
        };
    };
}

export default function Show({ auth, cvInformation }: CvInformationProps) {
    const { hobbies, competences, experiences, professions, summaries, personalInformation } = cvInformation;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Mon CV</h2>}
        >
            <Head title="CV Professionnel" />
            <div className="max-w-6xl mx-auto p-8">
                <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* Sidebar */}
                    <div className="w-full md:w-1/3 bg-gray-100 p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold text-gray-900">{personalInformation.firstName} {personalInformation.lastName}</h1>
                            <p className="text-xl text-gray-600 mt-2">{professions[0]?.name}</p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-lg font-semibold mb-4 text-gray-700">Contact</h2>
                            <p className="text-gray-600 mb-2">{personalInformation.email}</p>
                            <p className="text-gray-600 mb-2">{personalInformation.phone}</p>
                            <p className="text-gray-600">{personalInformation.address}</p>
                            <Link href={route('personal-information.edit', personalInformation.id)} className="text-blue-600 hover:underline mt-2 inline-block">
                                Modifier
                            </Link>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-lg font-semibold mb-4 text-gray-700">Compétences</h2>
                            <div className="flex flex-wrap gap-2">
                                {competences.map((comp) => (
                                    <span key={comp.id} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                                        {comp.name}
                                    </span>
                                ))}
                            </div>
                            <Link href={route('user-competences.index')} className="text-blue-600 hover:underline mt-2 inline-block">
                                Gérer les compétences
                            </Link>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold mb-4 text-gray-700">Centres d'intérêt</h2>
                            <ul className="list-disc list-inside text-gray-600">
                                {hobbies.map((hobby) => (
                                    <li key={hobby.id}>{hobby.name}</li>
                                ))}
                            </ul>
                            <Link href={route('user-hobbies.index')} className="text-blue-600 hover:underline mt-2 inline-block">
                                Gérer les centres d'intérêt
                            </Link>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="w-full md:w-2/3 p-8">
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profil</h2>
                            <p className="text-gray-700">{summaries[0]?.description}</p>
                            <Link href={route('summaries.index')} className="text-blue-600 hover:underline mt-2 inline-block">
                                Gérer les résumés
                            </Link>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Expérience professionnelle</h2>
                            {experiences.map((exp) => (
                                <div key={exp.id} className="mb-6">
                                    <h3 className="text-xl font-medium text-gray-800">{exp.title}</h3>
                                    <p className="text-gray-600 italic">{exp.company_name} | {exp.date_start} - {exp.date_end || 'Présent'}</p>
                                    <p className="text-gray-700 mt-2">{exp.description}</p>
                                    <p className="text-gray-700 mt-1"><strong>Réalisations:</strong> {exp.output}</p>
                                </div>
                            ))}
                            <Link href={route('experiences.index')}>
                                <Button variant="outline" size="sm">Gérer les expériences</Button>
                            </Link>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
