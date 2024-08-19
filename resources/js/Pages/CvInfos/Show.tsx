import React, { Suspense, lazy } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/Components/ui/card";
import { Head, Link } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";
import { Mail, Phone, MapPin, Linkedin, Github, Briefcase, GraduationCap, Heart } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import printJS from "print-js";

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
    selectedCvModel: {
        viewPath: string;
    } | null;
}
const exportToPrint = () => {
    printJS({
        printable: 'exportable-cv',
        type: 'html',
        css: [
           '@\\resources\\css\\app.css'
        ],
        scanStyles: true, // Active le scan des styles pour inclure les styles internes de Bootstrap et Tailwind
        style: `
           /* ExportableCv.css */

.cv-container {

    
    background-color: #fff;

    font-family: Arial, sans-serif;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.cv-header {
    text-align: center;
    margin-bottom: 20px;
}

.avatar-container {
    width: 96px;
    height: 96px;
    margin: 0 auto 16px;
    border-radius: 50%;
    overflow: hidden;
}

.avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.cv-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 8px;
    color: #007bff;
}

.professions-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    margin-bottom: 16px;
}

.profession-tag {
    background-color: #f0f0f0;
    color: #333;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: 4px;
}

.contact-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    color: #6c757d;
    font-size: 0.875rem;
}

.contact-item {
    display: flex;
    align-items: center;
}

.icon {
    width: 16px;
    height: 16px;
    margin-right: 4px;
}

.cv-divider {
    border: none;
    border-top: 1px solid #e9ecef;
    margin: 20px 0;
}

.cv-main {
    display: flex;
    gap: 20px;
}

.cv-section {
    flex: 2;
}

.cv-aside {
    flex: 1;
}

.experience-category {
    background-color: #f8f9fa;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

.category-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 16px;
    color: #007bff;
}

.experience-item {
    margin-bottom: 16px;
}

.experience-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #007bff;
}

.experience-meta {
    font-size: 0.875rem;
    color: #6c757d;
}

.experience-description {
    font-size: 0.875rem;
    margin-top: 4px;
}

.experience-output {
    font-size: 0.875rem;
    margin-top: 4px;
}

.aside-section {
    background-color: #f8f9fa;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

.aside-title {
    font-size: 1.25rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
}

.aside-content {
    font-size: 0.875rem;
    color: #6c757d;
}

.tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tag {
    background-color: #f0f0f0;
    color: #333;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: 4px;
}

        `,
        documentTitle: 'CV Professionnel'
    });
};
const exportToPdf = () => {
    const element = document.getElementById('exportable-cv');
    const opt = {
        margin: [10, 10, 10, 10], // top, right, bottom, left
        filename: 'cv.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
};

export default function Show({ auth, cvInformation, selectedCvModel }: CvInformationProps) {
    const { hobbies, competences, experiences, professions, summaries, personalInformation } = cvInformation;
    const experiencesByCategory = experiences.reduce((acc, curr) => {
        if (!acc[curr.category_name]) {
            acc[curr.category_name] = [];
        }
        acc[curr.category_name].push(curr);
        return acc;
    }, {});

    let DynamicCvView = null;
    if (selectedCvModel && selectedCvModel.viewPath) {
        DynamicCvView = lazy(() => import(`../../Pages/CvGallery/${selectedCvModel.viewPath}`));
    }

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
                                onClick={exportToPrint}
                                className="mb-6"
                                size="lg"

                            >
                                <GraduationCap className="mr-2 h-4 w-4" /> Exporter en PDF
                            </Button>
                            <div className=" w-full border rounded-lg p-6 bg-white shadow-sm">
                                <Suspense fallback={<div>Chargement...</div>}>
                                    {Object.keys(experiencesByCategory).length > 0 ? (
                                        DynamicCvView ? (
                                            <DynamicCvView cvInformation={cvInformation} experiencesByCategory={experiencesByCategory} />
                                        ) : (
                                            <p>Aucune vue de CV sélectionnée.</p>
                                        )
                                    ) : (
                                        <p>Aucune expérience à afficher.</p>
                                    )}
                                </Suspense>
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
