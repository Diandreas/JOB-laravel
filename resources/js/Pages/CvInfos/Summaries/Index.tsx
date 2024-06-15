
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { useToast } from '@/Components/ui/use-toast';

// @ts-ignore
const SummaryIndex = ({ auth, summaries }) => {
    const { toast } = useToast();
    const { delete: destroy } = useForm();

    // @ts-ignore
    const handleDelete = (summaryId) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce résumé ?')) {
            destroy(route('summaries.destroy', summaryId), {
                onSuccess: () => {
                    toast({
                        title: 'Résumé supprimé avec succès',
                    });
                },
                onError: () => {
                    toast({
                        title: 'Erreur lors de la suppression du résumé',
                        variant: 'destructive',
                    });
                }
            });
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Mes Résumés" />
            <div className="p-4">
                <h1 className="text-2xl font-semibold mb-4">Mes Résumés</h1>

                <div className="mb-4">
                    <Link href={route('summaries.create')}>
                        <Button>Ajouter un résumé</Button>
                    </Link>
                </div>

                {summaries && summaries.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {
                            //@ts-ignore
                            summaries.map((summary) => (
                            <div key={summary.id} className="bg-white rounded-md shadow-md p-4">
                                <h2 className="text-lg font-semibold mb-2">{summary.name}</h2>
                                <p className="text-gray-800 mb-4">{summary.description}</p>

                                <div className="flex justify-end space-x-2">
                                    <Link href={route('summaries.edit', summary.id)}>
                                        <Button variant="outline">Modifier</Button>
                                    </Link>
                                    <Button variant="destructive" onClick={() => handleDelete(summary.id)}>Supprimer</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
                        <p className="text-sm">Vous n'avez pas encore de résumés. Cliquez sur "Ajouter un résumé" pour commencer.</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default SummaryIndex;
