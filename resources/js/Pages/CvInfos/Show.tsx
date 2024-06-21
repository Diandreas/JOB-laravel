import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/Components/ui/card";
import { Head, Link } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";

interface CvInformationProps {

    cvInformation: {
        hobbies: { id: number, name: string }[];
        competences: { id: number, name: string }[];
        experiences: { id: number, title: string, company_name: string, date_start: string, date_end: string | null, category_name: string,}[]
        professions: { id: number, name: string }[];
        summaries: { id: number, description: string }[];
        personalInformation: {
            id: number,
            firstName: string;
            lastName: string;
            // ... other personal info fields
        };
    };

}


// @ts-ignore
export default function Show({ auth, cvInformation , }: CvInformationProps) {
    const { hobbies, competences, experiences, professions, summaries, personalInformation } = cvInformation;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Mon CV</h2>}
        >
            <Head title="CV Information" />
            <div className="">
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">Personal Information</h1>
                <PersonalInfoCard item={personalInformation} linkRoute="personal-information.edit" />

                <h1 className="font-semibold text-xl text-gray-800 leading-tight">Professions</h1>
                <CvInfoListSection items={professions} linkRoute="user-professions.index" />

                <h1 className="font-semibold text-xl text-gray-800 leading-tight">Hobbies</h1>
                <CvInfoListSection items={hobbies} linkRoute="user-hobbies.index" />

                <h1 className="font-semibold text-xl text-gray-800 leading-tight">Competences</h1>
                <CvInfoListSection items={competences} linkRoute="user-competences.index" />

                <h1 className="font-semibold text-xl text-gray-800 leading-tight">Summaries</h1>
                <CvInfoSummarySection items={summaries} linkRoute="summaries.index" />
                <h1 className="font-semibold text-xl text-gray-800 leading-tight" >Experiences</h1>
                <CvInfoExperienceSection items={experiences} linkRoute="experiences.index" />



            </div>
        </AuthenticatedLayout>
    );
}

function CvInfoSection({ items, linkRoute }: { items: any[], linkRoute: string }) {
    return (
        <>
            <div className="flex flex-wrap">
            {items.map((item) => (
                <div key={item.id} className="w-full md:w-1/4 p-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>{item.name || item.title || item.description}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Display additional details here if needed */}
                            {item.company_name && item.start_date && (
                                <p>{item.company_name} ({item.start_date} - {item.end_date || 'Present'})</p>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Link href={route(linkRoute)}>
                                <Button>More</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            ))}</div>
        </>
    );
}

function CvInfoExperienceSection({ items, linkRoute }: { items: any[], linkRoute: string }) {
    console.log("Experiences Data:", items); // Check if experiences are present

    return (
        <div className="flex flex-wrap">
            {items.map((item) => (
                <div key={item.id} className="w-full md:w-1/2 p-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>{item.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p><b>Institution:</b> {item.InstitutionName}</p>
                            <p><b>Duree:</b> {item.date_start} - {item.date_end || 'Present'}</p>
                            <p><b>Category:</b> {item.category_name}</p>
                            <p><b>Description:</b> {item.description}</p>
                            <p><b>Output/Achievements:</b> {item.output}</p>
                            {/* Optionally, you can add: */}
                             <p><b>Comment: </b>{item.comment}</p>
                            {/* <p>Attachment ID: {item.attachment_id}</p> */}
                        </CardContent>
                        <CardFooter>
                            <Link href={route(linkRoute, item.id)}>
                                <Button>Details</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            ))}

            {/* Conditional "More" button */}
            {items.length > 0 && (
                <div className="w-full p-4">
                    <Link href={route(linkRoute)}>
                        <Button>More</Button>
                    </Link>
                </div>
            )}
        </div>
    );
}

function CvInfoListSection({ items, linkRoute }: { items: any[], linkRoute: string }) {
    return (
        <>
            <div className="flex flex-wrap">
                {items.map((item) => (
                    <div key={item.id} className="p-1">
                        <Card>
                            <CardContent className="p-4 ">
                                {item.name || item.title || item.description}
                            </CardContent>
                        </Card>
                    </div>
                ))}
                <Link className="mt-4" href={route(linkRoute)}>
                    <Button>More</Button>
                </Link> </div>

        </>
    );
}




function CvInfoSummarySection({ items, linkRoute }: { items: any[], linkRoute: string }) {
    return (
        <>
            <div className="flex flex-wrap">
                {items.map((item) => (
                    <div key={item.id} className="w-full md:w-1/4 p-4">
                        <Card>
                            <CardContent className="p-4">
                                {item.name || item.title || item.description}
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
            <Link href={route(linkRoute)}>
                <Button>More</Button>
            </Link>
        </>
    );
}


function PersonalInfoCard({ item, linkRoute }: { item: any, linkRoute: string }) {
    return (
        <div className="w-full  p-4">
            <Card>
                <CardHeader>
                    <CardTitle>{item.firstName} {item.lastName}</CardTitle>
                </CardHeader>
                <CardFooter>
                    <Link href={route(linkRoute, item.id)}>
                        <Button>Edit</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
