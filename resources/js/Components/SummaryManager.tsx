import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { useToast } from '@/Components/ui/use-toast';
import { Textarea } from "@/Components/ui/textarea";
import TextInput from "@/Components/TextInput";

const SummaryManager = ({ auth, summaries, summary }) => {
    const [mode, setMode] = useState('list'); // 'list', 'create', 'edit'
    const { toast } = useToast();

    // Create mode
    const { data: createData, setData: setCreateData, post, processing: createProcessing, errors: createErrors, reset: resetCreate } = useForm({
        name: '',
        description: '',
    });

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        post(route('summaries.store'), {
            onSuccess: () => {
                toast({ title: "Résumé créé avec succès" });
                resetCreate();
                setMode('list');
            },
            onError: (errors) => {
                for (const field in errors) {
                    toast({ title: 'Erreur de validation', description: errors[field], variant: 'destructive' });
                }
            }
        });
    };

    // Edit mode
    const { data: editData, setData: setEditData, put, processing: editProcessing, errors: editErrors, reset: resetEdit } = useForm({
        name: summary.name || '',
        description: summary.description || '',
    });

    const handleEditSubmit = (e) => {
        e.preventDefault();
        put(route('summaries.update', summary.id), {
            onSuccess: () => {
                toast({ title: "Résumé modifié avec succès" });
                resetEdit();
                setMode('list');
            },
            onError: (errors) => {
                for (const field in errors) {
                    toast({ title: 'Erreur de validation', description: errors[field], variant: 'destructive' });
                }
            }
        });
    };

    // List mode
    const { delete: destroy, post: select } = useForm();

    const handleDelete = (summaryId) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce résumé ?')) {
            destroy(route('summaries.destroy', summaryId), {
                onSuccess: () => toast({ title: 'Résumé supprimé avec succès' }),
                onError: () => toast({ title: 'Erreur lors de la suppression du résumé', variant: 'destructive' })
            });
        }
    };

    const handleSelect = (summaryId) => {
        select(route('summaries.select', summaryId), {
            onSuccess: () => toast({ title: 'Résumé sélectionné avec succès' }),
            onError: () => toast({ title: 'Erreur lors de la sélection du résumé', variant: 'destructive' })
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Gestion des Résumés" />
            <div className="p-4">
                {mode === 'list' && (
                    <>
                        <h1 className="text-2xl font-semibold mb-4">Mes Résumés</h1>
                        <div className="mb-4">
                            <Button onClick={() => setMode('create')}>Ajouter un résumé</Button>
                        </div>
                        {summaries && summaries.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {summaries.map((summary) => (
                                    <div key={summary.id} className="bg-white rounded-md shadow-md p-4">
                                        <h2 className="text-lg font-semibold mb-2">{summary.name}</h2>
                                        <p className="text-gray-800 mb-4">{summary.description}</p>
                                        <div className="flex justify-end space-x-2">
                                            <Button variant="outline" onClick={() => { setEditData({ name: summary.name, description: summary.description }); setMode('edit'); }}>Modifier</Button>
                                            <Button variant="destructive" onClick={() => handleDelete(summary.id)}>Supprimer</Button>
                                            <Button variant="primary" onClick={() => handleSelect(summary.id)}>Sélectionner</Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
                                <p className="text-sm">Vous n'avez pas encore de résumés. Cliquez sur "Ajouter un résumé" pour commencer.</p>
                            </div>
                        )}
                    </>
                )}

                {mode === 'create' && (
                    <>
                        <h1 className="text-2xl font-semibold mb-4">Créer un résumé</h1>
                        <form onSubmit={handleCreateSubmit} className="space-y-4">
                            <div>
                                <InputLabel htmlFor="name" value="Titre du résumé" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    value={createData.name}
                                    onChange={(e) => setCreateData('name', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={createErrors.name} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="description" value="Description" />
                                <Textarea
                                    id="description"
                                    value={createData.description}
                                    onChange={(e) => setCreateData('description', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                <InputError message={createErrors.description} className="mt-2" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Button type="submit" disabled={createProcessing}>Créer</Button>
                                <Button onClick={() => setMode('list')} variant="outline">Annuler</Button>
                            </div>
                        </form>
                    </>
                )}

                {mode === 'edit' && (
                    <>
                        <h1 className="text-2xl font-semibold mb-4">Modifier un résumé</h1>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <InputLabel htmlFor="name" value="Titre du résumé" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    value={editData.name}
                                    onChange={(e) => setEditData('name', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={editErrors.name} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="description" value="Description" />
                                <Textarea
                                    id="description"
                                    value={editData.description}
                                    onChange={(e) => setEditData('description', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                <InputError message={editErrors.description} className="mt-2" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Button type="submit" disabled={editProcessing}>Enregistrer les modifications</Button>
                                <Button onClick={() => setMode('list')} variant="outline">Annuler</Button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default SummaryManager;
