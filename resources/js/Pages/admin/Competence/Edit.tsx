import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Button } from "@/Components/ui/button";
import {PageProps} from "@/types";

interface Hobby {
    id: number;
    name: string;
}

interface Props extends PageProps {
    hobby: Hobby;
}

export default function HobbiesEdit({ auth, hobby }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: hobby.name || '',
    });

    // Fonction pour soumettre le formulaire de modification de hobby
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route('hobbies.update', hobby.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Hobby: {hobby.name}</h2>}
        >
            <Head title="Edit Hobby" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <form onSubmit={handleSubmit}>
                            <div className="p-4">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    // @ts-ignore
                                    isFocused={true}
                                    // @ts-ignore
                                    handleChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <div className="text-red-500">{errors.name}</div>}
                            </div>
                            <div className="p-4 flex justify-end">
                                <Button type="submit" disabled={processing}>Update</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
