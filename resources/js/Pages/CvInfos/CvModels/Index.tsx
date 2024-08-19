import React, { useState } from 'react';
import Modal from 'react-modal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/Components/ui/card';
import { useToast } from '@/Components/ui/use-toast';
import axios from 'axios';
import { CheckCircle, PlusCircle } from 'lucide-react';

interface CvModel {
    id: number;
    name: string;
    previewImagePath: string;
    price: number; // Add the price field
}

interface Props {
    auth: any;
    userCvModels: CvModel[];
    availableCvModels: CvModel[];
}

const CvModelsIndex = ({ auth, userCvModels, availableCvModels }: Props) => {
    const { toast } = useToast();
    const [selectedModelId, setSelectedModelId] = useState<number>(auth.user.selected_cv_model_id);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleSelectActiveModel = (cvModelId: number) => {
        axios.post('/user-cv-models/select-active', {
            user_id: auth.user.id,
            cv_model_id: cvModelId,
        })
            .then(() => {
                setSelectedModelId(cvModelId);
                toast({
                    title: 'Active CV model updated',
                    description: 'The active CV model has been updated.'
                });
            })
            .catch((error) => {
                toast({
                    title: 'Error updating active CV model',
                    description: error.response?.data?.message || 'An error occurred.',
                    variant: 'destructive'
                });
            });
    };

    const handleAddCvModel = (cvModelId: number) => {
        axios.post('/user-cv-models', {
            user_id: auth.user.id,
            cv_model_id: cvModelId,
        })
            .then(() => {
                toast({
                    title: 'CV model added',
                    description: 'The new CV model has been added to your list.'
                });
                window.location.reload();
            })
            .catch((error) => {
                toast({
                    title: 'Error adding CV model',
                    description: error.response?.data?.message || 'An error occurred.',
                    variant: 'destructive'
                });
            });
    };

    const openModal = (imagePath: string) => {
        setSelectedImage(imagePath);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setModalIsOpen(false);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Manage CV Models" />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-8 text-center">Manage CV Models</h1>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 flex items-center">
                            <CheckCircle className="mr-2" />
                            Your CV Models
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {userCvModels.map((cvModel) => (
                                <Card key={cvModel.id}>
                                    <CardHeader>
                                        <CardTitle>{cvModel.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {cvModel.previewImagePath && (
                                            <img
                                                src={`/storage/${cvModel.previewImagePath}`}
                                                alt={`Preview of ${cvModel.name}`}
                                                className="w-full h-48 object-cover rounded-md cursor-pointer"
                                                onClick={() => openModal(`/storage/${cvModel.previewImagePath}`)}
                                            />
                                        )}
                                        <p className="mt-2">
                                            Price: {cvModel.price === 0 ? 'Free' : `${cvModel.price} FCFA`}
                                        </p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button
                                            onClick={() => handleSelectActiveModel(cvModel.id)}
                                            className={`w-full ${selectedModelId === cvModel.id ? 'bg-green-500 hover:bg-green-600' : ''}`}
                                            disabled={selectedModelId === cvModel.id}
                                        >
                                            {selectedModelId === cvModel.id ? 'Selected' : 'Select as Active'}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 flex items-center">
                            <PlusCircle className="mr-2" />
                            Available CV Models
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {availableCvModels.map((cvModel) => (
                                <Card key={cvModel.id}>
                                    <CardHeader>
                                        <CardTitle>{cvModel.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {cvModel.previewImagePath && (
                                            <img
                                                src={`/storage/${cvModel.previewImagePath}`}
                                                alt={`Preview of ${cvModel.name}`}
                                                className="w-full h-48 object-cover rounded-md cursor-pointer"
                                                onClick={() => openModal(`/storage/${cvModel.previewImagePath}`)}
                                            />
                                        )}
                                        <p className="mt-2">
                                            Price: {cvModel.price === 0 ? 'Free' : `${cvModel.price} FCFA`}
                                        </p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button
                                            onClick={() => handleAddCvModel(cvModel.id)}
                                            className="w-full"
                                        >
                                            Add Model
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </section>
                </div>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Image Preview"
                    className="modal-content"
                    overlayClassName="modal-overlay"
                >
                    <button className="close-button" onClick={closeModal}>
                        &times;
                    </button>
                    {selectedImage && (
                        <img src={selectedImage} alt="Preview" className="modal-image" />
                    )}
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
};

export default CvModelsIndex;
