"use client"
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
import { useToast} from "@/Components/ui/use-toast";




export default function Dashboard({ auth }: PageProps) {
    const { toast } = useToast()

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={'ADMIN PART'}

        >
            <Head title="Dashboard" />
            <div className="flex flex-wrap ">
                <div className="w-full md:w-1/2 p-4">


                    <Card >
                        <CardHeader>
                            <CardTitle>Experience Categories</CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Create, update , manage </p>
                        </CardContent>
                        <CardFooter>
                            <Link href="/experience-categories">
                                <Button > Lets Go </Button>
                            </Link>
                        </CardFooter>
                    </Card>
            </div>
                <div className="w-full md:w-1/2 p-4 ">

                    <Card>
                        <CardHeader>
                            <CardTitle>Professions Categories</CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Create, update , manage </p>
                        </CardContent>
                        <CardFooter>
                            <Link href="/profession-categories">
                            <Button > Lets Go </Button>
                        </Link>
                        </CardFooter>
                    </Card>

                </div>





<div  className="w-full md:w-1/2 p-4">
    <Card>
        <CardHeader>
            <CardTitle>Hobbies</CardTitle>
            <CardDescription>edit your information a download your cv ?</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Create, update , manage </p>
        </CardContent>
        <CardFooter>
            <Link href="/hobbies">
                <Button > Lets Go </Button>
            </Link>
        </CardFooter>
    </Card>
</div>
                <div  className="w-full md:w-1/2 p-4">
                    <Card >
                        <CardHeader>
                            <CardTitle>Profession  </CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Create, update , manage </p>
                        </CardContent>
                        <CardFooter>
                            <Link href="/professions">
                                <Button > Lets Go </Button>
                            </Link>
                        </CardFooter>
                    </Card>

                </div>



            <div  className="w-full md:w-1/2 p-4">
                <Card >
                    <CardHeader>
                        <CardTitle>Competence  </CardTitle>
                        <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Create, update , manage </p>
                    </CardContent>
                    <CardFooter>
                        <Link href="/competences">
                            <Button > Lets Go </Button>
                        </Link>
                    </CardFooter>
                </Card>

            </div>

        </div>


        </AuthenticatedLayout>
    );
}
