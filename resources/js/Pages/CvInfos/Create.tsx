'use client'
import { Textarea } from "@/Components/ui/textarea"
import React, { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { z } from "zod"

import { cn } from "@/lib/utils"
import { Calendar } from "@/Components/ui/calendar"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover"
import { toast } from "@/Components/ui/toast"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"

import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {PageProps} from "@/types";

import { useForm, usePage } from '@inertiajs/react';

const CVForm = () => {
    const { auth } = usePage().props;

    // Set up form data
    const { data, setData, post, processing, errors } = useForm({
        surname: '',
        address: {
            town: '',
            street: '',
            country_id: '',
        },
        profession: {
            name: '',
            description: '',
            category_id: '',
        },
        competences: [],
        hobbies: [],
        experiences: [],
        references: [],
        attachments: [],
        summaries: '',
        matrimonial_status: {
            number_child: '',
            maried: '',
        },
    });

    // Fetch initial data (countries, profession categories, etc.)
    const [countries, setCountries] = useState([]);
    const [professionCategories, setProfessionCategories] = useState([]);
    useEffect(() => {
        // Fetch countries and profession categories from the server and set them in state
    }, []);

    // Set up functions for adding/removing competences, hobbies, experiences, and references
    const addCompetence = () => {
        setData('competences', [...data.competences, { name: '', description: '' }]);
    };
    const removeCompetence = (index) => {
        setData('competences', data.competences.filter((_, i) => i !== index));
    };

    const addHobby = () => {
        setData('hobbies', [...data.hobbies, { name: '', category_id: '' }]);
    };
    const removeHobby = (index) => {
        setData('hobbies', data.hobbies.filter((_, i) => i !== index));
    };

    const addExperience = () => {
        // @ts-ignore
        setData('experiences', [...data.experiences, {
            name: '',
            description: '',
            date_start: '',
            date_end: '',
            output: '',
            experience_categorie_id: '',
            output_id: '',
            organisation_id: '',
            attachement_id: '',
            reference_id: '',
        }]);
    };
    // @ts-ignore
    const removeExperience = (index) => {
        setData('experiences', data.experiences.filter((_, i) => i !== index));
    };

    const addReference = () => {
        setData('references', [...data.references, { name: '', fonction: '', email: '', telephone: '' }]);
    };
    const removeReference = (index) => {
        setData('references', data.references.filter((_, i) => i !== index));
    };

    // Set up function for handling form submission
    const onSubmit = (e) => {
        e.preventDefault();
        post('/cv', {
            // ... include all form data here
        });
    };
    const [date, setDate] = React.useState<Date>()
    // Render the form
    // @ts-ignore
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">EDIT YOUR CV INFORMATION </h2>}
        >
            <h1> EDIT YOUR CV INFORMATION </h1>
            <form onSubmit={onSubmit} action="/cv" method="POST">
                {/* Competences */}
                <div>
                    <h3>Competences</h3>
                    {data.competences.map((competence, index) => (
                        <div key={index}>
                            <Input
                                type="text"
                                value={competence.name}
                                onChange={(e) => {
                                    const newCompetences = [...data.competences];
                                    newCompetences[index].name = e.target.value;
                                    setData('competences', newCompetences);
                                }}
                            />
                            <Input
                                type="text"
                                value={competence.description}
                                onChange={(e) => {
                                    const newCompetences = [...data.competences];
                                    newCompetences[index].description = e.target.value;
                                    setData('competences', newCompetences);
                                }}
                            />
                            <Button variant="destructive" style={{ marginLeft: 'auto' }} onClick={() => removeCompetence(index)}>Remove Competence</Button>
                        </div>
                    ))}
                    <Button onClick={addCompetence}>+</Button>
                </div>

                {/* Hobbies */}
                <div>
                    <h3>Hobbies</h3>
                    {data.hobbies.map((hobby, index) => (
                        <div key={index}>
                            <Input
                                type="text"
                                value={hobby.name}
                                onChange={(e) => {
                                    const newHobbies = [...data.hobbies];
                                    newHobbies[index].name = e.target.value;
                                    setData('hobbies', newHobbies);
                                }}
                            />
                            <Button variant="destructive" onClick={() => removeHobby(index)}>-</Button>
                        </div>
                    ))}
                    <Button onClick={addHobby}>+</Button>
                </div>

                {/* Experiences */}
                <div>
                    <h3>Experiences  <Button onClick={addExperience}>+</Button></h3>
                    {data.experiences.map((experience, index) => (
                        <div key={index}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Période</CardTitle>
                                    <CardDescription> <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Popover style={{ width: '45%' }}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[280px] justify-start text-left font-normal",
                                                        !date && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={setDate}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        --
                                        <Popover style={{ width: '45%' }}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[280px] justify-start text-left font-normal",
                                                        !date && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={setDate}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>



                                    </div></CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p><Input
                                        type="text"
                                        value={experience.name}
                                        onChange={(e) => {
                                            const newExperiences = [...data.experiences];
                                            newExperiences[index].name = e.target.value;
                                            setData('experiences', newExperiences);
                                        }}
                                    /></p>
                                    <p>INSTITUT : <Input
                                        type="text"
                                        value={experience.organisation_id}
                                        onChange={(e) => {
                                            const newExperiences = [...data.experiences];
                                            newExperiences[index].organisation_id = e.target.value;
                                            setData('experiences', newExperiences);
                                        }}
                                    /></p>
                                    {/* References */}
                                    <div>
                                        <h3>References <Button onClick={(e) => { e.preventDefault(); addReference(); }}>+</Button></h3>
                                        {data.references.map((reference, index) => (
                                            <div key={index}>
                                                name : <Input
                                                type="text"
                                                value={references.name}
                                                onChange={(e) => {
                                                    const newExperiences = [...data.experiences];
                                                    newExperiences[index].name = e.target.value;
                                                    setData('experiences', newExperiences);
                                                }}
                                            />
                                                tel : <Input
                                                type="text"
                                                value={references.name}
                                                onChange={(e) => {
                                                    const newExperiences = [...data.experiences];
                                                    newExperiences[index].name = e.target.value;
                                                    setData('experiences', newExperiences);
                                                }}
                                            />
                                                <Button variant="destructive" onClick={() => removeReference(index)}>X</Button>
                                            </div>
                                        ))}
                                    </div>
                                    <p>Commentaire:<Textarea id="summaries" value={experience.description} onChange={(e) => {
                                        const newExperiences = [...data.experiences];
                                        newExperiences[index].description = e.target.value;
                                        setData('experiences', newExperiences);
                                    }} /></p>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="destructive" onClick={() => removeExperience(index)}>X</Button>
                                </CardFooter>
                            </Card>
                        </div>
                    ))}
                </div>

                {/* Summaries */}
                <div>
                    <label htmlFor="summaries">Summaries</label>
                    <Textarea id="summaries" value={data.summaries} onChange={(e) => setData('summaries', e.target.value)} />
                </div>

                {/* Matrimonial Status */}
                <div>
                    <label htmlFor="number_child">Number of Children</label>
                    <Input id="number_child" type="text" value={data.matrimonial_status.number_child} onChange={(e) => setData('matrimonial_status.number_child', e.target.value)} />
                </div>

                {/* Submit Button */}
                <Button type="submit" processing={processing}>Submit</Button>
            </form>
        </AuthenticatedLayout>
    );
};

export default CVForm;
