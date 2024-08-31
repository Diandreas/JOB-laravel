// resources/js/Components/ProfessionManager.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '@/Components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import InputLabel from '@/Components/InputLabel';
import axios from 'axios';
import { useToast } from '@/Components/ui/use-toast';

interface Profession {
    id: number;
    name: string;
    description: string;
}

interface Props {
    auth: any;
    availableProfessions: Profession[];
    initialUserProfession: Profession | null;
}

const ProfessionManager = ({ auth, availableProfessions, initialUserProfession }: Props) => {
    const [selectedProfessionId, setSelectedProfessionId] = useState<number | null>(initialUserProfession?.id || null);
    const [userProfession, setUserProfession] = useState<Profession | null>(initialUserProfession);
    const { toast } = useToast();

    useEffect(() => {
        setUserProfession(initialUserProfession);
    }, [initialUserProfession]);

    const handleSelectProfession = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedProfessionId) {
            toast({
                title: 'Please select a profession',
                variant: 'destructive'
            });
            return;
        }

        axios.post('/user-professions', {
            user_id: auth.user.id,
            profession_id: selectedProfessionId,
        })
            .then((response) => {
                toast({
                    title: 'Profession assigned successfully',
                    description: 'The new profession has been assigned to the user.'
                });
                // Update the user profession
                const newProfession = availableProfessions.find(p => p.id === selectedProfessionId);
                if (newProfession) {
                    setUserProfession(newProfession);
                }
            })
            .catch((error) => {
                toast({
                    title: 'Error assigning profession',
                    description: error.response?.data?.message || 'An error occurred.'
                });
                console.error(error);
            });
    };

    const handleRemoveProfession = () => {
        axios.delete(`/user-professions/${auth.user.id}`)
            .then((response) => {
                toast({
                    title: 'Profession de-assigned successfully',
                    description: 'The profession has been removed from the user.'
                });
                // Update the user profession
                setUserProfession(null);
                setSelectedProfessionId(null);
            })
            .catch((error) => {
                toast({
                    title: 'Error de-assigning profession',
                    description: error.response?.data?.message || 'An error occurred.'
                });
                console.error(error);
            });
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Manage Profession</h1>
            <form onSubmit={handleSelectProfession}>
                <div className="mb-4">
                    <InputLabel htmlFor="profession_id" value="Profession" />
                    <Select onValueChange={(value: string) => setSelectedProfessionId(parseInt(value))}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a profession" />
                        </SelectTrigger>
                        <SelectContent>
                            {availableProfessions.map((profession) => (
                                <SelectItem key={profession.id} value={profession.id.toString()}>
                                    {profession.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button type="submit">Assign Profession</Button>
            </form>
            {userProfession && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">Your Profession</h2>
                    <div className="flex items-center justify-between mb-2">
                        <span>{userProfession.name}</span>
                        <Button onClick={handleRemoveProfession} variant="destructive">Remove</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfessionManager;
