import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from "@/Components/ui/button"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/Components/ui/accordion";




export default function index({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}

        >

            <Head title="Welcome" />

            <Accordion type="single" collapsible className="w-1/4">
                <AccordionItem value="item-1" >
                    <AccordionTrigger>A propos de nous</AccordionTrigger>
                    <AccordionContent>
                        Nous sommes une équipe passionnée par l'art de présenter les individus sous leur meilleur jour professionnel.
                        Chez Job CV, nous croyons fermement que chaque personne mérite d'avoir un CV qui reflète fidèlement son parcours,
                        ses compétences et ses aspirations.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>


            <Accordion type="single" collapsible className="w-1/4">
                <AccordionItem value="item-1" >
                    <AccordionTrigger>Notre mission </AccordionTrigger>
                    <AccordionContent>
                        Notre mission est de simplifier le processus de création de CV en fournissant des outils intuitifs et des modèles professionnels qui permettent à nos utilisateurs de se démarquer dans leur recherche d'emploi.
                        Que vous soyez un professionnel chevronné cherchant à évoluer dans votre carrière ou un jeune diplômé débutant dans le monde du travail,
                        notre plateforme est conçue pour répondre à vos besoins spécifiques.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>


            <Accordion type="single" collapsible className="w-1/4">
                <AccordionItem value="item-1" >
                    <AccordionTrigger>Nos valeurs </AccordionTrigger>
                    <AccordionContent>
                        Ce qui nous distingue, c'est notre engagement envers l'excellence et l'innovation.
                        Nous restons constamment à l'écoute des retours de nos utilisateurs afin d'améliorer continuellement notre service et de nous assurer qu'il réponde aux exigences du marché du travail en constante évolution.
                    </AccordionContent>
                </AccordionItem>


            </Accordion>

        </AuthenticatedLayout>
    );
}
