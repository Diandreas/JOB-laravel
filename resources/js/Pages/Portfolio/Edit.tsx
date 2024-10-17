import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { User, Briefcase, GraduationCap, Heart } from 'lucide-react';
import { Button } from "@/Components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";

export default function Edit({ portfolio }) {
    const { data, setData, put, processing, errors } = useForm({
        name: portfolio.personalInfo.name,
        email: portfolio.personalInfo.email,
        phone: portfolio.personalInfo.phone,
        address: portfolio.personalInfo.address,
        github: portfolio.personalInfo.github,
        linkedin: portfolio.personalInfo.linkedin,
        summary: portfolio.summary?.description || '',
        experiences: portfolio.experiences,
        competences: portfolio.competences,
        hobbies: portfolio.hobbies,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('portfolio.update'));
    };

    return (
        <div className="py-12">
            <Head title="Éditer mon Portfolio" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <form onSubmit={handleSubmit}>
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <User className="mr-2" /> Informations personnelles
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="name">Nom</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="phone">Téléphone</Label>
                                    <Input
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="address">Adresse</Label>
                                    <Input
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="github">GitHub</Label>
                                    <Input
                                        id="github"
                                        value={data.github}
                                        onChange={(e) => setData('github', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="linkedin">LinkedIn</Label>
                                    <Input
                                        id="linkedin"
                                        value={data.linkedin}
                                        onChange={(e) => setData('linkedin', e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Briefcase className="mr-2" /> Résumé professionnel
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                value={data.summary}
                                onChange={(e) => setData('summary', e.target.value)}
                                rows={4}
                            />
                        </CardContent>
                    </Card>

                    {/* Expériences */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Briefcase className="mr-2" /> Expériences
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {data.experiences.map((exp, index) => (
                                <div key={index} className="mb-4">
                                    <Input
                                        value={exp.title}
                                        onChange={(e) => {
                                            const newExperiences = [...data.experiences];
                                            newExperiences[index].title = e.target.value;
                                            setData('experiences', newExperiences);
                                        }}
                                        placeholder="Titre"
                                        className="mb-2"
                                    />
                                    <Textarea
                                        value={exp.description}
                                        onChange={(e) => {
                                            const newExperiences = [...data.experiences];
                                            newExperiences[index].description = e.target.value;
                                            setData('experiences', newExperiences);
                                        }}
                                        placeholder="Description"
                                        rows={3}
                                    />
                                </div>
                            ))}
                            <Button
                                type="button"
                                onClick={() => setData('experiences', [...data.experiences, { title: '', description: '' }])}
                            >
                                Ajouter une expérience
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Compétences */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <GraduationCap className="mr-2" /> Compétences
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {data.competences.map((comp, index) => (
                                <Input
                                    key={index}
                                    value={comp.name}
                                    onChange={(e) => {
                                        const newCompetences = [...data.competences];
                                        newCompetences[index].name = e.target.value;
                                        setData('competences', newCompetences);
                                    }}
                                    className="mb-2"
                                />
                            ))}
                            <Button
                                type="button"
                                onClick={() => setData('competences', [...data.competences, { name: '' }])}
                            >
                                Ajouter une compétence
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Loisirs */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Heart className="mr-2" /> Loisirs
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {data.hobbies.map((hobby, index) => (
                                <Input
                                    key={index}
                                    value={hobby.name}
                                    onChange={(e) => {
                                        const newHobbies = [...data.hobbies];
                                        newHobbies[index].name = e.target.value;
                                        setData('hobbies', newHobbies);
                                    }}
                                    className="mb-2"
                                />
                            ))}
                            <Button
                                type="button"
                                onClick={() => setData('hobbies', [...data.hobbies, { name: '' }])}
                            >
                                Ajouter un loisir
                            </Button>
                        </CardContent>
                    </Card>

                    <Button type="submit" disabled={processing}>
                        Enregistrer les modifications
                    </Button>
                </form>
            </div>
        </div>
    );
}
