import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    professions: any;
}

export default function ProfessionsIndex({ professions }: Props) {
    const [search, setSearch] = useState('');

    const filteredProfessions = professions.filter((profession: any) => {
        return profession.name.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Professions</h2>}
        >
            <Head title="Professions" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="flex justify-between m-4">
                            <input
                                type="text"
                                placeholder="Search professions..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="px-4 py-2 border rounded-md"
                            />
                            <Link href={route('professions.create')}>
                                <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Create New Profession</button>
                            </Link>
                        </div>
                        <div className="overflow-x-auto relative">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Category</th>
                                    <th scope="col" className="px-6 py-3">Description</th>
                                    <th scope="col" className="px-6 py-3">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredProfessions.map((profession: any) => (
                                    <tr key={profession.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{profession.name}</th>
                                        <td className="px-6 py-4">{profession.category.name}</td>
                                        <td className="px-6 py-4">{profession.description}</td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={route('professions.edit', profession.id)}>
                                                <button className="px-2 py-1 bg-green-500 text-white rounded-md mx-1">Edit</button>
                                            </Link>
                                            <button className="px-2 py-1 bg-red-500 text-white rounded-md mx-1" onClick={() => {
                                                if (confirm('Are you sure you want to delete this profession?')) {
                                                    axios.delete(route('professions.destroy', profession.id))
                                                        .then(() => {
                                                            setProfessions(prevProfessions => prevProfessions.filter((p: any) => p.id !== profession.id));
                                                        });
                                                }
                                            }}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
