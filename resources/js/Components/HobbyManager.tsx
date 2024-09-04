import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/Components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Card, CardHeader, CardContent, CardFooter } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Input } from '@/Components/ui/input';
import { Heart, X, Search, Plus } from 'lucide-react';
import { useToast } from '@/Components/ui/use-toast';
import axios from 'axios';

interface Hobby {
    id: number;
    name: string;
}

interface Props {
    auth: any;
    availableHobbies: Hobby[];
    initialUserHobbies: Hobby[];
}

const HobbyManager: React.FC<Props> = ({ auth, availableHobbies, initialUserHobbies }) => {
    const [selectedHobbyId, setSelectedHobbyId] = useState<number | null>(null);
    const [userHobbies, setUserHobbies] = useState<Hobby[]>(initialUserHobbies);
    const [searchTerm, setSearchTerm] = useState('');
    const { toast } = useToast();

    useEffect(() => {
        setUserHobbies(initialUserHobbies);
    }, [initialUserHobbies]);

    const filteredHobbies = useMemo(() => {
        return availableHobbies.filter(hobby =>
            hobby.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !userHobbies.some(userHobby => userHobby.id === hobby.id)
        );
    }, [availableHobbies, userHobbies, searchTerm]);

    const handleAddHobby = async () => {
        if (!selectedHobbyId) {
            toast({
                title: 'Please select a hobby',
                variant: 'destructive'
            });
            return;
        }

        try {
            await axios.post('/user-hobbies', {
                user_id: auth.user.id,
                hobby_id: selectedHobbyId,
            });

            const newHobby = availableHobbies.find(h => h.id === selectedHobbyId);
            if (newHobby) {
                setUserHobbies(prev => [...prev, newHobby]);
                setSelectedHobbyId(null);
                toast({
                    title: 'Hobby added successfully',
                    description: `${newHobby.name} has been added to your hobbies.`
                });
            }
        } catch (error) {
            toast({
                title: 'Error adding hobby',
                description: error.response?.data?.message || 'An error occurred.',
                variant: 'destructive'
            });
        }
    };

    const handleRemoveHobby = async (hobbyId: number) => {
        try {
            await axios.delete(`/user-hobbies/${auth.user.id}/${hobbyId}`);
            setUserHobbies(prev => prev.filter(h => h.id !== hobbyId));
            toast({
                title: 'Hobby removed',
                description: 'The hobby has been removed from your profile.'
            });
        } catch (error) {
            toast({
                title: 'Error removing hobby',
                description: error.response?.data?.message || 'An error occurred.',
                variant: 'destructive'
            });
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <h2 className="text-2xl font-bold flex items-center">
                    <Heart className="mr-2" /> Manage Your Hobbies
                </h2>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search hobbies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <Select
                        value={selectedHobbyId?.toString() || ''}
                        onValueChange={(value) => setSelectedHobbyId(parseInt(value))}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a hobby" />
                        </SelectTrigger>
                        <SelectContent>
                            {filteredHobbies.map((hobby) => (
                                <SelectItem key={hobby.id} value={hobby.id.toString()}>
                                    {hobby.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button onClick={handleAddHobby}>
                        <Plus className="w-4 h-4 mr-2" /> Add
                    </Button>
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Your Hobbies</h3>
                    <div className="flex flex-wrap gap-2">
                        {userHobbies.map((hobby) => (
                            <Badge
                                key={hobby.id}
                                variant="secondary"
                                className="flex items-center space-x-1 p-2"
                            >
                                <span>{hobby.name}</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRemoveHobby(hobby.id)}
                                    className="h-5 w-5 p-0 ml-2"
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <p className="text-sm text-gray-500">
                    {userHobbies.length > 0
                        ? `You have ${userHobbies.length} hobbies. Add more or remove existing ones.`
                        : "Add some hobbies to personalize your profile."}
                </p>
            </CardFooter>
        </Card>
    );
};

export default HobbyManager;
