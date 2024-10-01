import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useToast } from '@/Components/ui/use-toast';
import { Textarea } from "@/Components/ui/textarea";
import { TrashIcon, PencilIcon, PlusIcon, XIcon } from 'lucide-react';
import axios from "axios";
import {Card, CardContent, CardHeader, CardTitle} from "@/Components/ui/card";
import {Label} from "@/Components/ui/label";
import {Input} from "@/Components/ui/input";
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';

const SummaryManager = ({ auth, summaries: initialSummaries, selectedSummary: initialSelectedSummary }) => {
    const [summaries, setSummaries] = useState(initialSummaries);
    const [selectedSummary, setSelectedSummary] = useState(initialSelectedSummary);

    const [isFormVisible, setIsFormVisible] = useState(false);
    const { toast } = useToast();
    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        id: null,
        name: '',
        description: '',
    });

    const [filteredSummaries, setFilteredSummaries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');


    const showAlert = (title, icon = 'success') => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });

        Toast.fire({
            icon,
            title
        });
    };
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
                const updatedSummary = response.data.summary;
                setSelectedSummary([updatedSummary]);
                setSummaries(prevSummaries =>
                    prevSummaries.map(summary =>
                        summary.id === updatedSummary.id ? updatedSummary : summary
                    )
                );
                showAlert(response.data.message);
            })
            .catch(error => {
                console.error(error);
                showAlert('Erreur lors de la sélection du résumé', 'error');
            });
    };

    const handleCreate = (e) => {
        e.preventDefault();
        axios.post(route('summaries.store'), data)
            .then(response => {
                const newSummary = response.data.summary;
                setSummaries([...summaries, newSummary]);
                showAlert('Résumé créé avec succès', 'success');
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
                showAlert('Résumé mis à jour avec succès', 'success');
                resetForm();
            })
            .catch(error => {
                handleValidationErrors(error.response.data.errors);
            });
    };


    const handleDelete = (summaryId) => {
        Swal.fire({
            title: 'Supprimer ?',
            text: "Cette action est irréversible !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non',
            toast: true,
            position: 'top-end',
            timer: 5000,
            timerProgressBar: true,
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(route('summaries.destroy', summaryId))
                    .then(response => {
                        setSummaries(prevSummaries =>
                            prevSummaries.filter(summary => summary.id !== summaryId)
                        );
                        if (selectedSummary.some(s => s.id === summaryId)) {
                            setSelectedSummary([]);
                        }
                        showAlert('Résumé supprimé avec succès');
                    })
                    .catch(error => {
                        console.error(error);
                        showAlert('Erreur lors de la suppression du résumé', 'error');
                    });
            }
        });
    };

    const handleSelect = (summary) => {
        setData({
            id: summary.id,
            name: summary.name,
            description: summary.description,
        });
        setIsFormVisible(true);
    };

    const resetForm = () => {
        reset();
        setData('id', null);
        setIsFormVisible(false);
    };

    const handleValidationErrors = (errors) => {
        const errorMessages = Object.values(errors).join('\n');
        showAlert(errorMessages, 'error');
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="container mx-auto p-8 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold text-gray-800">Gestion des Résumés</h1>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button onClick={() => setIsFormVisible(!isFormVisible)} className="flex items-center gap-2">
                        {isFormVisible ? (
                            <XIcon className="h-4 w-4" />
                        ) : (
                            <PlusIcon className="h-4 w-4" />
                        )}
                        {isFormVisible ? 'Fermer' : 'Ajouter'}
                    </Button>
                </motion.div>
            </div>

            <AnimatePresence>
                {isFormVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card>
                            <CardContent>
                                <form onSubmit={data.id ? handleUpdate : handleCreate} className="space-y-6">
                                    <div>
                                        <Label htmlFor="name">Titre du résumé</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Entrez le titre du résumé"
                                        />
                                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Entrez la description"
                                        />
                                        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                                    </div>

                                    <div className="flex justify-end gap-4">
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Button type="submit" disabled={processing}>
                                                {data.id ? 'Enregistrer' : 'Créer'}
                                            </Button>
                                        </motion.div>
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Button variant="outline" onClick={resetForm}>
                                                Annuler
                                            </Button>
                                        </motion.div>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

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
                    </div>
                </div>

                <AnimatePresence>
                    {filteredSummaries.length > 0 ? (
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {filteredSummaries.map((summary) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    key={summary?.id}
                                >
                                    <Card className={`${
                                        selectedSummary.some((s) => s?.id === summary?.id) ? 'bg-primary/10 border-primary' : ''
                                    }`}>
                                        <CardHeader className="flex justify-between pb-2">
                                            <CardTitle>{summary?.name}</CardTitle>
                                            <div className="flex gap-2">
                                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                                    <Button variant="ghost" size="icon" onClick={() => handleSelect(summary)}>
                                                        <PencilIcon className="h-4 w-4" />
                                                    </Button>
                                                </motion.div>
                                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(summary?.id)}>
                                                        <TrashIcon className="h-4 w-4" />
                                                    </Button>
                                                </motion.div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">{summary?.description}</p>
                                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                <Button
                                                    variant={selectedSummary.some((s) => s?.id === summary?.id) ? "primary" : "secondary"}
                                                    onClick={() => handleSelectSummary(summary?.id)}
                                                    className="mt-2"
                                                >
                                                    {selectedSummary.some((s) => s?.id === summary?.id) ? 'Sélectionné' : 'Sélectionner'}
                                                </Button>
                                            </motion.div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Card>
                                <CardContent className="text-center py-6">
                                    <p className="text-sm text-muted-foreground">
                                        {searchQuery
                                            ? "Aucun résumé ne correspond à votre recherche."
                                            : "Aucun résumé pour l'instant. Utilisez le formulaire ci-dessus pour en créer un."}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SummaryManager;
