import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from "@/Components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { useToast } from '@/Components/ui/use-toast';
import { Briefcase, Edit, Trash2, Eye, FileUp, Search, GraduationCap, Building2, Flag } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/Components/ui/accordion";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/Components/ui/resizable";
import axios from "axios";
import Swal from 'sweetalert2';

// Base de données des expériences
const experienceData = {
    // Expériences académiques
    academic: {
        names: [
            "Licence en Informatique",
            "Master en Génie Logiciel",
            "Doctorat en Intelligence Artificielle",
            "BTS en Réseaux et Systèmes",
            "DUT en Informatique"
        ],
        institutions: [
            "Université de Yaoundé I",
            "École Polytechnique de Yaoundé",
            "Institut Saint Jean",
            "IUT de Bandjoun",
            "Université de Douala"
        ],
        descriptions: [
            "Formation approfondie en développement logiciel",
            "Spécialisation en intelligence artificielle",
            "Programme intensif en génie logiciel",
            "Formation en administration système et réseaux",
            "Cursus orienté data science et analyse de données"
        ]
    },

    // Expériences professionnelles
    professional: {
        titles: [
            "Développeur Full Stack",
            "Ingénieur DevOps",
            "Chef de Projet IT",
            "Architecte Logiciel",
            "Analyste Programmeur"
        ],
        companies: [
            "Orange Cameroun",
            "MTN Cameroun",
            "CAMTEL",
            "Total Energies Cameroun",
            "UBA Cameroun"
        ],
        descriptions: [
            "Développement et maintenance d'applications d'entreprise",
            "Mise en place de solutions cloud et DevOps",
            "Gestion de projets informatiques critiques",
            "Conception d'architectures logicielles scalables",
            "Analyse et développement de solutions métier"
        ],
        achievements: [
            "Réduction de 40% du temps de déploiement",
            "Amélioration de la performance des applications",
            "Mise en place réussie d'une architecture microservices",
            "Optimisation des processus de développement",
            "Implémentation de CI/CD pipelines"
        ]
    },

    // Expériences de recherche
    research: {
        titles: [
            "Chercheur en IA",
            "Assistant de Recherche",
            "Doctorant Chercheur",
            "Chercheur en Big Data",
            "Analyste de Données de Recherche"
        ],
        institutions: [
            "Laboratoire d'IA - UY1",
            "Centre de Recherche en Informatique",
            "Institut de Recherche Technologique",
            "Département R&D - Orange Labs",
            "Centre d'Innovation MTN"
        ],
        descriptions: [
            "Recherche sur les algorithmes d'apprentissage profond",
            "Analyse de données massives pour la prise de décision",
            "Développement de modèles prédictifs innovants",
            "Étude des systèmes de recommandation",
            "Recherche en traitement du langage naturel"
        ],
        outputs: [
            "Publication dans une revue internationale",
            "Présentation à une conférence majeure",
            "Développement d'un nouveau modèle d'IA",
            "Dépôt de brevet technologique",
            "Prix de meilleure recherche"
        ]
    },

    // Catégories
    categories: [
        { id: 1, name: "Expérience Professionnelle" },
        { id: 2, name: "Expérience Académique" },
        { id: 3, name: "Expérience de Recherche" }
    ]
};

// Fonction de génération d'expérience prédéfinie
const generatePredefinedExperience = (type) => {
    const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];
    const currentYear = new Date().getFullYear();

    switch(type) {
        case 'academic':
            return {
                name: getRandomItem(experienceData.academic.names),
                InstitutionName: getRandomItem(experienceData.academic.institutions),
                description: getRandomItem(experienceData.academic.descriptions),
                experience_categories_id: '2',
                date_start: `${currentYear - 4}-09-01`,
                date_end: `${currentYear}-06-30`,
                output: "Diplôme obtenu avec mention",
                comment: "Formation complétée avec succès"
            };

        case 'professional':
            return {
                name: getRandomItem(experienceData.professional.titles),
                InstitutionName: getRandomItem(experienceData.professional.companies),
                description: getRandomItem(experienceData.professional.descriptions),
                experience_categories_id: '1',
                date_start: `${currentYear - 2}-01-01`,
                date_end: `${currentYear}-12-31`,
                output: getRandomItem(experienceData.professional.achievements),
                comment: "Expérience enrichissante avec développement de compétences clés"
            };

        case 'research':
            return {
                name: getRandomItem(experienceData.research.titles),
                InstitutionName: getRandomItem(experienceData.research.institutions),
                description: getRandomItem(experienceData.research.descriptions),
                experience_categories_id: '3',
                date_start: `${currentYear - 3}-01-01`,
                date_end: `${currentYear}-12-31`,
                output: getRandomItem(experienceData.research.outputs),
                comment: "Projet de recherche avec résultats significatifs"
            };

        default:
            return null;
    }
};
const ExperienceManager = ({ experiences: initialExperiences = [], categories = experienceData.categories }) => {
    const { toast } = useToast();
    const [experiences, setExperiences] = useState(initialExperiences);
    const [filteredExperiences, setFilteredExperiences] = useState(initialExperiences);
    const [isEditing, setIsEditing] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { data, setData, reset, errors, processing } = useForm({
        id: '',
        name: '',
        description: '',
        date_start: '',
        date_end: '',
        output: '',
        experience_categories_id: '',
        comment: '',
        InstitutionName: '',
        attachment: null,
    });

    const handlePreviewPDF = (attachmentUrl) => {
        if (!attachmentUrl) {
            toast({
                title: 'Pas de fichier',
                description: 'Aucune pièce jointe disponible.',
                variant: 'destructive',
            });
            return;
        }
        window.open(attachmentUrl, '_blank')?.focus();
    };

    const handleTemplateSelection = (type) => {
        const template = generatePredefinedExperience(type);
        if (template) {
            setData(prev => ({
                ...prev,
                ...template
            }));
            toast({
                title: "Modèle appliqué",
                description: "Vous pouvez maintenant personnaliser les informations.",
            });
        }
    };

    useEffect(() => {
        const filtered = experiences.filter(exp =>
            exp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exp.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exp.InstitutionName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exp.output?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exp.comment?.toLowerCase().includes(searchTerm.toLowerCase())
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (data[key] !== null && data[key] !== undefined) {
                if (key === 'attachment' && data[key] instanceof File) {
                    formData.append('attachment', data[key]);
                } else if (key !== 'attachment') {
                    formData.append(key, data[key]);
                }
            }
        });

        try {
            const response = isEditing
                ? await axios.post(`/experiences/${data.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    params: { _method: 'PUT' }
                })
                : await axios.post('/experiences', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

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
        } catch (error) {
            console.error(error);
            toast({
                title: "Erreur",
                description: error.response?.data?.message || "Une erreur est survenue.",
                variant: "destructive",
            });
        }
    };

    const handleEdit = (experience) => {
        setData({
            ...experience,
            experience_categories_id: experience.experience_categories_id.toString(),
            attachment: null
        });
        setIsEditing(true);
    };

    const handleDelete = (experienceId) => {
        Swal.fire({
            title: 'Voulez-vous supprimer cette expérience ?',
            text: "Cette action est irréversible",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/experiences/${experienceId}`)
                    .then(() => {
                        setExperiences(prevExperiences =>
                            prevExperiences.filter(exp => exp.id !== experienceId)
                        );
                        toast({
                            title: "Succès",
                            description: "L'expérience a été supprimée.",
                        });
                    })
                    .catch(error => {
                        console.error(error);
                        toast({
                            title: "Erreur",
                            description: "La suppression a échoué.",
                            variant: "destructive",
                        });
                    });
            }
        });
    };

    const resetForm = () => {
        reset();
        setIsEditing(false);
    };

    return (
        <div className="container mx-auto py-8">
            <div className="flex items-center mb-6">
                <Briefcase className="mr-3 text-primary" />
                <h1 className="text-2xl font-bold">Gestion des Expériences</h1>
            </div>

            <ResizablePanelGroup direction="horizontal" className="min-h-[800px] rounded-lg border">
                <ResizablePanel defaultSize={30} minSize={20}>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {isEditing ? 'Modifier l\'expérience' : 'Ajouter une expérience'}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Section des modèles */}
                            <div className="mb-6 space-y-4 border-b pb-4">
                                <div className="space-y-2">
                                    <Label>Choisir un modèle</Label>
                                    <div className="grid grid-cols-1 gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => handleTemplateSelection('professional')}
                                            className="flex items-center justify-start"
                                        >
                                            <Briefcase className="w-4 h-4 mr-2" />
                                            Expérience Professionnelle
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => handleTemplateSelection('academic')}
                                            className="flex items-center justify-start"
                                        >
                                            <GraduationCap className="w-4 h-4 mr-2" />
                                            Expérience Académique
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => handleTemplateSelection('research')}
                                            className="flex items-center justify-start"
                                        >
                                            <Flag className="w-4 h-4 mr-2" />
                                            Expérience de Recherche
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            {/* Formulaire */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Intitulé</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Ex: Développeur Full Stack..."
                                        />
                                        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="InstitutionName">Établissement/Entreprise</Label>
                                        <Input
                                            id="InstitutionName"
                                            value={data.InstitutionName}
                                            onChange={(e) => setData('InstitutionName', e.target.value)}
                                            placeholder="Nom de l'établissement"
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
                                        placeholder="Décrivez l'expérience..."
                                        rows={4}
                                    />
                                    {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="output">Résultat/Réalisation</Label>
                                    <Input
                                        id="output"
                                        value={data.output}
                                        onChange={(e) => setData('output', e.target.value)}
                                        placeholder="Ex: Diplôme obtenu, Projet livré..."
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
                                    <Label htmlFor="comment">Commentaire additionnel</Label>
                                    <Textarea
                                        id="comment"
                                        value={data.comment}
                                        onChange={(e) => setData('comment', e.target.value)}
                                        placeholder="Informations complémentaires..."
                                    />
                                    {errors.comment && <p className="text-sm text-destructive">{errors.comment}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="attachment">Pièce jointe</Label>
                                    <Input
                                        id="attachment"
                                        type="file"
                                        onChange={(e) => setData('attachment', e.target.files[0])}
                                        className="cursor-pointer"
                                    />
                                    {errors.attachment && <p className="text-sm text-destructive">{errors.attachment}</p>}
                                </div>

                                <div className="flex justify-between pt-4">
                                    <Button type="submit" disabled={processing}>
                                        {isEditing ? 'Mettre à jour' : 'Enregistrer'}
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
                                    placeholder="Rechercher par nom, description, établissement..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        <Accordion
                            type="multiple"
                            value={expandedCategories}
                            onValueChange={setExpandedCategories}
                        >
                            {categories.map((category) => (
                                <AccordionItem key={category.id} value={category.id.toString()}>
                                    <AccordionTrigger>
                                        {category.name} ({experiencesByCategory[category.id]?.length || 0})
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="space-y-4">
                                            {experiencesByCategory[category.id]?.map((exp) => (
                                                <Card key={exp.id}>
                                                    <CardContent className="p-6">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h3 className="text-xl font-semibold mb-2">{exp.name}</h3>
                                                                <p className="text-sm text-muted-foreground">
                                                                    {new Date(exp.date_start).toLocaleDateString('fr-FR')} -
                                                                    {exp.date_end ? new Date(exp.date_end).toLocaleDateString('fr-FR') : 'Présent'}
                                                                </p>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => handleEdit(exp)}
                                                                    className="hover:bg-primary/10"
                                                                >
                                                                    <Edit className="w-4 h-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => handleDelete(exp.id)}
                                                                    className="hover:bg-destructive/10"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        </div>

                                                        <div className="mt-4 space-y-2">
                                                            <div className="flex items-center text-sm">
                                                                <Building2 className="w-4 h-4 mr-2 text-muted-foreground" />
                                                                <span className="font-medium">{exp.InstitutionName}</span>
                                                            </div>

                                                            <div className="bg-muted/50 p-3 rounded-md mt-2">
                                                                <p className="text-sm">{exp.description}</p>
                                                            </div>

                                                            {exp.output && (
                                                                <div className="bg-primary/5 p-3 rounded-md">
                                                                    <p className="text-sm font-medium">Résultat/Réalisation:</p>
                                                                    <p className="text-sm">{exp.output}</p>
                                                                </div>
                                                            )}

                                                            {exp.comment && (
                                                                <div className="text-sm text-muted-foreground italic">
                                                                    <p>{exp.comment}</p>
                                                                </div>
                                                            )}

                                                            {exp.attachment_path && (
                                                                <div className="flex items-center justify-between mt-4 bg-accent/10 p-2 rounded">
                                                                    <div className="flex items-center text-sm">
                                                                        <FileUp className="w-4 h-4 mr-2" />
                                                                        <span>{exp.attachment_name}</span>
                                                                    </div>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={() => handlePreviewPDF(exp.attachment_path)}
                                                                        className="hover:bg-primary/10"
                                                                    >
                                                                        <Eye className="w-4 h-4 mr-2" />
                                                                        Voir
                                                                    </Button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}

                                            {!experiencesByCategory[category.id]?.length && (
                                                <div className="text-center py-8 text-muted-foreground">
                                                    <p>Aucune expérience dans cette catégorie</p>
                                                </div>
                                            )}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>

                        {filteredExperiences.length === 0 && (
                            <Card>
                                <CardContent className="text-center py-8">
                                    <p className="text-muted-foreground">
                                        {searchTerm
                                            ? "Aucune expérience ne correspond à votre recherche"
                                            : "Commencez par ajouter votre première expérience"
                                        }
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

export default ExperienceManager;
