import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/Components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Card, CardHeader, CardContent, CardFooter } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Input } from '@/Components/ui/input';
import { Briefcase, X, Search } from 'lucide-react';
import { useToast } from '@/Components/ui/use-toast';
import axios from 'axios';

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

const ProfessionManager: React.FC<Props> = ({ auth, availableProfessions, initialUserProfession }) => {
    const [selectedProfessionId, setSelectedProfessionId] = useState<number | null>(initialUserProfession?.id || null);
    const [userProfession, setUserProfession] = useState<Profession | null>(initialUserProfession);
    const [searchTerm, setSearchTerm] = useState('');
    const { toast } = useToast();

    useEffect(() => {
        setUserProfession(initialUserProfession);
        setSelectedProfessionId(initialUserProfession?.id || null);
    }, [initialUserProfession]);

    const filteredProfessions = useMemo(() => {
        return availableProfessions.filter(profession =>
            profession.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [availableProfessions, searchTerm]);

    const handleSelectProfession = async () => {
        if (!selectedProfessionId) {
            toast({
                title: 'Please select a profession',
                variant: 'destructive'
            });
            return;
        }

        try {
            await axios.post('/user-professions', {
                user_id: auth.user.id,
                profession_id: selectedProfessionId,
            });

            const newProfession = availableProfessions.find(p => p.id === selectedProfessionId);
            if (newProfession) {
                setUserProfession(newProfession);
                toast({
                    title: 'Profession assigned successfully',
                    description: `You are now registered as a ${newProfession.name}.`
                });
            }
        } catch (error) {
            toast({
                title: 'Error assigning profession',
                description: error.response?.data?.message || 'An error occurred.',
                variant: 'destructive'
            });
        }
    };

    const handleRemoveProfession = async () => {
        try {
            await axios.delete(`/user-professions/${auth.user.id}`);
            setUserProfession(null);
            setSelectedProfessionId(null);
            toast({
                title: 'Profession removed',
                description: 'Your profession has been removed from your profile.'
            });
        } catch (error) {
            toast({
                title: 'Error removing profession',
                description: error.response?.data?.message || 'An error occurred.',
                variant: 'destructive'
            });
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <h2 className="text-2xl font-bold flex items-center">
                    <Briefcase className="mr-2" /> Manage Your Profession
                </h2>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search professions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <Select
                        value={selectedProfessionId?.toString() || ''}
                        onValueChange={(value) => setSelectedProfessionId(parseInt(value))}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a profession" />
                        </SelectTrigger>
                        <SelectContent>
                            {filteredProfessions.map((profession) => (
                                <SelectItem key={profession.id} value={profession.id.toString()}>
                                    {profession.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button onClick={handleSelectProfession}>
                        Assign
                    </Button>
                </div>
                {userProfession && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Your Current Profession</h3>
                        <Badge
                            variant="secondary"
                            className="flex items-center justify-between w-full p-2"
                        >
                            <span className="text-lg">{userProfession.name}</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleRemoveProfession}
                                className="h-8 w-8 p-0"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </Badge>
                    </div>
                )}
            </CardContent>
            <CardFooter>
                <p className="text-sm text-gray-500">
                    {userProfession
                        ? "You can change your profession at any time."
                        : "Select a profession to get started."}
                </p>
            </CardFooter>
        </Card>
    );
};

export default ProfessionManager;
