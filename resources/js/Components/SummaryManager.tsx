// resources/js/Components/SummaryManager.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '@/Components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import InputLabel from '@/Components/InputLabel';
import axios from 'axios';
import { useToast } from '@/Components/ui/use-toast';

interface Summary {
    id: number;
    name: string;
    description: string;
}

interface Props {
    auth: any;
    availableSummaries: Summary[];
    initialUserSummary: Summary | null;
}

const SummaryManager = ({ auth, availableSummaries, initialUserSummary }: Props) => {
    const [selectedSummaryId, setSelectedSummaryId] = useState<number | null>(initialUserSummary?.id || null);
    const [userSummary, setUserSummary] = useState<Summary | null>(initialUserSummary);
    const { toast } = useToast();

    useEffect(() => {
        setUserSummary(initialUserSummary);
    }, [initialUserSummary]);

    const handleSelectSummary = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedSummaryId) {
            toast({
                title: 'Please select a summary',
                variant: 'destructive'
            });
            return;
        }

        axios.post('/summaries/select', {
            user_id: auth.user.id,
            summary_id: selectedSummaryId,
        })
            .then((response) => {
                toast({
                    title: 'Summary assigned successfully',
                    description: 'The new summary has been assigned to the user.'
                });
                // Update the user summary
                const newSummary = availableSummaries.find(s => s.id === selectedSummaryId);
                if (newSummary) {
                    setUserSummary(newSummary);
                }
            })
            .catch((error) => {
                toast({
                    title: 'Error assigning summary',
                    description: error.response?.data?.message || 'An error occurred.'
                });
                console.error(error);
            });
    };

    const handleRemoveSummary = () => {
        axios.delete(`/summaries/select/${auth.user.id}`)
            .then((response) => {
                toast({
                    title: 'Summary de-assigned successfully',
                    description: 'The summary has been removed from the user.'
                });
                // Update the user summary
                setUserSummary(null);
                setSelectedSummaryId(null);
            })
            .catch((error) => {
                toast({
                    title: 'Error de-assigning summary',
                    description: error.response?.data?.message || 'An error occurred.'
                });
                console.error(error);
            });
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Manage Summary</h1>
            <form onSubmit={handleSelectSummary}>
                <div className="mb-4">
                    <InputLabel htmlFor="summary_id" value="Summary" />
                    <Select onValueChange={(value: string) => setSelectedSummaryId(parseInt(value))}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a summary" />
                        </SelectTrigger>
                        <SelectContent>
                            {availableSummaries.map((summary) => (
                                <SelectItem key={summary.id} value={summary.id.toString()}>
                                    {summary.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button type="submit">Assign Summary</Button>
            </form>
            {userSummary && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">Your Summary</h2>
                    <div className="flex items-center justify-between mb-2">
                        <span>{userSummary.name}</span>
                        <Button onClick={handleRemoveSummary} variant="destructive">Remove</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SummaryManager;
