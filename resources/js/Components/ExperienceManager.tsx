import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Briefcase, Plus, Edit, Trash2, X } from 'lucide-react';
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import TextInput from "@/Components/TextInput";
import { useToast } from '@/Components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

const ExperienceManager = ({ experiences = [], categories = [] }) => {
    const { toast } = useToast();
    const [selectedExperience, setSelectedExperience] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const { data, setData, post, put, processing, errors, reset } = useForm({
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

    const handleSubmit = (event) => {
        event.preventDefault();

        const action = selectedExperience ? put : post;
        const url = selectedExperience
            ? route('experiences.update', selectedExperience.id)
            : route('experiences.store');

        action(url, {
            onSuccess: () => {
                toast({
                    title: selectedExperience ? "Expérience mise à jour" : "Expérience créée",
                    description: "L'opération a été effectuée avec succès.",
                });
                reset();
                setSelectedExperience(null);
                setIsFormVisible(false);
            },
            onError: () => {
                toast({
                    title: "Erreur",
                    description: "Une erreur est survenue.",
                    variant: "destructive",
                });
            }
        });
    };

    const handleEdit = (experience) => {
        setSelectedExperience(experience);
        setData({ ...experience });
        setIsFormVisible(true);
    };

    const handleDelete = (experienceId) => {
        // Implement delete logic here
        console.log(`Delete experience with id: ${experienceId}`);
    };

    const handleNewExperience = () => {
        setSelectedExperience(null);
        reset();
        setIsFormVisible(true);
    };

    return (
        <div className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white overflow-hidden shadow-lg rounded-lg"
                >
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-3xl font-bold flex items-center text-gray-800">
                                <Briefcase className="mr-3 text-blue-600" /> Mes expériences
                            </h1>
                            <Button onClick={handleNewExperience} className="bg-blue-600 hover:bg-blue-700 transition duration-300">
                                <Plus className="w-4 h-4 mr-2" /> Ajouter une expérience
                            </Button>

                        </div>
                        <AnimatePresence>
                            {isFormVisible && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-12 bg-white shadow-lg rounded-lg p-8"
                                >
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-bold text-gray-800">
                                            {selectedExperience ? 'Modifier' : 'Créer'} une expérience
                                        </h2>
                                        <Button variant="ghost" onClick={() => setIsFormVisible(false)}>
                                            <X className="w-5 h-5" />
                                        </Button>
                                    </div>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <div>
                                                <InputLabel htmlFor="name" value="Nom de l'expérience" />
                                                <TextInput
                                                    id="name"
                                                    type="text"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    className="mt-1 block w-full"
                                                    placeholder="Nom de l'expérience"
                                                />
                                                <InputError message={errors.name} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="InstitutionName" value="Nom de l'institution" />
                                                <TextInput
                                                    id="InstitutionName"
                                                    type="text"
                                                    value={data.InstitutionName}
                                                    onChange={(e) => setData('InstitutionName', e.target.value)}
                                                    className="mt-1 block w-full"
                                                    placeholder="Nom de l'institution"
                                                />
                                                <InputError message={errors.InstitutionName} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="date_start" value="Date de début" />
                                                <TextInput
                                                    id="date_start"
                                                    type="date"
                                                    value={data.date_start}
                                                    onChange={(e) => setData('date_start', e.target.value)}
                                                    className="mt-1 block w-full"
                                                />
                                                <InputError message={errors.date_start} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="date_end" value="Date de fin" />
                                                <TextInput
                                                    id="date_end"
                                                    type="date"
                                                    value={data.date_end}
                                                    onChange={(e) => setData('date_end', e.target.value)}
                                                    className="mt-1 block w-full"
                                                />
                                                <InputError message={errors.date_end} className="mt-2" />
                                            </div>
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="description" value="Description" />
                                            <Textarea
                                                id="description"
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                                className="mt-1 block w-full"
                                                rows={4}
                                                placeholder="Décrivez votre expérience"
                                            />
                                            <InputError message={errors.description} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="output" value="Résultat" />
                                            <TextInput
                                                id="output"
                                                type="text"
                                                value={data.output}
                                                onChange={(e) => setData('output', e.target.value)}
                                                className="mt-1 block w-full"
                                                placeholder="Résultat obtenu"
                                            />
                                            <InputError message={errors.output} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="experience_categories_id" value="Catégorie" />
                                            <Select
                                                value={data.experience_categories_id}
                                                onValueChange={(value) => setData('experience_categories_id', value)}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Sélectionnez une catégorie" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map((cat) => (
                                                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.experience_categories_id} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="comment" value="Commentaire" />
                                            <Textarea
                                                id="comment"
                                                value={data.comment}
                                                onChange={(e) => setData('comment', e.target.value)}
                                                className="mt-1 block w-full"
                                                rows={3}
                                                placeholder="Ajoutez un commentaire"
                                            />
                                            <InputError message={errors.comment} className="mt-2" />
                                        </div>

                                        <div className="flex justify-end">
                                            <Button type="submit" className="bg-green-600 hover:bg-green-700 transition duration-300">
                                                {selectedExperience ? 'Mettre à jour' : 'Créer'}
                                            </Button>
                                        </div>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {experiences.map((exp) => (
                                <motion.div
                                    key={exp.id}
                                    whileHover={{ scale: 1.03 }}
                                    className="bg-gray-50 rounded-lg p-6 shadow-md transition duration-300 hover:shadow-lg"
                                >
                                    <h2 className="text-xl font-semibold mb-2 text-gray-800">{exp.name}</h2>
                                    <p className="text-sm text-gray-500 mb-3">
                                        {exp.date_start} - {exp.date_end || 'Présent'}
                                    </p>
                                    <p className="text-gray-700 mb-3 line-clamp-3">{exp.description}</p>
                                    <p className="text-gray-700 mb-2"><strong>Institution:</strong> {exp.InstitutionName}</p>
                                    <p className="text-gray-700 mb-2"><strong>Résultat:</strong> {exp.output}</p>
                                    <p className="text-gray-700 mb-4"><strong>Commentaire:</strong> {exp.comment}</p>
                                    <div className="flex justify-end space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(exp)} className="text-green-600 border-green-600 hover:bg-green-50">
                                            <Edit className="w-4 h-4 mr-2" /> Modifier
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleDelete(exp.id)} className="text-red-600 border-red-600 hover:bg-red-50">
                                            <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>


                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ExperienceManager;
