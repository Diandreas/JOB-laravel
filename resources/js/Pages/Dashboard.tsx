"use client"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from "@/Components/ui/button"
import { useToast } from "@/Components/ui/use-toast";
import { LucideIcon, List, UserCircle2, Heart, Briefcase, Settings } from 'lucide-react';

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

export default function Dashboard({ auth }: PageProps) {
    const { toast } = useToast()

    const categories = [
        { title: "Experience Categories", description: "Create, update, and manage experience categories", href: "/experience-categories", Icon: List },
        { title: "Professions Categories", description: "Create, update, and manage profession categories", href: "/profession-categories", Icon: UserCircle2 },
        { title: "Hobbies", description: "Create, update, and manage hobbies", href: "/hobbies", Icon: Heart },
        { title: "Professions", description: "Create, update, and manage professions", href: "/professions", Icon: Briefcase },
        { title: "Competences", description: "Create, update, and manage competences", href: "/competences", Icon: Settings },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>}
        >
            <Head title="Dashboard" />
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
