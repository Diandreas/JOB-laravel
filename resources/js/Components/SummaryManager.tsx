import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useToast } from '@/Components/ui/use-toast';
import { Textarea } from "@/Components/ui/textarea";
import { TrashIcon, PencilIcon } from 'lucide-react';

const SummaryManager = ({ auth, summaries, selectedSummary }) => {
    const { toast } = useToast();
    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        id: null,
        name: '',
        description: '',
    });
    const [filteredSummaries, setFilteredSummaries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setFilteredSummaries(
            summaries.filter((summary) =>
                summary.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [summaries, searchQuery]);

    const handleSelectSummary = (summaryId) => {
        post(route('summaries.select', summaryId), {
            onSuccess: () => toast({ title: 'Résumé sélectionné avec succès' }),
            onError: () => toast({ title: 'Erreur lors de la sélection du résumé', variant: 'destructive' }),
        });
    };

    const handleCreate = (e) => {
        e.preventDefault();
        post(route('summaries.store'), {
            onSuccess: () => {
                toast({ title: "Résumé créé avec succès" });
                resetForm();
            },
            onError: handleValidationErrors,
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        put(route('summaries.update', data.id), {
            onSuccess: () => {
                toast({ title: "Résumé modifié avec succès" });
                resetForm();
            },
            onError: handleValidationErrors,
        });
    };

    const handleDelete = (summaryId) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce résumé ?')) {
            destroy(route('summaries.destroy', summaryId), {
                onSuccess: () => toast({ title: 'Résumé supprimé avec succès' }),
                onError: () => toast({ title: 'Erreur lors de la suppression du résumé', variant: 'destructive' }),
            });
        }
    };

    const handleSelect = (summary) => {
        setData({
            id: summary.id,
            name: summary.name,
            description: summary.description,
        });
    };

    const resetForm = () => {
        reset();
        setData('id', null);
    };

    const handleValidationErrors = (errors) => {
        for (const field in errors) {
            toast({
                title: 'Erreur de validation',
                description: errors[field],
                variant: 'destructive',
            });
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Gestion des Résumés</h1>

            <form onSubmit={data.id ? handleUpdate : handleCreate} className="space-y-6 mb-8">
                <div>
                    <InputLabel htmlFor="name" value="Titre du résumé" />
                    <TextInput
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="mt-1 block w-full"
                        placeholder="Entrez le titre du résumé"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="description" value="Description" />
                    <Textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="mt-1 block w-full"
                        placeholder="Entrez la description du résumé"
                    />
                    <InputError message={errors.description} className="mt-2" />
                </div>

                <div className="flex justify-end gap-4">
                    <Button type="submit" disabled={processing} className="bg-indigo-600 hover:bg-indigo-700">
                        {data.id ? 'Enregistrer les modifications' : 'Créer'}
                    </Button>
                    {data.id && (
                        <Button variant="outline" onClick={resetForm} className="border border-gray-300">
                            Annuler
                        </Button>
                    )}
                </div>
            </form>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-700">Résumés</h2>
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <Button variant="default" onClick={() => setFilteredSummaries(summaries)}>
                            Tout afficher
                        </Button>
                    </div>
                </div>

                {filteredSummaries.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSummaries.map((summary) => (
                            <div
                                key={summary?.id}
                                className={`p-4 border rounded-lg shadow-sm hover:shadow-md transition ${
                                    selectedSummary.some((s) => s?.id === summary?.id) ? 'bg-indigo-50 border-indigo-400' : 'bg-white'
                                }`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-medium text-gray-800">{summary?.name}</h3>
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => handleSelect(summary)}
                                            className="p-2 text-gray-600 hover:text-indigo-600"
                                        >
                                            <PencilIcon className="w-5 h-5" />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={() => handleDelete(summary?.id)}
                                            className="p-2 text-red-600 hover:text-red-700"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-4">{summary?.description}</p>
                                <div className="flex justify-end">
                                    <Button
                                        variant="default"
                                        onClick={() => handleSelectSummary(summary?.id)}
                                        className="bg-indigo-600 text-white hover:bg-indigo-700"
                                    >
                                        Sélectionner
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded-md" role="alert">
                        <p className="text-sm">
                            Vous n'avez pas encore de résumés. Utilisez le formulaire ci-dessus pour en créer un.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SummaryManager;
