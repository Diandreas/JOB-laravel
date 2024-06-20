import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"


import {Head, Link} from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from "@/Components/ui/button"




export default function index({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
             header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Mes Informations</h2>}

        >

            <Head title="CV information" />

            <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 p-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Hobby</CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Create, update, manage</p>
                        </CardContent>
                        <CardFooter>
                            <Link href={route('user-hobbies.index')}>
                                <Button>
                                    Lets Go
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
                <div className="w-full md:w-1/2 p-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Competences</CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Create, update, manage</p>
                        </CardContent>
                        <CardFooter>
                            <Link href={route('user-competences.index')}>
                                <Button>
                                    Lets Go
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
                <div className="w-full md:w-1/2 p-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Experiences</CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Create, update, manage</p>
                        </CardContent>
                        <CardFooter>
                            <Link href={route('experiences.index')}>
                                <Button>
                                    Lets Go
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
                <div className="w-full md:w-1/2 p-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profession</CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Create, update, manage</p>
                        </CardContent>
                        <CardFooter>
                            <Link href={route('user-professions.index')}>
                                <Button>
                                    Lets Go
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
                <div className="w-full md:w-1/2 p-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Mes Sommaire</CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Create, update, manage</p>
                        </CardContent>
                        <CardFooter>
                            <Link href={route('summaries.index')}>
                                <Button>
                                    Lets Go
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
                <div className="w-full md:w-1/2 p-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Nom, Prenom</CardTitle>
                            <CardDescription>edit your information and download your cv ?</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Create, update, manage</p>
                        </CardContent>
                        <CardFooter>
                            <Link href={route('personal-information.index')}>
                                <Button>
                                    Lets Go
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>






        </AuthenticatedLayout>
    );
}
