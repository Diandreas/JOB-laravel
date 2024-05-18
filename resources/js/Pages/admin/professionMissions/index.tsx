import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';

interface Props {
    professions: any;
    filters: any;
}

export default function ProfessionsIndex({ professions, filters }: Props) {
    const setFilter = (key: string, value: string | null) => {
        const newFilters = {
            ...filters,
            [key]: value,
        };

        router.visit(route('professions.index', newFilters), {
            replace: true,
            state: { page: newFilters.page },
        });
    };

    const clearFilter = () => {
        router.visit(route('professions.index'), {
            replace: true,
            state: { page: 1 },
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Professions</h2>}
        >
            <Head title="Professions" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-4 flex justify-between">
                        <div>
                            <input
                                type="text"
                                value={filters.search || ''}
                                onChange={(e) => setFilter('search', e.target.value)}
                                placeholder="Search..."
                                className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm w-64"
                            />
                        </div>
                        <div>
                            <Link
                                href={route('professions.create')}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Create
                            </Link>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <table className="w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Name
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Description
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Category
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {professions.data.map((profession: any) => (
                                <tr key={profession.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{profession.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{profession.description}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{profession.category.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link
                                            href={route('professions.edit', profession.id)}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <Pagination links={professions.links} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
