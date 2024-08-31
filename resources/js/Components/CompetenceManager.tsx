// resources/js/Components/CompetenceManager.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '@/Components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import InputLabel from '@/Components/InputLabel';
import axios from 'axios';
import { useToast } from '@/Components/ui/use-toast';

interface Competence {
    id: number;
    name: string;
    description: string;
}

interface Props {
    auth: any;
    availableCompetences: Competence[];
    initialUserCompetences: Competence[];
}

const CompetenceManager = ({ auth, availableCompetences, initialUserCompetences }: Props) => {
    const [selectedCompetenceId, setSelectedCompetenceId] = useState<number | null>(null);
    const [userCompetences, setUserCompetences] = useState<Competence[]>(initialUserCompetences);
    const { toast } = useToast();

    useEffect(() => {
        setUserCompetences(initialUserCompetences);
    }, [initialUserCompetences]);

    const handleAddCompetence = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedCompetenceId) {
            toast({
                title: 'Please select a competence',
                variant: 'destructive'
            });
            return;
        }

        axios.post('/user-competences', {
            user_id: auth.user.id,
            competence_id: selectedCompetenceId,
        })
            .then((response) => {
                toast({
                    title: 'Competence assigned successfully',
                    description: 'The new competence has been assigned to the user.'
                });
                // Update the list of user competences
                const newCompetence = availableCompetences.find(c => c.id === selectedCompetenceId);
                if (newCompetence) {
                    setUserCompetences([...userCompetences, newCompetence]);
                }
            })
            .catch((error) => {
                toast({
                    title: 'Error assigning competence',
                    description: error.response?.data?.message || 'An error occurred.'
                });
                console.error(error);
            });
    };

    const handleRemoveCompetence = (competenceId: number) => {
        axios.delete(`/user-competences/${auth.user.id}/${competenceId}`)
            .then((response) => {
                toast({
                    title: 'Competence de-assigned successfully',
                    description: 'The competence has been removed from the user.'
                });
                // Update the list of user competences
                setUserCompetences(userCompetences.filter(c => c.id !== competenceId));
            })
            .catch((error) => {
                toast({
                    title: 'Error de-assigning competence',
                    description: error.response?.data?.message || 'An error occurred.'
                });
                console.error(error);
            });
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Manage Competences</h1>
            <form onSubmit={handleAddCompetence}>
                <div className="mb-4">
                    <InputLabel htmlFor="competence_id" value="Competence" />
                    <Select onValueChange={(value: string) => setSelectedCompetenceId(parseInt(value))}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a competence" />
                        </SelectTrigger>
                        <SelectContent>
                            {availableCompetences.map((competence) => (
                                <SelectItem key={competence.id} value={competence.id.toString()}>
                                    {competence.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button type="submit">Add Competence</Button>
            </form>
            <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Your Competences</h2>
                <ul>
                    {userCompetences.map((competence) => (
                        <li key={competence.id} className="flex items-center justify-between mb-2">
                            <span>{competence.name}</span>
                            <Button onClick={() => handleRemoveCompetence(competence.id)} variant="destructive">Remove</Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CompetenceManager;
