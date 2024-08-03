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
        margin: 5,
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
            header={<h2 className="font-semibold text-2xl text-gray-800 leading-tight">Exporter Mon CV</h2>}
        >
            <Head title="CV Professionnel" />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Button onClick={exportToPdf} className="mb-4">Exporter en PDF</Button>

                </div>
                <ExportableCv cvInformation={cvInformation} />


            </div>

        </AuthenticatedLayout>
    );
}
