"use client"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from "@/Components/ui/button"
import { LucideIcon, Heart, Briefcase, Award, UserCircle2, FileText, User } from 'lucide-react';

interface CategoryCardProps {
    title: string;
    description: string;
    href: string;
    Icon: LucideIcon;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, description, href, Icon }) => (
    <Card className="h-full transition-all duration-300 hover:shadow-lg">
        <CardHeader>
            <div className="flex items-center space-x-4">
                <Icon className="w-6 h-6 text-primary" />
                <CardTitle className="text-xl font-bold">{title}</CardTitle>
            </div>
        </CardHeader>
        <CardContent>
            <p className="text-gray-600 mb-4">{description}</p>
            <Link href={href}>
                <Button className="w-full">Manage</Button>
            </Link>
        </CardContent>
    </Card>
);

export default function Index({ auth }: PageProps) {
    const categories = [
        { title: "Hobby", description: "Create, update, and manage your hobbies", href: route('user-hobbies.index'), Icon: Heart },
        { title: "Competences", description: "Create, update, and manage your competences", href: route('user-competences.index'), Icon: Award },
        { title: "Experiences", description: "Create, update, and manage your experiences", href: route('experiences.index'), Icon: Briefcase },
        { title: "Profession", description: "Create, update, and manage your profession", href: route('user-professions.index'), Icon: UserCircle2 },
        { title: "Mes Sommaire", description: "Create, update, and manage your summary", href: route('summaries.index'), Icon: FileText },
        { title: "Personal Information", description: "Edit your information and download your CV", href: route('personal-information.index'), Icon: User },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h1 className="text-3xl font-bold text-gray-800">My Information</h1>}
        >
            <Head title="CV Information" />
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, index) => (
                        <CategoryCard key={index} {...category} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
