import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useToast } from '@/Components/ui/use-toast';
import { Textarea } from "@/Components/ui/textarea";
import { TrashIcon, PencilIcon } from 'lucide-react';
import axios from "axios";
import {Card, CardContent, CardHeader, CardTitle} from "@/Components/ui/card";
import {Label} from "@/Components/ui/label";
import {Input} from "@/Components/ui/input";

const SummaryManager = ({ auth, summaries: initialSummaries, selectedSummary }) => {
    const [summaries, setSummaries] = useState(initialSummaries);
    const [selectedSummaryId, setSelectedSummaryId] = useState(selectedSummary?.id);
    const { toast } = useToast();
    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        id: null,
        name: '',
        description: '',
    });
    // const [summaries, setSummaries] = useState(summaries);

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
        axios.post(route('summaries.select', summaryId))
            .then(response => {
                // Mettre à jour l'état local si nécessaire
                toast({ title: response.data.message });
            })
            .catch(error => {
                console.error(error);
                toast({ title: 'Erreur lors de la sélection du résumé', variant: 'destructive' });
            });
    };


    const handleCreate = (e) => {
        e.preventDefault();
        axios.post(route('summaries.store'), data)
            .then(response => {
                const newSummary = response.data.summary;
                setSummaries([...summaries, newSummary]);
                toast({ title: response.data.message });
                resetForm();
            })
            .catch(error => {
                handleValidationErrors(error.response.data.errors);
            });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(route('summaries.update', data.id), data)
            .then(response => {
                setSummaries(prevSummaries =>
                    prevSummaries.map(summary =>
                        summary.id === response.data.summary.id ? response.data.summary : summary
                    )
                );
                toast({ title: response.data.message });
                resetForm();
            })
            .catch(error => {
                handleValidationErrors(error.response.data.errors);
            });
    };
    const handleDelete = (summaryId) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce résumé ?')) {
            axios.delete(route('summaries.destroy', summaryId))
                .then(response => {
                    setSummaries(prevSummaries =>
                        prevSummaries.filter(summary => summary.id !== summaryId)
                    );
                    toast({ title: response.data.message });
                })
                .catch(error => {
                    console.error(error);
                    toast({ title: 'Erreur lors de la suppression du résumé', variant: 'destructive' });
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
        <div className="container mx-auto p-8 space-y-8">
            <h1 className="text-4xl font-bold text-gray-800">Gestion des Résumés</h1>

            <Card>
                <CardHeader>
                    <CardTitle>{data.id ? 'Modifier le résumé' : 'Créer un résumé'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={data.id ? handleUpdate : handleCreate} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Titre du résumé</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Entrez le titre du résumé"
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Entrez la description du résumé"
                            />
                            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button type="submit" disabled={processing}>
                                {data.id ? 'Enregistrer les modifications' : 'Créer'}
                            </Button>
                            {data.id && (
                                <Button variant="outline" onClick={resetForm}>
                                    Annuler
                                </Button>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-700">Résumés</h2>
                    <div className="flex items-center gap-2">
                        <Input
                            type="text"
                            placeholder="Rechercher..."
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <Button variant="outline" onClick={() => setFilteredSummaries(summaries)}>
                            Tout afficher
                        </Button>
                    </div>
                </div>

                {filteredSummaries.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSummaries.map((summary) => (
                            <Card key={summary?.id} className={`${
                                selectedSummary.some((s) => s?.id === summary?.id) ? 'bg-primary/10 border-primary' : ''
                            }`}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-lg font-medium">{summary?.name}</CardTitle>
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleSelect(summary)}
                                        >
                                            <PencilIcon className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(summary?.id)}
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4">{summary?.description}</p>
                                    <div className="flex justify-end">
                                        <Button
                                            variant="secondary"
                                            onClick={() => handleSelectSummary(summary?.id)}
                                        >
                                            Sélectionner
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="text-center py-6">
                            <p className="text-sm text-muted-foreground">
                                Vous n'avez pas encore de résumés. Utilisez le formulaire ci-dessus pour en créer un.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default SummaryManager;
