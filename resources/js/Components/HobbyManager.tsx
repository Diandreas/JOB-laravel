// resources/js/Components/HobbyManager.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '@/Components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import InputLabel from '@/Components/InputLabel';
import axios from 'axios';
import { useToast } from '@/Components/ui/use-toast';

interface Hobby {
    id: number;
    name: string;
}

interface Props {
    auth: any;
    availableHobbies: Hobby[];
    initialUserHobbies: Hobby[];
}

const HobbyManager = ({ auth, availableHobbies, initialUserHobbies }: Props) => {
    const [selectedHobbyId, setSelectedHobbyId] = useState<number | null>(null);
    const [userHobbies, setUserHobbies] = useState<Hobby[]>(initialUserHobbies);
    const { toast } = useToast();

    useEffect(() => {
        setUserHobbies(initialUserHobbies);
    }, [initialUserHobbies]);

    const handleAddHobby = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedHobbyId) {
            toast({
                title: 'Please select a hobby',
                variant: 'destructive'
            });
            return;
        }

        axios.post('/user-hobbies', {
            user_id: auth.user.id,
            hobby_id: selectedHobbyId,
        })
            .then((response) => {
                toast({
                    title: 'Hobby assigned successfully',
                    description: 'The new hobby has been assigned to the user.'
                });
                // Update the list of user hobbies
                const newHobby = availableHobbies.find(h => h.id === selectedHobbyId);
                if (newHobby) {
                    setUserHobbies([...userHobbies, newHobby]);
                }
            })
            .catch((error) => {
                toast({
                    title: 'Error assigning hobby',
                    description: error.response?.data?.message || 'An error occurred.'
                });
                console.error(error);
            });
    };

    const handleRemoveHobby = (hobbyId: number) => {
        axios.delete(`/user-hobbies/${auth.user.id}/${hobbyId}`)
            .then((response) => {
                toast({
                    title: 'Hobby de-assigned successfully',
                    description: 'The hobby has been removed from the user.'
                });
                // Update the list of user hobbies
                setUserHobbies(userHobbies.filter(h => h.id !== hobbyId));
            })
            .catch((error) => {
                toast({
                    title: 'Error de-assigning hobby',
                    description: error.response?.data?.message || 'An error occurred.'
                });
                console.error(error);
            });
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Manage Hobbies</h1>
            <form onSubmit={handleAddHobby}>
                <div className="mb-4">
                    <InputLabel htmlFor="hobby_id" value="Hobby" />
                    <Select onValueChange={(value: string) => setSelectedHobbyId(parseInt(value))}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a hobby" />
                        </SelectTrigger>
                        <SelectContent>
                            {availableHobbies.map((hobby) => (
                                <SelectItem key={hobby.id} value={hobby.id.toString()}>
                                    {hobby.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button type="submit">Add Hobby</Button>
            </form>
            <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Your Hobbies</h2>
                <ul>
                    {userHobbies.map((hobby) => (
                        <li key={hobby.id} className="flex items-center justify-between mb-2">
                            <span>{hobby.name}</span>
                            <Button onClick={() => handleRemoveHobby(hobby.id)} variant="destructive">Remove</Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HobbyManager;
