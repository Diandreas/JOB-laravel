import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Select } from '@/Components/ui/select';

interface Props {
    profession: any;
    categories: any;
}

export default function ProfessionsEdit({ profession, categories }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: profession.name,
        description: profession.description,
        category_id: profession.category_id,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route('professions.update', profession.id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Profession</h2>}
        >
            <Head title="Edit Profession" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <form onSubmit={handleSubmit}>
                            <div className="p-4">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    autoFocus={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <div className="text-red-500">{errors.name}</div>}
                            </div>
                            <div className="p-4">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                {errors.description && <div className="text-red-500">{errors.description}</div>}
                            </div>
                            <div className="p-4">
                                <label htmlFor="category_id">Category</label>
                                <Select
                                    name="category_id"
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category: any) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </Select>
                                {errors.category_id && <div className="text-red-500">{errors.category_id}</div>}
                            </div>
                            <div className="p-4 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
