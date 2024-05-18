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
            header={999999}

        >
            <Head title="Dashboard" />
            <div className="flex flex-wrap ">
                <div className="w-full md:w-1/2 p-4">
                    <Link href="/experience-categories">
                        <Button >Go to Experience Categories Index</Button>
                    </Link>
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




            <Button
                variant="outline"
                onClick={() => {
                    toast({
                        title: "Uh oh! Something went wrong.",
                        description: "There was a problem with your request.",
                    })
                }}
            >
                Show Toast
            </Button>


        </AuthenticatedLayout>
    );
}
