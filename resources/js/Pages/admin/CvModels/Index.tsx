import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


// @ts-ignore
const CvModelIndex = ({ cvModels ,auth}: props) => {
    if (!cvModels) {

        return <>


            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>}
            >
                <h2>CV Models</h2>
                <Link href={route('CvModels.create')} className="btn btn-primary mb-3">
                    Create New CV Model
                </Link>

                <div>Loading...</div>
            </AuthenticatedLayout>
        </>
       ;
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>}
        >
        <div className="container">
            <h2>CV Models</h2>
            <Link href={route('CvModels.create')} className="btn btn-primary mb-3">
                Create New CV Model
            </Link>
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Preview Image</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {cvModels.map(cvModel => (
                    <tr key={cvModel.id}>
                        <td>{cvModel.name}</td>
                        <td>{cvModel.description}</td>
                        <td>{cvModel.price}</td>
                        <td>
                            <img src={`/storage/${cvModel.previewImagePath}`} alt={cvModel.name} width="50" />
                        </td>
                        <td>
                            <Link href={route('CvModels.show', cvModel.id)} className="btn btn-info btn-sm">
                                View
                            </Link>
                            <Link href={route('CvModels.edit', cvModel.id)} className="btn btn-warning btn-sm">
                                Edit
                            </Link>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                if (confirm('Are you sure?')) {
                                    Inertia.delete(route('CvModels.destroy', cvModel.id));
                                }
                            }} style={{ display: 'inline' }}>
                                <Button type="submit" className="btn btn-danger btn-sm">
                                    Delete
                                </Button>
                            </form>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        </AuthenticatedLayout>
    );
};

export default CvModelIndex;
