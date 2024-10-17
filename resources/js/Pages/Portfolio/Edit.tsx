import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from "@/Components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Switch } from "@/Components/ui/switch";

export default function Edit({ auth, portfolio, settings }) {
    const { data, setData, put, processing, errors } = useForm({
        design: settings.design || 'professional',
        show_experiences: settings.show_experiences || false,
        show_competences: settings.show_competences || false,
        show_hobbies: settings.show_hobbies || false,
        show_summary: settings.show_summary || false,
        show_contact_info: settings.show_contact_info || false,
        profile_picture: null,
    });

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted", data);  // Débogage
        put(route('portfolio.update'), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                console.log("Form submitted successfully");  // Débogage
                // Vous pouvez ajouter ici une notification de succès
            },
            onError: (errors) => {
                console.error("Form submission failed", errors);  // Débogage
                // Vous pouvez ajouter ici une notification d'erreur
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Éditer mon Portfolio</h2>}
        >
            <Head title="Éditer mon Portfolio" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Paramètres du Portfolio</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={onSubmit}>
                                <div className="mb-4">
                                    <label className="block mb-2">Design du Portfolio</label>
                                    <select
                                        value={data.design}
                                        onChange={(e) => setData('design', e.target.value)}
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="intuitive">Intuitif</option>
                                        <option value="professional">Professionnel</option>
                                        <option value="user-friendly">Convivial</option>
                                    </select>
                                    {errors.design && <div className="text-red-500">{errors.design}</div>}
                                </div>


                                <div className="mb-4">
                                    <label className="block mb-2">Éléments à afficher</label>
                                    <div className="space-y-2">
                                        {['experiences', 'competences', 'hobbies', 'summary', 'contact_info'].map((item) => (
                                            <div key={item} className="flex items-center">
                                                <Switch
                                                    checked={data[`show_${item}`]}
                                                    onCheckedChange={(checked) => setData(`show_${item}`, checked)}
                                                />
                                                <span className="ml-2">Afficher les {item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-2">Photo de profil</label>
                                    <Input
                                        type="file"
                                        onChange={(e) => setData('profile_picture', e.target.files[0])}
                                    />
                                </div>

                                <Button type="submit" disabled={processing}>
                                    Enregistrer les modifications
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
