import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/Components/ui/card";
import { Head } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/Components/ui/tabs";
import { motion } from 'framer-motion';
import Modal from '@/Components/ui/Modal';
import ExperienceIndex from '@/Pages/CvInfos/Experiences/Index';
import PersonalInformationEdit from './PersonalInformation/Edit';
import CompetenceManager from '@/Components/CompetenceManager';
import HobbyManager from '@/Components/HobbyManager';
import ProfessionManager from '@/Components/ProfessionManager';
import SummaryManager from '@/Components/SummaryManager';
import ExperienceCreate from "@/Pages/CvInfos/Experiences/Create";
import ExperienceShow from "@/Pages/CvInfos/Experiences/Show";
import ExperienceEdit from "@/Pages/CvInfos/Experiences/Edit"; // Added import
import SummaryCreate from "@/Pages/CvInfos/Summaries/Create"; // Added import
import SummaryShow from "@/Pages/CvInfos/Summaries/Edit"; // Added import

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
    experienceCategories:{name: string ; description : string ; ranking : number}[];
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
}

interface Props {
    auth: any;
    cvInformation: CvInformation;
}

export default function Show({ auth, cvInformation }: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
    const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false); // Added state for summary modal
    const [personalInfo, setPersonalInfo] = useState(cvInformation.personalInformation);
    const [selectedExperience, setSelectedExperience] = useState(null);
    const [selectedSummary, setSelectedSummary] = useState(null); // Added state for selected summary
    const [isCreatingExperience, setIsCreatingExperience] = useState(false);
    const [isEditingExperience, setIsEditingExperience] = useState(false); // Added state for editing experience
    const [isCreatingSummary, setIsCreatingSummary] = useState(false); // Added state for creating summary

    const handleEdit = () => setIsEditing(true);
    const handleCancel = () => setIsEditing(false);
    const handleUpdate = (updatedInfo) => {
        setPersonalInfo(updatedInfo);
        setIsEditing(false);
    };

    const openExperienceModal = (experience) => {
        setSelectedExperience(experience);
        setIsCreatingExperience(!experience);
        setIsEditingExperience(!!experience);
        setIsExperienceModalOpen(true);
    };

    const closeExperienceModal = () => setIsExperienceModalOpen(false);

    const openSummaryModal = (summary) => { // Function to handle opening the summary modal
        setSelectedSummary(summary);
        setIsCreatingSummary(!summary);
        setIsSummaryModalOpen(true);
    };

    const closeSummaryModal = () => setIsSummaryModalOpen(false);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-2xl text-gray-800 leading-tight">Mon CV Professionnel</h2>}
        >
            <Head title="CV Professionnel" />

            <motion.div
                className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="mb-8">
                    <CardContent className="p-6">
                        <Tabs defaultValue="personalInfo">
                            <TabsList className="mb-6">
                                <TabsTrigger value="personalInfo">Informations Personnelles</TabsTrigger>
                                <TabsTrigger value="summary">Résumé</TabsTrigger>
                                <TabsTrigger value="experience">Expériences</TabsTrigger>
                                <TabsTrigger value="competence">Compétences</TabsTrigger>
                                <TabsTrigger value="profession">Formations</TabsTrigger>
                                <TabsTrigger value="hobby">Centres d'Intérêt</TabsTrigger>
                            </TabsList>

                            <TabsContent value="personalInfo">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {isEditing ? (
                                        <PersonalInformationEdit
                                            user={personalInfo}
                                            onUpdate={handleUpdate}
                                            onCancel={handleCancel}
                                        />
                                    ) : (
                                        <PersonalInfoCard item={personalInfo} onEdit={handleEdit} />
                                    )}
                                </motion.div>
                            </TabsContent>

                            <TabsContent value="summary">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <CvInfoSummarySection items={cvInformation.summaries} openModal={openSummaryModal} selectedSummary={selectedSummary} />
                                </motion.div>
                            </TabsContent>

                            <TabsContent value="experience">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <CvInfoExperienceSection items={cvInformation.experiences} openModal={openExperienceModal} />
                                </motion.div>
                            </TabsContent>

                            <TabsContent value="competence">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <CompetenceManager auth={auth} availableCompetences={cvInformation.competences} initialUserCompetences={cvInformation.competences} />
                                </motion.div>
                            </TabsContent>

                            <TabsContent value="profession">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <ProfessionManager auth={auth} availableProfessions={cvInformation.professions} initialUserProfession={cvInformation.myProfession} />
                                </motion.div>
                            </TabsContent>

                            <TabsContent value="hobby">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <HobbyManager auth={auth} availableHobbies={cvInformation.hobbies} initialUserHobbies={cvInformation.hobbies} />
                                </motion.div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Experience Modal */}
            <Modal isOpen={isExperienceModalOpen} onClose={closeExperienceModal} title="Expériences Professionnelles">
                {isCreatingExperience ? (
                    <ExperienceCreate auth={auth} categories={cvInformation.experienceCategories} />
                ) : isEditingExperience ? (
                    <ExperienceEdit auth={auth} experience={selectedExperience} categories={cvInformation.experienceCategories} />
                ) : (
                    <ExperienceShow auth={auth} experience={selectedExperience} />
                )}
            </Modal>

            {/* Summary Modal */}
            <Modal isOpen={isSummaryModalOpen} onClose={closeSummaryModal} title="Résumé">
                {isCreatingSummary ? (
                    <SummaryCreate auth={auth} />
                ) : (
                    <SummaryShow auth={auth} summary={selectedSummary} />
                )}
            </Modal>
        </AuthenticatedLayout>
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
                        { value: item.email, label: "Email" },
                        { value: item.phone, label: "Téléphone" },
                        { value: item.address, label: "Adresse" },
                        { value: item.linkedin, label: "LinkedIn" },
                        { value: item.github, label: "GitHub" }
                    ].map(({ value, label }) => (
                        <div key={label} className="flex items-center">
                            <span className="font-semibold">{label}:</span>
                            <span className="ml-2">{value}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={onEdit}>Modifier</Button>
            </CardFooter>
        </Card>
    );
}

function CvInfoExperienceSection({ items, openModal }: { items: ExperienceIndexProps['experiences']; openModal: (experience: Experience | null) => void }) {
    return (
        <div className="space-y-4">
            <div className="mb-4">
                <Button onClick={() => openModal(null)}>Ajouter une expérience</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((experience) => (
                    <Card key={experience.id} className="bg-white rounded-md shadow-md p-4">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">{experience.name}</CardTitle>
                            <p className="text-gray-600">
                                {experience.date_start} - {experience.date_end || 'Présent'}
                            </p>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-800">{experience.description}</p>
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => openModal(experience)}>Voir</Button>
                            <Button variant="outline" onClick={() => openModal(experience)}>Modifier</Button>
                            <Button variant="destructive">Supprimer</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

function CvInfoSummarySection({ items, openModal, selectedSummary }: { items: { id: number; description: string }[]; openModal: (summary: { id: number; description: string } | null) => void; selectedSummary: { id: number; description: string } | null; }) {
    return (
        <div className="space-y-4">
            <div className="mb-4">
                <Button onClick={() => openModal(null)}>Ajouter un résumé</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((summary) => (
                    <Card
                        key={summary.id}
                        className={`bg-white rounded-md shadow-md p-4 ${selectedSummary?.id === summary.id ? 'border-2 border-green-500' : ''}`}
                        onClick={() => openModal(summary)}
                    >
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Résumé {summary.id}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-800">{summary.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
