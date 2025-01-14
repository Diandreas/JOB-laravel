import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { Head } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, FileText, Briefcase, Code, GraduationCap, Heart,
    ChevronRight, ChevronLeft, Mail, Phone, MapPin, Linkedin,
    Github, PencilIcon, AlertCircle, Check
} from 'lucide-react';
import { useToast } from '@/Components/ui/use-toast';
import Swal from 'sweetalert2';
import PersonalInformationEdit from './PersonalInformation/Edit';
import CompetenceManager from '@/Components/CompetenceManager';
import HobbyManager from '@/Components/HobbyManager';
import ProfessionManager from '@/Components/ProfessionManager';
import ExperienceManager from "@/Components/ExperienceManager";
import SummaryManager from '@/Components/SummaryManager';
// Composant de navigation entre sections
const SectionNavigation = ({
                               currentSection,
                               nextSection,
                               prevSection,
                               canProgress,
                               onNavigate
                           }) => (
    <div className="flex justify-between items-center mt-8 pt-6 border-t">
        {prevSection && (
            <Button
                variant="outline"
                onClick={() => onNavigate(prevSection.id)}
                className="flex items-center gap-2"
            >
                <ChevronLeft className="w-4 h-4" />
                {prevSection.label}
            </Button>
        )}
        {nextSection && (
            <Button
                onClick={() => onNavigate(nextSection.id)}
                disabled={!canProgress}
                className="flex items-center gap-2 ml-auto"
            >
                {nextSection.label}
                <ChevronRight className="w-4 h-4" />
            </Button>
        )}
    </div>
);

// Composant principal
export default function CvInterface({ auth, cvInformation }) {
    const [activeSection, setActiveSection] = useState('personalInfo');
    const [personalInfo, setPersonalInfo] = useState(cvInformation.personalInformation);
    const [isEditing, setIsEditing] = useState(false);
    const { toast } = useToast();

    const handleEdit = () => setIsEditing(true);
    const handleCancel = () => setIsEditing(false);
    const handleUpdate = (updatedInfo) => {
        setPersonalInfo(updatedInfo);
        setIsEditing(false);
        toast({
            title: "Informations mises à jour",
            description: "Vos informations personnelles ont été enregistrées."
        });
    };

    const completionStatus = {
        personalInfo: true,
        summary: cvInformation.summaries.length > 0,
        experience: cvInformation.experiences.length > 0,
        competence: cvInformation.competences.length > 0,
        profession: true,
        hobby: cvInformation.hobbies.length > 0,
    };

    // @ts-ignore
    // @ts-ignore
    const sidebarItems = [
        {
            id: 'personalInfo',
            label: 'Informations Personnelles',
            icon: User,
            color: 'text-blue-500',
            component: isEditing ? (
                <PersonalInformationEdit
                    user={personalInfo}
                    onUpdate={handleUpdate}
                    onCancel={handleCancel}
                />
            ) : (
                <PersonalInfoCard
                    item={personalInfo}
                    onEdit={handleEdit}
                />
            )
        },
        {
            id: 'summary',
            label: 'Résumé',
            icon: FileText,
            color: 'text-green-500',
            component: (
                <SummaryManager
                    auth={auth}
                    summaries={cvInformation.allsummaries}
                    selectedSummary={cvInformation.summaries}
                />
            )
        },
        {
            id: 'experience',
            label: 'Expériences',
            icon: Briefcase,
            color: 'text-purple-500',
            component: (
                <ExperienceManager
                    // @ts-ignore
                    auth={auth}
                    experiences={cvInformation.experiences}
                    categories={cvInformation.experienceCategories}
                />
            )
        },
        {
            id: 'competence',
            label: 'Compétences',
            icon: Code,
            color: 'text-yellow-500',
            component: (
                <CompetenceManager
                    auth={auth}
                    availableCompetences={cvInformation.availableCompetences}
                    initialUserCompetences={cvInformation.competences}
                />
            )
        },
        {
            id: 'profession',
            label: 'Formation',
            icon: GraduationCap,
            color: 'text-red-500',
            canProgress: Boolean(cvInformation.myProfession?.length),
            component: (
                <ProfessionManager
                    auth={auth}
                    // @ts-ignore
                    availableProfessions={cvInformation.availableProfessions}
                    initialUserProfession={cvInformation.myProfession}
                    // @ts-ignore
                    onNavigate={(nextSection) => setActiveSection(nextSection)}
                />
            )
        },
        {
            id: 'hobby',
            label: 'Centres d\'Intérêt',
            icon: Heart,
            color: 'text-pink-500',
            component: (
                <HobbyManager
                    auth={auth}
                    availableHobbies={cvInformation.availableHobbies}
                    initialUserHobbies={cvInformation.hobbies}
                />
            )
        }
    ];

    const currentSectionIndex = sidebarItems.findIndex(item => item.id === activeSection);
    const nextSection = sidebarItems[currentSectionIndex + 1];
    const prevSection = sidebarItems[currentSectionIndex - 1];

    const getCompletionPercentage = () => {
        const completed = Object.values(completionStatus).filter(status => status).length;
        return Math.round((completed / Object.keys(completionStatus).length) * 100);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-2xl text-gray-800 leading-tight">Mon CV Professionnel</h2>}
        >
            <Head title="CV Professionnel" />

            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto py-6 px-4">
                    <Card className="shadow-lg">
                        <CardHeader className="bg-white border-b">
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle className="text-2xl font-bold">Mon CV Professionnel</CardTitle>
                                    <p className="text-gray-500 mt-1">Complétez votre profil pour créer un CV percutant</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">Progression</p>
                                        <p className="text-xl font-bold text-primary">{getCompletionPercentage()}%</p>
                                    </div>
                                    <div className="h-12 w-12 rounded-full border-4 border-primary flex items-center justify-center">
                                        <span className="text-primary font-bold">{getCompletionPercentage()}%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Barre de progression optionnelle */}
                            <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${getCompletionPercentage()}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </CardHeader>

                        <div className="flex min-h-[600px]">
                            {/* Sidebar */}
                            <div className="w-64 border-r bg-gray-50">
                                <nav className="p-4 space-y-2">
                                    {sidebarItems.map(item => (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveSection(item.id)}
                                            className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                                                activeSection === item.id
                                                    ? 'bg-primary text-white shadow-md'
                                                    : 'hover:bg-gray-100'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <item.icon className={`h-5 w-5 ${
                                                    activeSection === item.id ? 'text-white' : item.color
                                                }`} />
                                                <span className="font-medium">{item.label}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {completionStatus[item.id] && (
                                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                                )}
                                                <ChevronRight className={`h-4 w-4 ${
                                                    activeSection === item.id ? 'text-white' : 'text-gray-400'
                                                }`} />
                                            </div>
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            {/* Main Content */}
                            <div className="flex-1 p-6">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeSection}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        {sidebarItems.find(item => item.id === activeSection)?.component}

                                        <SectionNavigation
                                            currentSection={activeSection}
                                            nextSection={nextSection}
                                            prevSection={prevSection}
                                            canProgress={completionStatus[activeSection]}
                                            onNavigate={setActiveSection}
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Votre personnalInfoCard existant reste le même
const PersonalInfoCard = ({ item, onEdit }) => {
    const personalInfoFields = [
        { label: "Email", value: item.email, icon: Mail },
        { label: "Téléphone", value: item.phone, icon: Phone },
        { label: "Adresse", value: item.address, icon: MapPin },
        { label: "LinkedIn", value: item.linkedin, icon: Linkedin },
        { label: "GitHub", value: item.github, icon: Github }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Informations Personnelles</h2>
                <Button
                    onClick={onEdit}
                    className="bg-primary hover:bg-primary/90 text-white"
                >
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Modifier
                </Button>
            </div>

            <Card>
                <CardContent className="p-6 space-y-6">
                    <div className="flex items-center gap-4 border-b pb-4">
                        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-10 w-10 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">
                                {item.firstName} {item.lastName}
                            </h3>
                            <p className="text-gray-500 text-lg">Développeur Web Full Stack</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                        {personalInfoFields.map(({ label, value, icon: Icon }) => (
                            <div key={label} className="flex items-start gap-3">
                                <div className="mt-1">
                                    <Icon className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500 font-medium">{label}</p>
                                    <p className="text-gray-900 font-medium">
                                        {value || 'Non renseigné'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
