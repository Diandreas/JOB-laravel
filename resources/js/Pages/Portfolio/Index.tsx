import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { User, Copy, Check } from 'lucide-react';
import { Button } from "@/Components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { useToast } from "@/Components/ui/use-toast";
import NavLink from "@/Components/NavLink";

export default function Index({ auth }) {
    const { toast } = useToast();
    const [copied, setCopied] = useState(false);
    const portfolioUrl = `${window.location.origin}/portfolio/${auth.user.username || auth.user.email}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(portfolioUrl).then(() => {
            setCopied(true);
            toast({
                title: "Lien copié !",
                description: "Le lien de votre portfolio a été copié dans le presse-papier.",
            });
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Mon Portfolio</h2>}
        >
            <Head title="Mon Portfolio" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Gérer mon Portfolio</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4">Voici le lien vers votre portfolio public :</p>
                            <div className="flex items-center space-x-2">
                                <Input
                                    value={portfolioUrl}
                                    readOnly
                                    className="flex-grow"
                                />
                                <Button onClick={copyToClipboard}>
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>
                            <div className="mt-6">
                                <NavLink href={route('portfolio.edit')} variant="outline">
                                    Éditer mon portfolio
                                </NavLink>
                            </div>
                            <div className="mt-4">
                                <NavLink href={route('portfolio.show', { identifier: auth.user.username || auth.user.email })} variant="outline">
                                    Voir mon portfolio public
                                </NavLink>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
