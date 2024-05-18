import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import ProfessionCategoryTree from '../../Components/ProfessionCategoryTree';

interface Props {
    profession_categories: any;
}

export default function ProfessionCategoriesIndex({ profession_categories }: Props) {
    const [categories, setCategories] = useState(profession_categories);

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profession Categories</h2>}
        >
            <Head title="Profession Categories" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="flex justify-end m-4">
                            <Link href={route('profession-categories.create')}>
                                <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Create New Profession Category</button>
                            </Link>
                        </div>
                        <ProfessionCategoryTree categories={categories} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
