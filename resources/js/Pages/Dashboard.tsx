import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"


import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from "@/Components/ui/button"




export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}

        >
            <Head title="Dashboard" />
            <div className="flex flex-wrap ">
                <div className="w-full md:w-1/2 p-4">
                    <Card >
                        <CardHeader>
                            <CardTitle>Announces</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                        <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter>
                    </Card>
            </div>
                <div className="w-full md:w-1/2 p-4 ">

                    <Card>
                        <CardHeader>
                            <CardTitle>Notification</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                        <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter>
                    </Card>

                </div>


    <div  className="w-full md:w-1/2 p-4">
        <Card >
            <CardHeader>
                <CardTitle>My cv</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>

    </div>


<div  className="w-full md:w-1/2 p-4">
    <Card>
        <CardHeader>
            <CardTitle>Find a CV</CardTitle>
            <CardDescription>edit your information a download your cv ?</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Card Content</p>
        </CardContent>
        <CardFooter>
            <p>Card Footer</p>
        </CardFooter>
    </Card>
</div>

        </div>




        </AuthenticatedLayout>
    );
}
