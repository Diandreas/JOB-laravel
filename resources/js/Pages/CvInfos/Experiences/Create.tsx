import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { useToast } from '@/Components/ui/use-toast';
import TextInput from "@/Components/TextInput";

// @ts-ignore
const ExperienceCreate = ({ auth, categories }) => {
    const { toast } = useToast();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        date_start: '',
        date_end: '',
        output: '',
        experience_categories_id: '',
        comment: '',
        InstitutionName: '',
        attachment_id: null, // Ajout du champ pour l'attachment
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('experiences.store'), {
            onSuccess: () => {
                toast({
                    title: "Expérience créée avec succès",
                });
                reset();
            },
            onError: (errors) => {
                console.error(errors);
            }
        });
    };

    // @ts-ignore
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Créer une expérience" />
            <div className="p-4">
                <h1 className="text-2xl font-semibold mb-4">Créer une expérience</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Champs du formulaire */}
                    <div>
                        <InputLabel htmlFor="name" value="Nom de l'expérience" />
                        <TextInput id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1 block w-full" />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="description" value="Description" />
                        <TextInput id="description" type="text" value={data.description} onChange={(e) => setData('description', e.target.value)} className="mt-1 block w-full" />
                        <InputError message={errors.description} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="date_start" value="Date de début" />
                        <TextInput id="date_start" type="date" value={data.date_start} onChange={(e) => setData('date_start', e.target.value)} className="mt-1 block w-full" />
                        <InputError message={errors.date_start} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="date_end" value="Date de fin" />
                        <TextInput id="date_end" type="date" value={data.date_end} onChange={(e) => setData('date_end', e.target.value)} className="mt-1 block w-full" />
                        <InputError message={errors.date_end} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="output" value="Résultat" />
                        <TextInput id="output" type="text" value={data.output} onChange={(e) => setData('output', e.target.value)} className="mt-1 block w-full" />
                        <InputError message={errors.output} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="experience_categories_id" value="Catégorie" />
                        <Select value={data.experience_categories_id} onValueChange={(value) => setData('experience_categories_id', value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Sélectionnez une catégorie" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={category.id.toString()}> {/* Correction ici */}
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.experience_categories_id} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="comment" value="Commentaire" />
                        <TextInput id="comment" type="text" value={data.comment} onChange={(e) => setData('comment', e.target.value)} className="mt-1 block w-full" />
                        <InputError message={errors.comment} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="InstitutionName" value="Nom de l'institution" />
                        <TextInput id="InstitutionName" type="text" value={data.InstitutionName} onChange={(e) => setData('InstitutionName', e.target.value)} className="mt-1 block w-full" />
                        <InputError message={errors.InstitutionName} className="mt-2" />
                    </div>

                    {/* Champ pour l'attachment (à implémenter selon votre logique de gestion de fichiers) */}
                    <div>
                        <InputLabel htmlFor="attachment_id" value="Pièce jointe" />
                        {/* ... (TextInput pour le téléchargement de fichier) */}
                    </div>

                    <div className="flex items-center gap-2">
                        <Button type="submit" disabled={processing}>Créer</Button>
                        <Link href={route('experiences.index')} className="text-sm text-gray-600 underline">
                            Annuler
                        </Link>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default ExperienceCreate;
