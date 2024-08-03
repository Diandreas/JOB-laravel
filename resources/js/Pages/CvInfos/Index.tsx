import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/Components/ui/card";
import { Head, Link } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";
import { Mail, Phone, MapPin, Linkedin, Github, Briefcase, GraduationCap, Heart } from 'lucide-react';
import ExportableCv from './ExportableCv';
// @ts-ignore
import html2pdf from 'html2pdf.js';

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
            linkedin: string;
            github: string;
        };
    };
}

const exportToPdf = () => {
    const element = document.getElementById('exportable-cv');
    const opt = {
        margin: 10,
        filename: 'mon_cv.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
};
// @ts-ignore
export default function Show({ auth, cvInformation }: CvInformationProps) {
    const { hobbies, competences, experiences, professions, summaries, personalInformation } = cvInformation;


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-2xl text-gray-800 leading-tight">Mon CV Professionnel</h2>}
        >
            <Head title="CV Professionnel" />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
                    <PersonalInfoCard item={personalInformation} linkRoute="personal-information.edit" />

                    <SectionHeader icon={<Briefcase className="w-6 h-6" />} title="Résumé Professionnel" />
                    <CvInfoSummarySection items={summaries} linkRoute="summaries.index" />

                    <SectionHeader icon={<Briefcase className="w-6 h-6" />} title="Expériences Professionnelles" />
                    <CvInfoExperienceSection items={experiences} linkRoute="experiences.index" />

                    <SectionHeader icon={<GraduationCap className="w-6 h-6" />} title="Compétences" />
                    <CvInfoListSection items={competences} linkRoute="user-competences.index" />

                    <SectionHeader icon={<GraduationCap className="w-6 h-6" />} title="Formations" />
                    <CvInfoListSection items={professions} linkRoute="user-professions.index" />

                    <SectionHeader icon={<Heart className="w-6 h-6" />} title="Centres d'Intérêt" />
                    <CvInfoListSection items={hobbies} linkRoute="user-hobbies.index" />
                </div>


            </div>
        </AuthenticatedLayout>
    );
}
function SectionHeader({ icon, title }: { icon: React.ReactNode, title: string }) {
    return (
        <div className="flex items-center space-x-2 font-bold text-2xl text-gray-800 mt-8 mb-4">
            {icon}
            <h2 className="text-lg font-bold">{title}</h2>
        </div>
    );
}

function PersonalInfoCard({ item, linkRoute }: { item: any, linkRoute: string }) {
    return (
        <Card className="mb-8 rounded-lg">
            <CardHeader className="bg-gray-100 py-4 px-6">
                <CardTitle className="text-3xl font-bold">{item.firstName} {item.lastName}</CardTitle>
                <p className="text-xl text-gray-600">Développeur Web Full Stack</p>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                        <Mail className="w-5 h-5 mr-2" />
                        <span className="text-gray-600">{item.email}</span>
                    </div>
                    <div className="flex items-center">
                        <Phone className="w-5 h-5 mr-2" />
                        <span className="text-gray-600">{item.phone}</span>
                    </div>
                    <div className="flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        <span className="text-gray-600">{item.address}</span>
                    </div>
                    <div className="flex items-center">
                        <Linkedin className="w-5 h-5 mr-2" />
                        <a href={item.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            LinkedIn
                        </a>
                    </div>
                    <div className="flex items-center">
                        <Github className="w-5 h-5 mr-2" />
                        <a href={item.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            GitHub
                        </a>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="bg-gray-100 py-4 px-6">
                <Link href={route(linkRoute, item.id)}>
                    <Button variant="outline" className="w-full">Modifier</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}

function CvInfoExperienceSection({ items, linkRoute }: { items: any[], linkRoute: string }) {
    return (
        <div className="space-y-6">
            {items.map((item) => (
                <Card key={item.id} className="rounded-lg">
                    <CardHeader className="bg-gray-100 py-4 px-6">
                        <CardTitle className="text-xl font-bold">{item.name}</CardTitle>
                        <p className="text-gray-600">{item.InstitutionName}</p>
                    </CardHeader>
                    <CardContent className="p-6">
                        <p className="text-sm text-gray-500 mb-2">{item.date_start} - {item.date_end || 'Present'}</p>
                        <p className="mb-2"><span className="font-semibold">Catégorie:</span> {item.category_name}</p>
                        <p className="mb-2"><span className="font-semibold">Description:</span> {item.description}</p>
                        <p><span className="font-semibold">Réalisations:</span> {item.output}</p>
                    </CardContent>
                    <CardFooter className="bg-gray-100 py-4 px-6">
                        <Link href={route(linkRoute, item.id)}>
                            <Button variant="outline" className="w-full">Détails</Button>
                        </Link>
                    </CardFooter>
                </Card>
            ))}
            <Link href={route(linkRoute)}>
                <Button className="w-full">Voir Plus</Button>
            </Link>
        </div>
    );
}

function CvInfoListSection({ items, linkRoute }: { items: any[], linkRoute: string }) {
    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
                {items.map((item) => (
                    <span key={item.id} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                        {item.name || item.title}
                    </span>
                ))}
            </div>
            <Link href={route(linkRoute)}>
                <Button variant="outline" className="w-full">Gérer</Button>
            </Link>
        </div>
    );
}

function CvInfoSummarySection({ items, linkRoute }: { items: any[], linkRoute: string }) {
    return (
        <div>
            {items.map((item) => (
                <Card key={item.id} className="mb-4">
                    <CardContent className="p-4">
                        <p className="text-gray-700">{item.description}</p>
                    </CardContent>
                </Card>
            ))}
            <Link href={route(linkRoute)}>
                <Button variant="outline">Modifier</Button>
            </Link>
        </div>
    );
}
