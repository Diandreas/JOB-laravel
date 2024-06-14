import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardFooter } from "@/Components/ui/card";
import { Trash2 } from "lucide-react";
import {PageProps} from "@/types";
import {toast} from "@/Components/ui/use-toast";

interface Profession {
    id: number;
    name: string;
    description: string;
}

interface UserProfessionsProps extends PageProps {
    user_professions: Profession[];
}

const UserProfessions = ({ auth, user_professions }: UserProfessionsProps) => {
    const [professions, setProfessions] = useState<Profession[]>(user_professions);

    const handleDeassignProfession = (professionId: number) => {
        if (confirm('Are you sure you want to de-assign this profession?')) {
            axios.delete(`/user-professions/${auth.user.id}/${professionId}`)
                .then(() => {
                    const updatedProfessions = professions.filter(profession => profession.id !== professionId);
                    setProfessions(updatedProfessions);
                    toast({
                        title: 'Success',
                        description: 'Profession de-assigned successfully!',
                    });
                })
                .catch(error => {
                    if (error.response && error.response.status === 403) {
                        toast({
                            title: 'Unauthorized',
                            description: 'You are not allowed to de-assign this profession.',
                            variant: 'destructive',
                        });
                    } else {
                        console.error('Error de-assigning profession:', error);
                        toast({
                            title: 'An error occurred',
                            description: 'Failed to de-assign profession. Please try again later.',
                            variant: 'destructive',
                        });
                    }
                });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User Professions</h2>}
        >
            <Head title="User Professions" />
            <div className="w-full md:w-1/2 p-4">
                <Link href="/user-professions/create">
                    <Button>Assign a new profession</Button>
                </Link>
            </div>
            <div className="flex flex-wrap">
                {professions.map((profession) => (
                    <div key={profession.id} className="w-full md:w-1/2 p-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>{profession.name}</CardTitle>
                            </CardHeader>
                            <CardFooter>
                                <Button onClick={() => handleDeassignProfession(profession.id)}>
                                    <Trash2 size={18} />
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
};

export default UserProfessions;
