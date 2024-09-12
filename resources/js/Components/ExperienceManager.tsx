import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from "@/Components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { useToast } from '@/Components/ui/use-toast';
import {Briefcase, Plus, Edit, Trash2, X, Eye, FileUp, ChevronDown, ChevronUp, Search} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/Components/ui/accordion";
import axios from "axios";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/Components/ui/resizable";

const ExperienceManager = ({ experiences: initialExperiences = [], categories = [] }) => {
    const { toast } = useToast();
    const [experiences, setExperiences] = useState(initialExperiences);
    const [filteredExperiences, setFilteredExperiences] = useState(initialExperiences);
    const [isEditing, setIsEditing] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { data, setData, reset, errors } = useForm({
        id: '',
        name: '',
        description: '',
        date_start: '',
        date_end: '',
        output: '',
        experience_categories_id: '',
        comment: '',
        InstitutionName: '',
        attachment_id: '',
    });
    const handlePreviewPDF = (attachmentUrl) => {
        if (!attachmentUrl || !attachmentUrl.endsWith('.pdf')) {
            toast({
                title: 'Fichier non pris en charge',
                description: 'Seules les pièces jointes PDF sont autorisées pour la prévisualisation.',
                variant: 'destructive',
            });
            return;
        }

        const newWindow = window.open(attachmentUrl, '_blank');
        if (newWindow) newWindow.focus(); // Focus the newly opened PDF window
    };
    useEffect(() => {
        const filtered = experiences.filter(exp =>
            exp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exp.InstitutionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exp.output.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exp.comment.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredExperiences(filtered);
    }, [searchTerm, experiences]);

    const experiencesByCategory = filteredExperiences.reduce((acc, exp) => {
        const categoryId = exp.experience_categories_id;
        if (!acc[categoryId]) {
            acc[categoryId] = [];
        }
        acc[categoryId].push(exp);
        return acc;
    }, {});
    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEditing ? `/experiences/${data.id}` : '/experiences';
        const method = isEditing ? 'put' : 'post';

        axios[method](url, data)
            .then(response => {
                if (isEditing) {
                    setExperiences(prevExperiences =>
                        prevExperiences.map(exp =>
                            exp.id === response.data.experience.id ? response.data.experience : exp
                        )
                    );
                } else {
                    setExperiences(prevExperiences => [...prevExperiences, response.data.experience]);
                }

                toast({
                    title: isEditing ? "Expérience mise à jour" : "Expérience créée",
                    description: "L'opération a été effectuée avec succès.",
                });
                resetForm();
            })
            .catch(error => {
                console.error(error);
                toast({
                    title: "Erreur",
                    description: "Une erreur est survenue.",
                    variant: "destructive",
                });
            });
    };

    const handleEdit = (experience) => {
        setData(experience);
        setIsEditing(true);
    };

    const handleDelete = (experienceId) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette expérience ?')) {
            axios.delete(`/experiences/${experienceId}`)
                .then(() => {
                    setExperiences(prevExperiences =>
                        prevExperiences.filter(exp => exp.id !== experienceId)
                    );
                    toast({
                        title: "Expérience supprimée",
                        description: "L'expérience a été supprimée avec succès.",
                    });
                })
                .catch(error => {
                    console.error(error);
                    toast({
                        title: "Erreur",
                        description: "Une erreur est survenue lors de la suppression.",
                        variant: "destructive",
                    });
                });
        }
    };

    const resetForm = () => {
        reset();
        setIsEditing(false);
    };

    const toggleCategory = (categoryId) => {
        setExpandedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    return (
        <div className="container mx-auto py-12">
            <h1 className="text-3xl font-bold mb-8 flex items-center">
                <Briefcase className="mr-3 text-primary" /> Mes expériences
            </h1>
            <ResizablePanelGroup direction="horizontal"  className="min-h-[800px] rounded-lg border">
                <ResizablePanel defaultSize={30} minSize={20}>

                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>{isEditing ? 'Modifier une expérience' : 'Ajouter une expérience'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nom de l'expérience</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Nom de l'expérience"
                                    />
                                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="InstitutionName">Nom de l'institution</Label>
                                    <Input
                                        id="InstitutionName"
                                        value={data.InstitutionName}
                                        onChange={(e) => setData('InstitutionName', e.target.value)}
                                        placeholder="Nom de l'institution"
                                    />
                                    {errors.InstitutionName && <p className="text-sm text-destructive">{errors.InstitutionName}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="date_start">Date de début</Label>
                                    <Input
                                        id="date_start"
                                        type="date"
                                        value={data.date_start}
                                        onChange={(e) => setData('date_start', e.target.value)}
                                    />
                                    {errors.date_start && <p className="text-sm text-destructive">{errors.date_start}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="date_end">Date de fin</Label>
                                    <Input
                                        id="date_end"
                                        type="date"
                                        value={data.date_end}
                                        onChange={(e) => setData('date_end', e.target.value)}
                                    />
                                    {errors.date_end && <p className="text-sm text-destructive">{errors.date_end}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Décrivez votre expérience"
                                />
                                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="output">Résultat</Label>
                                <Input
                                    id="output"
                                    value={data.output}
                                    onChange={(e) => setData('output', e.target.value)}
                                    placeholder="Résultat obtenu"
                                />
                                {errors.output && <p className="text-sm text-destructive">{errors.output}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="experience_categories_id">Catégorie</Label>
                                <Select
                                    value={data.experience_categories_id}
                                    onValueChange={(value) => setData('experience_categories_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionnez une catégorie" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.id.toString()}>
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.experience_categories_id && <p className="text-sm text-destructive">{errors.experience_categories_id}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="comment">Commentaire</Label>
                                <Textarea
                                    id="comment"
                                    value={data.comment}
                                    onChange={(e) => setData('comment', e.target.value)}
                                    placeholder="Ajoutez un commentaire"
                                />
                                {errors.comment && <p className="text-sm text-destructive">{errors.comment}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="attachment_id">Pièce jointe</Label>
                                <Input
                                    id="attachment_id"
                                    type="file"
                                    onChange={(e) => setData('attachment_id', e.target.files[0])}
                                />
                                {errors.attachment_id && <p className="text-sm text-destructive">{errors.attachment_id}</p>}
                            </div>

                            <div className="flex justify-between">
                                <Button type="submit">
                                    {isEditing ? 'Mettre à jour' : 'Créer'}
                                </Button>
                                {isEditing && (
                                    <Button type="button" variant="outline" onClick={resetForm}>
                                        Annuler
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={70}>
                    <div className="p-6 h-full overflow-y-auto">
                        <div className="mb-6">
                            <Label htmlFor="search" className="mb-2 block">Rechercher une expérience</Label>
                            <div className="relative">
                                <Input
                                    id="search"
                                    type="text"
                                    placeholder="Rechercher par nom, description, institution..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>
                        <Accordion type="multiple" value={expandedCategories} onValueChange={setExpandedCategories}>
                            {categories.map((category) => (
                                <AccordionItem key={category.id} value={category.id.toString()}>
                                    <AccordionTrigger>
                                        {category.name} ({experiencesByCategory[category.id]?.length || 0})
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {experiencesByCategory[category.id]?.map((exp) => (
                                            <Card key={exp.id}>
                                                <CardContent className="p-6">
                                                    <h3 className="text-xl font-semibold mb-2">{exp.name}</h3>
                                                    <p className="text-sm text-muted-foreground mb-2">
                                                        {exp.date_start} - {exp.date_end || 'Présent'}
                                                    </p>
                                                    <p className="text-sm mb-2"><strong>Institution:</strong> {exp.InstitutionName}</p>
                                                    <p className="text-sm mb-2"><strong>Catégorie:</strong> {categories.find(cat => cat.id === exp.experience_categories_id)?.name}</p>
                                                    <p className="text-sm mb-2 line-clamp-2"><strong>Description:</strong> {exp.description}</p>
                                                    <p className="text-sm mb-2"><strong>Résultat:</strong> {exp.output}</p>
                                                    <p className="text-sm mb-2"><strong>Commentaire:</strong> {exp.comment}</p>
                                                    {exp.attachment_id && (
                                                        <p className="text-sm mb-2">
                                                            <strong>Pièce jointe:</strong>
                                                            <FileUp className="inline-block ml-2 w-4 h-4" />
                                                        </p>
                                                    )}
                                                    <div className="flex justify-between items-center mt-4">
                                                        <div className="space-x-2">
                                                            <Button variant="outline" size="sm" onClick={() => handleEdit(exp)}>
                                                                <Edit className="w-4 h-4 mr-2" /> Modifier
                                                            </Button>
                                                            <Button variant="outline" size="sm" onClick={() => handleDelete(exp.id)}>
                                                                <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                                                            </Button>
                                                        </div>
                                                        {exp.attachment_id && (
                                                            <Button variant="ghost" size="sm" onClick={() => handlePreviewPDF(exp.attachment_path)}>
                                                                <Eye className="w-4 h-4 mr-2" /> Prévisualiser
                                                            </Button>
                                                        )}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

export default ExperienceManager;
