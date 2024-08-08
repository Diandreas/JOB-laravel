import { useEffect, FormEventHandler, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { User, Mail, Lock, Briefcase, Github, Linkedin, MapPin, Phone } from 'lucide-react';


// @ts-ignore
export default function Register(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        profession_id: '',
        surname: '',
        github: '',
        linkedin: '',
        address: '',
        phone_number: '',
    });

    const [professions, setProfessions] = useState([]);

    useEffect(() => {
        if (props.professions) {
            setProfessions(props.professions);
        }
    }, []);

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <GuestLayout>
            <Head title="Register" />
                <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
                <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-1">
                        <InputLabel htmlFor="name" value="Name" />
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="pl-10 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                        </div>
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="col-span-1">
                        <InputLabel htmlFor="surname" value="Surname" />
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <TextInput
                                id="surname"
                                name="surname"
                                value={data.surname}
                                className="pl-10 block w-full"
                                onChange={(e) => setData('surname', e.target.value)}
                                required
                            />
                        </div>
                        <InputError message={errors.surname} className="mt-2" />
                    </div>

                    <div className="col-span-2">
                        <InputLabel htmlFor="email" value="Email" />
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="pl-10 block w-full"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                        </div>
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="col-span-1">
                        <InputLabel htmlFor="password" value="Password" />
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="pl-10 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                        </div>
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="col-span-1">
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="pl-10 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                        </div>
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    {professions.length > 0 && (
                        <div className="col-span-2">
                            <InputLabel htmlFor="profession_id" value="Profession" />
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Briefcase className="h-5 w-5 text-gray-400" />
                                </div>
                                <select
                                    id="profession_id"
                                    name="profession_id"
                                    value={data.profession_id}
                                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    onChange={(e) => setData('profession_id', e.target.value)}
                                    required
                                >
                                    <option value="">-- Select a profession --</option>
                                    {professions.map(profession => (
                                        <option key={profession.id} value={profession.id}>
                                            {profession.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    <div className="col-span-1">
                        <InputLabel htmlFor="github" value="GitHub" />
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Github className="h-5 w-5 text-gray-400" />
                            </div>
                            <TextInput
                                id="github"
                                name="github"
                                value={data.github}
                                className="pl-10 block w-full"
                                onChange={(e) => setData('github', e.target.value)}
                            />
                        </div>
                        <InputError message={errors.github} className="mt-2" />
                    </div>

                    <div className="col-span-1">
                        <InputLabel htmlFor="linkedin" value="LinkedIn" />
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Linkedin className="h-5 w-5 text-gray-400" />
                            </div>
                            <TextInput
                                id="linkedin"
                                name="linkedin"
                                value={data.linkedin}
                                className="pl-10 block w-full"
                                onChange={(e) => setData('linkedin', e.target.value)}
                            />
                        </div>
                        <InputError message={errors.linkedin} className="mt-2" />
                    </div>

                    <div className="col-span-2">
                        <InputLabel htmlFor="address" value="Address" />
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MapPin className="h-5 w-5 text-gray-400" />
                            </div>
                            <TextInput
                                id="address"
                                name="address"
                                value={data.address}
                                className="pl-10 block w-full"
                                onChange={(e) => setData('address', e.target.value)}
                            />
                        </div>
                        <InputError message={errors.address} className="mt-2" />
                    </div>

                    <div className="col-span-2">
                        <InputLabel htmlFor="phone_number" value="Phone Number" />
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Phone className="h-5 w-5 text-gray-400" />
                            </div>
                            <TextInput
                                id="phone_number"
                                name="phone_number"
                                value={data.phone_number}
                                className="pl-10 block w-full"
                                onChange={(e) => setData('phone_number', e.target.value)}
                            />
                        </div>
                        <InputError message={errors.phone_number} className="mt-2" />
                    </div>

                    <div className="col-span-2 flex items-center justify-between mt-6">
                        <Link
                            href={route('login')}
                            className="text-sm text-indigo-600 hover:text-indigo-500"
                        >
                            Already have an account?
                        </Link>

                        <PrimaryButton className="ml-4" disabled={processing}>
                            Register
                        </PrimaryButton>
                    </div>
                </form>

        </GuestLayout>
    );
}
