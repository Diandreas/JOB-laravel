import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

// @ts-ignore
const PersonalInformationEdit = ({ auth, user }) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: user.name,
        email: user.email,
        github: user.github,
        linkedin: user.linkedin,
        address: user.address,
        phone_number: user.phone_number,
    });

    // @ts-ignore
    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('personal-information.update'), {
            onSuccess: () => {
                reset('name', 'email', 'github', 'linkedin', 'address', 'phone_number');
            },
            onError: (errors) => {
                console.error(errors);
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Modifier informations personnelles" />
            <div className="p-4">
                <h1 className="text-2xl font-semibold mb-4">Modifier informations personnelles</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <InputLabel htmlFor="name" value="Nom" />
                        <TextInput id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1 block w-full" />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="mt-1 block w-full" />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="github" value="GitHub" />
                        <TextInput id="github" type="text" value={data.github} onChange={(e) => setData('github', e.target.value)} className="mt-1 block w-full" />
                        <InputError message={errors.github} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="linkedin" value="LinkedIn" />
                        <TextInput id="linkedin" type="text" value={data.linkedin} onChange={(e) => setData('linkedin', e.target.value)} className="mt-1 block w-full" />
                        <InputError message={errors.linkedin} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="address" value="Address" />
                        <TextInput id="address" type="text" value={data.address} onChange={(e) => setData('address', e.target.value)} className="mt-1 block w-full" />
                        <InputError message={errors.address} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="phone_number" value="Phone Number" />
                        <TextInput id="phone_number" type="text" value={data.phone_number} onChange={(e) => setData('phone_number', e.target.value)} className="mt-1 block w-full" />
                        <InputError message={errors.phone_number} className="mt-2" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button type="submit" disabled={processing}>Enregistrer les modifications</Button>
                        <Link href={route('personal-information.index')} className="text-sm text-gray-600 underline">
                            Annuler
                        </Link>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default PersonalInformationEdit;
