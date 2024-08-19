import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/Components/ui/card';
import { useToast } from '@/Components/ui/use-toast';
import axios from 'axios';
import { CheckCircle, PlusCircle, X, Search, Filter, ArrowUpDown } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from '@/Components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Progress } from '@/Components/ui/progress';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/Components/ui/tooltip";

interface CvModel {
    id: number;
    name: string;
    previewImagePath: string;
    price: number;
    category: string;
}

interface Props {
    auth: any;
    userCvModels: CvModel[];
    availableCvModels: CvModel[];
    maxAllowedModels: number;
}

const CvModelsIndex = ({ auth, userCvModels, availableCvModels, maxAllowedModels }: Props) => {
    const { toast } = useToast();
    const [selectedModelId, setSelectedModelId] = useState<number>(auth.user.selected_cv_model_id);
    const [modalImage, setModalImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('name');
    const [filterCategory, setFilterCategory] = useState<string>('all');
    const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
    const [actionToConfirm, setActionToConfirm] = useState<() => void>(() => {});

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleSelectActiveModel = (cvModelId: number) => {
        setActionToConfirm(() => () => {
            setLoading(true);
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
                })
                .finally(() => setLoading(false));
        });
        setShowConfirmDialog(true);
    };

    const handleAddCvModel = (cvModelId: number) => {
        setActionToConfirm(() => () => {
            setLoading(true);
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
                })
                .finally(() => setLoading(false));
        });
        setShowConfirmDialog(true);
    };

    const openModal = (imagePath: string) => {
        setModalImage(`/storage/${imagePath}`);
    };

    const closeModal = () => {
        setModalImage(null);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSort = (value: string) => {
        setSortBy(value);
    };

    const handleFilter = (value: string) => {
        setFilterCategory(value);
    };

    const filteredAndSortedModels = (models: CvModel[]) => {
        return models
            .filter(model =>
                model.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (filterCategory === 'all' || model.category === filterCategory)
            )
            .sort((a, b) => {
                if (sortBy === 'name') {
                    return a.name.localeCompare(b.name);
                } else if (sortBy === 'price') {
                    return a.price - b.price;
                }
                return 0;
            });
    };

    const renderCvModelCard = (cvModel: CvModel, isUserModel: boolean) => (
        <Card key={cvModel.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">{cvModel.name}</CardTitle>
            </CardHeader>
            <CardContent>
                {cvModel.previewImagePath && (
                    <div className="relative overflow-hidden rounded-md cursor-pointer" onClick={() => openModal(cvModel.previewImagePath)}>
                        <img
                            src={`/storage/${cvModel.previewImagePath}`}
                            alt={`Preview of ${cvModel.name}`}
                            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300">Click to enlarge</span>
                        </div>
                    </div>
                )}
                <p className="mt-4 font-medium">
                    Price: {cvModel.price === 0 ? 'Free' : `${cvModel.price.toLocaleString()} FCFA`}
                </p>
                <p className="mt-2">Category: {cvModel.category}</p>
            </CardContent>
            <CardFooter>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={() => isUserModel ? handleSelectActiveModel(cvModel.id) : handleAddCvModel(cvModel.id)}
                                className={`w-full ${isUserModel && selectedModelId === cvModel.id ? 'bg-green-500 hover:bg-green-600' : ''}`}
                                disabled={isUserModel && selectedModelId === cvModel.id || loading}
                            >
                                {isUserModel ? (selectedModelId === cvModel.id ? 'Selected' : 'Select as Active') : 'Add Model'}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            {isUserModel ? 'Set as your active CV model' : 'Add this model to your collection'}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </CardFooter>
        </Card>
    );

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Manage CV Models" />
            <div className="container mx-auto p-6 max-w-7xl">
                <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">Manage CV Models</h1>

                <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Search className="text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search models..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="max-w-xs"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Filter className="text-gray-400" />
                            <Select onValueChange={handleFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="professional">Professional</SelectItem>
                                    <SelectItem value="creative">Creative</SelectItem>
                                    <SelectItem value="academic">Academic</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center gap-2">
                            <ArrowUpDown className="text-gray-400" />
                            <Select onValueChange={handleSort}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="name">Sort by Name</SelectItem>
                                    <SelectItem value="price">Sort by Price</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-700">
                            <CheckCircle className="mr-2 text-green-500" />
                            Your CV Models
                        </h2>
                        <Progress value={(userCvModels.length / maxAllowedModels) * 100} className="mb-4" />
                        <p className="mb-4 text-sm text-gray-600">{userCvModels.length} of {maxAllowedModels} models selected</p>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredAndSortedModels(userCvModels).map((cvModel) => renderCvModelCard(cvModel, true))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-700">
                            <PlusCircle className="mr-2 text-blue-500" />
                            Available CV Models
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredAndSortedModels(availableCvModels).map((cvModel) => renderCvModelCard(cvModel, false))}
                        </div>
                    </section>
                </div>
            </div>

            {modalImage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeModal}>
                    <div className="relative max-w-4xl max-h-[90vh] overflow-auto">
                        <img src={modalImage} alt="CV Model Preview" className="max-w-full max-h-full object-contain" />
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors duration-300"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>
            )}

            <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Action</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to perform this action?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={() => {
                            actionToConfirm();
                            setShowConfirmDialog(false);
                        }}>
                            Confirm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
};

export default CvModelsIndex;
