import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Separator } from "@/Components/ui/separator";
import {Paperclip} from "lucide-react";

export default function ExportableCv({ cvInformation, experiencesByCategory }) {
    const { hobbies, competences, professions, summaries, personalInformation } = cvInformation;

    if (!experiencesByCategory || Object.keys(experiencesByCategory).length === 0) {
        return <p>Aucune expérience à afficher.</p>;
    }

    return (
        <div id="exportable-cv" className="max-w-4xl mx-auto bg-white p-8 font-sans shadow-lg rounded-lg">
            <header className="mb-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={personalInformation.avatar} alt={`${personalInformation.firstName} ${personalInformation.firstName}`} />
                    <AvatarFallback>{personalInformation.firstName[0]}{personalInformation.firstName[0]}</AvatarFallback>
                </Avatar>
                <h1 className="text-4xl font-bold mb-2 text-primary">{personalInformation.firstName} {personalInformation.firstName}</h1>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {professions.map(prof => (
                        <Badge key={prof.id} variant="secondary">{prof.name}</Badge>
                    ))}
                </div>
                <div className="flex flex-wrap justify-center text-sm text-muted-foreground gap-4">
                    <div>{personalInformation.email}</div>
                    <div>{personalInformation.phone}</div>
                    <div>{personalInformation.address}</div>
                    <div>{personalInformation.linkedin}</div>
                    <div>{personalInformation.github}</div>
                </div>
            </header>

            <Separator className="my-6" />

            <main className="grid grid-cols-3 gap-6">
                <section className="col-span-2">
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold text-primary">Résumé</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground italic">{summaries[0]?.description}</p>
                        </CardContent>
                    </Card>

                    {Object.entries(experiencesByCategory).map(([category, experiences]) => (
                        <Card key={category} className="mb-6">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">{category}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {experiences.map((exp) => (
                                    <div key={exp.id} className="mb-4 last:mb-0">
                                        <h4 className="font-semibold text-primary">{exp.title}</h4>
                                        <p className="text-sm text-muted-foreground italic">
                                            {exp.InstitutionName} | {exp.date_start} - {exp.date_end || 'Present'}
                                        </p>
                                        <p className="text-sm mt-1">{exp.description}</p>
                                        <p className="text-sm mt-1"><strong>Réalisations:</strong> {exp.output}</p>
                                        {exp.comment && (
                                            <p className="text-sm mt-1"><strong>Commentaire:</strong> {exp.comment}</p>
                                        )}
                                        {exp.attachment_id && (
                                            <p className="text-sm mt-1 flex items-center">
                                                <Paperclip className="w-4 h-4 mr-1" />
                                                Pièce jointe
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    ))}</section>

                <aside className="col-span-1">
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Compétences</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {competences.map(comp => (
                                    <Badge key={comp.id} variant="outline">{comp.name}</Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Formations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {professions.map(prof => (
                                <Badge key={prof.id} variant="secondary" className="mb-2 mr-2">{prof.name}</Badge>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Centres d'Intérêt</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {hobbies.map(hobby => (
                                    <Badge key={hobby.id} variant="outline">{hobby.name}</Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </aside>
            </main>
        </div>
    );
}
