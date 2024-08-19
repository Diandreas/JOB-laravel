import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/Components/ui/card";
import { Head, Link } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";
import { Mail, Phone, MapPin, Linkedin, Github, Briefcase, GraduationCap, Heart } from 'lucide-react';
import ExportableCv from './ExportableCv';
import html2pdf from 'html2pdf.js';

interface CvInformationProps {
    cvInformation: {
        hobbies: { id: number, name: string }[];
        competences: { id: number, name: string }[];
        experiences: {
            id: number,
            title: string,
            company_name: string,
            date_start: string,
            date_end: string | null,
            category_name: string,
            description: string,
            output: string
        }[];
        professions: { id: number, name: string }[];
        summaries: { id: number, description: string }[];
        personalInformation: {
            id: number,
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            address: string;
            linkedin: string;
            github: string;
        };
    };
}

const exportToPdf = () => {
    const element = document.getElementById('exportable-cv');
    const opt = {
        margin: 10,
        filename: 'cv.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
};

export default function Show({ auth, cvInformation }: CvInformationProps) {
    const { hobbies, competences, experiences, professions, summaries, personalInformation } = cvInformation;
    const experiencesByCategory = experiences.reduce((acc, curr) => {
        if (!acc[curr.category_name]) {
            acc[curr.category_name] = [];
        }
        acc[curr.category_name].push(curr);
        return acc;
    }, {});
    // @ts-ignore
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-2xl text-gray-800 leading-tight">Mon CV Professionnel</h2>
            }
        >
            <Head title="CV Professionnel" />
            <div className="w-full">
                <div className="w-full">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Exporter Mon CV</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                Visualisez votre CV professionnel et exportez-le en format PDF pour le partager facilement.
                            </p>
                            <Button
                                onClick={exportToPdf}
                                className="mb-6"
                                size="lg"

                            >
                                <GraduationCap className="mr-2 h-4 w-4" /> Exporter en PDF
                            </Button>
                            <div className=" w-full border rounded-lg p-6 bg-white shadow-sm">
                                {Object.keys(experiencesByCategory).length > 0 ? (
                                    <ExportableCv cvInformation={cvInformation} experiencesByCategory={experiencesByCategory} />
                                ) : (
                                    <p>Aucune expérience à afficher.</p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            {/*<Link*/}
                            {/*    href={route('dashboard')}*/}
                            {/*    className="text-sm text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"*/}
                            {/*>*/}
                            {/*    Retour au tableau de bord*/}
                            {/*</Link>*/}
                            {/*<Button variant="outline" onClick={() => window.print()}>*/}
                            {/*    Imprimer*/}
                            {/*</Button>*/}
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
