import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from "@/Components/ui/button"




export default function index({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}

        >
            <Head title="CV gallery" />







        </AuthenticatedLayout>
    );
}
