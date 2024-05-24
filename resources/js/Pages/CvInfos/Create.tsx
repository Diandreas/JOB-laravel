import React, {useEffect, useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Button } from '@/Components/ui/button';
import RepeatableForm from "@/Pages/CvInfos/RepeatableForm";
import { Select } from '@/Components/ui/select';
interface Props {
    auth: any;
}





const CvInfosCreate = ({ auth }: Props) => {
    const {data, setData, post, processing, errors, reset} = useForm({
        surname: '',
        address_id: '',
        profession_id: '',
        competences: [],
        hobbies: [],
        summaries: [],
        experiences: [],
    });

    const {addresses, professions, competences: allCompetences, hobbies: allHobbies} = usePage().props;
    useEffect(() => {
        setData('addresses', addresses);
        setData('professions', professions);
        setData('allCompetences', allCompetences);
        setData('allHobbies', allHobbies);
    }, [addresses, professions, allCompetences, allHobbies]);

    const [summariesState, setSummariesState] = useState([{name: '', description: ''}]);
    const [experiencesState, setExperiencesState] = useState([
        {
            name: '',
            description: '',
            date_start: '',
            date_end: '',
            output: '',
            experience_category_id: '',
            comment: '',
            institution_name: '',
            attachment_id: '',
        },
    ]);

    const handleSummariesChange = (index, event) => {
        const values = [...summariesState];
        if (event.target.name === 'name') {
            values[index].name = event.target.value;
        } else if (event.target.name === 'description') {
            values[index].description = event.target.value;
        }
        setSummariesState(values);
    };

    const handleExperiencesChange = (index, event) => {
        const values = [...experiencesState];
        values[index][event.target.name] = event.target.value;
        setExperiencesState(values);
    };

    const addForm = (type) => {
        if (type === 'summary') {
            setSummariesState([...summariesState, {name: '', description: ''}]);
        } else if (type === 'experience') {
            setExperiencesState([
                ...experiencesState,
                {
                    name: '',
                    description: '',
                    date_start: '',
                    date_end: '',
                    output: '',
                    experience_category_id: '',
                    comment: '',
                    institution_name: '',
                    attachment_id: '',
                },
            ]);
        }
    };

    const removeForm = (index, type) => {
        if (type === 'summary') {
            const values = [...summariesState];
            values.splice(index, 1);
            setSummariesState(values);
        } else if (type === 'experience') {
            const values = [...experiencesState];
            values.splice(index, 1);
            setExperiencesState(values);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setData('summaries', summariesState);
        setData('experiences', experiencesState);

        post(route('cv-infos.store'), {
            onSuccess: () => {
                reset();
                setSummariesState([{name: '', description: ''}]);
                setExperiencesState([
                    {
                        name: '',
                        description: '',
                        date_start: '',
                        date_end: '',
                        output: '',
                        experience_category_id: '',
                        comment: '',
                        institution_name: '',
                        attachment_id: '',
                    },
                ]);
            },
            onError: () => {
                // TODO: Handle the error
            },
        });
    };


    return (
        <AuthenticatedLayout  user={auth.user}>
            <Head title="Create CvInfo"/>
            <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 p-4">
                    <form onSubmit={handleSubmit}>
                        {/* Surname field */}
                        <div className="mb-4">
                            <InputLabel htmlFor="surname" value="Surname"/>
                            <TextInput
                                id="surname"
                                name="surname"
                                value={data.surname}
                                className="block w-full"
                                onChange={(event) => setData('surname', event.target.value)}
                                required
                            />
                            <InputError message={errors.surname}/>

                        </div>

                        {/* Address field */}
                        <div className="mb-4">
                            <InputLabel htmlFor="address_id" value="Address"/>
                            <Select
                                id="address_id"
                                name="address_id"
                                value={data.address_id}
                                className="block w-full"
                                onChange={(event) => setData('address_id', event.target.value)}
                                required
                            >
                                <option value="">Select an address</option>
                                {data.addresses.map((address) => (
                                    <option key={address.id} value={address.id}>
                                        {address.town}, {address.street}
                                    </option>
                                ))}
                            </Select>
                            <InputError message={errors.address_id}/>
                        </div>

                        {/* Profession field */}
                        <div className="mb-4">
                            <InputLabel htmlFor="profession_id" value="Profession"/>
                            <Select
                                id="profession_id"
                                name="profession_id"
                                value={data.profession_id}
                                className="block w-full"
                                onChange={(event) => setData('profession_id', event.target.value)}
                                required
                            >
                                <option value="">Select a profession</option>
                                {data.professions.map((profession) => (
                                    <option key={profession.id} value={profession.id}>
                                        {profession.name}
                                    </option>
                                ))}
                            </Select>
                            <InputError message={errors.profession_id}/>
                        </div>

                        {/* Competences field */}
                        <div className="mb-4">
                            <InputLabel htmlFor="competences" value="Competences"/>
                            <MultiSelect
                                id="competences"
                                name="competences"
                                value={data.competences}
                                className="block w-full"
                                onChange={(event) => setData('competences', event.target.value)}
                            >
                                {data.allCompetences.map((competence) => (
                                    <option key={competence.id} value={competence.id}>
                                        {competence.name}
                                    </option>
                                ))}
                            </MultiSelect>
                            <InputError message={errors.competences}/>
                        </div>

                        {/* Hobbies field */}
                        <div className="mb-4">
                            <InputLabel htmlFor="hobbies" value="Hobbies"/>
                            <MultiSelect
                                id="hobbies"
                                name="hobbies"
                                value={data.hobbies}
                                className="block w-full"
                                onChange={(event) => setData('hobbies', event.target.value)}
                            >
                                {data.allHobbies.map((hobby) => (
                                    <option key={hobby.id} value={hobby.id}>
                                        {hobby.name}
                                    </option>
                                ))}
                            </MultiSelect>
                            <InputError message={errors.hobbies}/>
                        </div>

                        {/* Summaries field */}
                        <div className="mb-4">
                            <RepeatableForm
                                values={summariesState}
                                onValueChange={handleSummariesChange}
                                onAdd={addForm}
                                onRemove={removeForm}
                                type="summary"
                            />
                            <InputError message={errors.summaries}/>
                        </div>

                        {/* Experiences field */}
                        <div className="mb-4">
                            <RepeatableForm
                                values={experiencesState}
                                onValueChange={handleExperiencesChange}
                                onAdd={addForm}
                                onRemove={removeForm}
                                type="experience"
                            />
                            <InputError message={errors.experiences}/>
                        </div>

                        {/* Submit button */}
                        <Button type="submit" disabled={processing}>
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
