import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { useToast } from '@/Components/ui/use-toast';

const ExperienceEdit = ({ auth, experience, categories }) => {
    const { toast } = useToast();
    const { data, setData, put, processing, errors, reset } = useForm({
        name: experience.name || '',
        description: experience.description || '',
        date_start: experience.date_start || '',
        date_end: experience.date_end || '',
        output: experience.output || '',
        experience_categories_id: experience.experience_categories_id || '',
        comment: experience.comment || '',
        InstitutionName: experience.InstitutionName || '',
        attachment: null,
    });

    const handleFileChange = (e) => {
        setData('attachment', e.target.files[0]);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }

        put(route('experiences.update', experience.id), formData, {
            onSuccess: () => {
                toast({
                    title: "Expérience modifiée avec succès",
                });
                reset();
            },
            onError: (errors) => {
                console.error(errors);
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Modifier une expérience" />
            <div className="p-4">
                <h1 className="text-2xl font-semibold mb-4">Modifier une expérience</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        <Select onValueChange={(value) => setData('experience_categories_id', value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Sélectionnez une catégorie" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={category.id}>
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

                    <div>
                        <InputLabel htmlFor="attachment" value="Pièce jointe" />
                        <TextInput
                            id="attachment"
                            type="file"
                            onChange={handleFileChange}
                            className="mt-1 block w-full"
                        />
                        {data.attachment && (
                            <p className="text-sm text-gray-500 mt-2">
                                Fichier sélectionné: {data.attachment.name}
                            </p>
                        )}
                        <InputError message={errors.attachment} className="mt-2" />
                    </div>

                    <div className="flex items-center gap-2">
                        <Button type="submit" disabled={processing}>Enregistrer les modifications</Button>
                        <Link href={route('experiences.index')} className="text-sm text-gray-600 underline">
                            Annuler
                        </Link>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default ExperienceEdit;
