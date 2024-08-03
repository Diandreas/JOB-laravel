import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";
import { Briefcase, GraduationCap, Heart } from 'lucide-react';
import {PageProps} from "@/types";

export default function Welcome({ auth }: PageProps)  {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-2xl text-gray-800 leading-tight">Bienvenue sur Job Portal</h2>}
        >
            <Head title="Bienvenue" />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold">Bienvenue dans notre espace numérique innovant</h2>
                        <p className="text-lg text-gray-600">Une passerelle unique qui relie les entreprises et les chercheurs d’emploi.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <Briefcase className="w-6 h-6 mb-2" />
                            <h3 className="text-lg font-bold">Publiez vos offres d’emploi</h3>
                            <p className="text-gray-600">Atteignez un large éventail de candidats potentiels.</p>
                            <Link href='#'>
                                <Button variant="outline" className="w-full">Publier une offre d’emploi</Button>
                            </Link>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <GraduationCap className="w-6 h-6 mb-2" />
                            <h3 className="text-lg font-bold">Créez et personnalisez votre CV</h3>
                            <p className="text-gray-600">Générez un CV professionnel en quelques clics.</p>
                            <Link href='#'>
                                <Button variant="outline" className="w-full">Créer un CV</Button>
                            </Link>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <Heart className="w-6 h-6 mb-2" />
                            <h3 className="text-lg font-bold">Recherchez des offres d’emploi pertinentes</h3>
                            <p className="text-gray-600">Trouvez les offres qui correspondent à vos compétences et à vos intérêts.</p>
                            <Link href='#'>
                                <Button variant="outline" className="w-full">Rechercher des offres d’emploi</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-lg font-bold">À propos de nous</h3>
                        <p className="text-gray-600">En France, nous avons HELLOWORK, en Espagne SEPE, en Allemagne Arbeitsagentur et au Cameroun nous aurons JOB PORTAL.</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
