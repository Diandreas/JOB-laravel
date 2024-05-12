import { Textarea } from "@/Components/ui/textarea"
import React, { useState, useEffect } from 'react';

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
    const {auth} = usePage().props;

    // Set up form data
    const {data, setData, post, processing, errors} = useForm({
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
        setData('competences', [...data.competences, {name: '', description: ''}]);
    };
    const removeCompetence = (index) => {
        setData('competences', data.competences.filter((_, i) => i !== index));
    };
    // ... and so on for hobbies, experiences, and references

    // Set up function for handling form submission
    const onSubmit = (e) => {
        e.preventDefault();
        post('/cv', {
            // ... include all form data here
        });
    };

    // Render the form
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <form onSubmit={onSubmit} action="/cv" method="POST">

                <div>
                    <label htmlFor="surname">Surname</label>
                    <Input id="surname" type="text" value={data.surname}
                           onChange={(e) => setData('surname', e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="address_town">Town</label>
                    <Input id="address_town" type="text" value={data.address.town}
                           onChange={(e) => setData('address.town', e.target.value)}/>
                </div>
                {/* ... and so on for the rest of the fields */}
                <Button type="submit" processing={processing}>Submit</Button>
            </form>
        </AuthenticatedLayout>
    );
};

export default CVForm;
