// resources/js/Pages/CvInfos/Show.tsx
import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/Components/ui/card";
import { Head, Link } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";
import { Mail, Phone, MapPin, Linkedin, Github, Briefcase, GraduationCap, Heart, Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip";
import { Badge } from "@/Components/ui/badge";
import ExportableCv from './ExportableCv';
import html2pdf from 'html2pdf.js';
import Modal from '@/Components/ui/Modal';
import ExperienceIndex from '@/Pages/CvInfos/Experiences/Index';
import PersonalInformationEdit from './PersonalInformation/Edit'; // Import the edit component
import CompetenceManager from '@/Components/CompetenceManager'; // Import the competence manager component
import HobbyManager from '@/Components/HobbyManager'; // Import the hobby manager component
import ProfessionManager from '@/Components/ProfessionManager'; // Import the profession manager component
import SummaryManager from '@/Components/SummaryManager'; // Import the summary manager component

interface CvInformation {
    hobbies: { id: number; name: string }[];
    competences: { id: number; name: string }[];
    experiences: {
        id: number;
        title: string;
        company_name: string;
        date_start: string;
        date_end: string | null;
        category_name: string;
        description: string;
        output: string;
    }[];
    professions: { id: number; name: string }[];
    myProfession: { id: number; name: string }[];
    summaries: { id: number; description: string }[];
    personalInformation: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        address: string;
        linkedin: string;
        github: string;
    };
    availableCompetences: { id: number; name: string }[];
    availableHobbies: { id: number; name: string }[];
    availableProfessions: { id: number; name: string }[];
    availableSummaries: { id: number; name: string }[];
    selectedProfession: { id: number; name: string } | null;
    selectedSummary: { id: number; name: string } | null;
}

interface Props {
    auth: any;
    cvInformation: CvInformation;
}

export default function Show({ auth, cvInformation }: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [personalInfo, setPersonalInfo] = useState(cvInformation.personalInformation);
    const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);

    const handleEdit = () => setIsEditing(true);
    const handleCancel = () => setIsEditing(false);
    const handleUpdate = (updatedInfo) => {
        setPersonalInfo(updatedInfo);
        setIsEditing(false);
    };

    const openExperienceModal = () => setIsExperienceModalOpen(true);
    const closeExperienceModal = () => setIsExperienceModalOpen(false);

    const exportToPdf = () => {
        const element = document.getElementById('exportable-cv');
        const opt = {
            filename: 'mon_cv.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().from(element).set(opt).save();
    };

    const { hobbies, competences, experiences, professions, myProfession, summaries, availableCompetences, availableHobbies, availableProfessions, availableSummaries, selectedProfession, selectedSummary } = cvInformation;

    // @ts-ignore
    // @ts-ignore
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-2xl text-gray-800 leading-tight">Mon CV Professionnel</h2>}
        >
            <Head title="CV Professionnel" />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Card className="mb-8">
                    <CardContent className="p-6">
                        <div id="exportable-cv">
                            {isEditing ? (
                                <PersonalInformationEdit
                                    user={personalInfo}
                                    onUpdate={handleUpdate}
                                    onCancel={handleCancel}
                                />
                            ) : (
                                <PersonalInfoCard item={personalInfo} onEdit={handleEdit} />
                            )}

                            <SectionHeader icon={<Briefcase className="w-6 h-6" />} title="Résumé Professionnel" />
                            <CvInfoSummarySection items={summaries} linkRoute="summaries.index" />

                            <SectionHeader icon={<Briefcase className="w-6 h-6" />} title="Expériences Professionnelles" />
                            <CvInfoExperienceSection items={experiences} linkRoute="experiences.index" openModal={openExperienceModal} />

                            <SectionHeader icon={<GraduationCap className="w-6 h-6" />} title="Compétences" />
                            <CompetenceManager auth={auth} availableCompetences={availableCompetences} initialUserCompetences={competences} />

                            <SectionHeader icon={<GraduationCap className="w-6 h-6" />} title="Formations" />
                            <ProfessionManager auth={auth} availableProfessions={availableProfessions} initialUserProfession={myProfession} />

                            <SectionHeader icon={<Heart className="w-6 h-6" />} title="Centres d'Intérêt" />
                            <HobbyManager auth={auth} availableHobbies={availableHobbies} initialUserHobbies={hobbies} />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button onClick={exportToPdf} variant="outline">
                                        <Download className="w-4 h-4 mr-2" />
                                        Exporter en PDF
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Télécharger votre CV en format PDF</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </CardFooter>
                </Card>
            </div>

            <Modal isOpen={isExperienceModalOpen} onClose={closeExperienceModal} title="Expériences Professionnelles" description="Détails des expériences professionnelles">
                <ExperienceIndex auth={auth} experiences={experiences} />
            </Modal>
        </AuthenticatedLayout>
    );
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
    return (
        <div className="flex items-center space-x-2 font-bold text-2xl text-gray-800 mt-8 mb-4">
            {icon}
            <h2 className="text-lg font-bold">{title}</h2>
        </div>
    );
}

function PersonalInfoCard({ item, onEdit }: { item: CvInformation['personalInformation']; onEdit: () => void }) {
    return (
        <Card className="mb-8">
            <CardHeader className="bg-gray-100">
                <CardTitle className="text-3xl font-bold">{item.firstName} {item.lastName}</CardTitle>
                <p className="text-xl text-gray-600">Développeur Web Full Stack</p>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { icon: Mail, value: item.email },
                        { icon: Phone, value: item.phone },
                        { icon: MapPin, value: item.address },
                        { icon: Linkedin, value: item.linkedin },
                        { icon: Github, value: item.github },
                    ].map(({ icon: Icon, value }, index) => (
                        <div key={index} className="flex items-center">
                            <Icon className="w-5 h-5 mr-2 text-gray-500" />
                            <span className="text-gray-600">{value}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="bg-gray-100">
                <Button variant="outline" className="w-full" onClick={onEdit}>Modifier</Button>
            </CardFooter>
        </Card>
    );
}

function CvInfoExperienceSection({ items, linkRoute, openModal }: { items: CvInformation['experiences']; linkRoute: string; openModal: () => void }) {
    return (
        <div className="space-y-6">
            {items.map((item) => (
                <Card key={item.id}>
                    <CardHeader className="bg-gray-100">
                        <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                        <p className="text-gray-600">{item.company_name}</p>
                    </CardHeader>
                    <CardContent className="p-6">
                        <p className="text-sm text-gray-500 mb-2">{item.date_start} - {item.date_end || 'Present'}</p>
                        <Badge className="mb-2">{item.category_name}</Badge>
                        <p className="mb-2">{item.description}</p>
                        <p className="font-semibold">Réalisations:</p>
                        <p>{item.output}</p>
                    </CardContent>
                    <CardFooter className="bg-gray-100">
                        <Button onClick={openModal} variant="outline" className="w-full">Détails</Button>
                    </CardFooter>
                </Card>
            ))}
            <Button onClick={openModal} className="w-full">Voir Plus</Button>
        </div>
    );
}

function CvInfoListSection({ items, linkRoute, openModal }: { items: Array<{ id: number; name: string }>; linkRoute: string; openModal: () => void }) {
    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
                {items.map((item) => (
                    <Badge key={item.id} variant="secondary">
                        {item.name}
                    </Badge>
                ))}
            </div>
            <Button onClick={openModal} variant="outline" className="w-full">Gérer</Button>
        </div>
    );
}

function CvInfoSummarySection({ items, linkRoute }: { items: CvInformation['summaries']; linkRoute: string }) {
    return (
        <div>
            {items.map((item) => (
                <Card key={item.id} className="mb-4">
                    <CardContent className="p-4">
                        <p className="text-gray-700">{item.description}</p>
                    </CardContent>
                </Card>
            ))}
            <Link href={route(linkRoute)}>Modifier</Link>
        </div>
    );
}
