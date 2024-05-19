import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/Components/ui/accordion"


import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import image from '../../images/Barbara-A-Felix-1.jpg';

export default function Welcome({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <main className="p-4 grid grid-cols-11 gap-1">
                <div className="col-start-1 col-end-3">
                        <img src={image} alt="Description de l'image" className="w-full h-auto" onError={handleImageError} />
                        <div className="bg-gray-800 text-white p-4">
      <p className="text-right">
        <span className="text-xl"><b> PROFILE </b></span>
      </p>

      <hr className="border-white" />

      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis aperiam exercitationem quasi explicabo culpa, doloremque dolorum et mollitia nulla!
      </p>
    </div>

    <div className="bg-gray-300 text-black p-4">
      <p className="text-right">
        <span className="text-xl"> <b> EDUCATION </b></span>
      </p>

      <hr className="border-white" />

      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br/>
        <br/>

        <b> ENTER YOUR DEGREE NAME </b>
        Corporis aperiam exercitationem quasi explicabo culpa, doloremque dolorum et mollitia nulla!
        <br/>

        <b> ENTER YOUR DEGREE NAME </b>

        Corporis aperiam exercitationem quasi explicabo culpa, doloremque dolorum et mollitia nulla!
        <br/>
      </p>
    </div>




</div>
                

                <div className="col-start-4 col-end-12">
                    <h2 className="text-xl text-blue-500">Services</h2>
                    <ul className="list-disc list-inside">
                        <li>Serviceci est un exemple de layout avec deux colonnes inégales, en utilisant la propriété CSS
                            grid-template-columns avec Tailwind CSSeci est un exemple de layout avec deux colonnes inégales, en utilisant la propriété CSS
                            grid-template-columns avec Tailwind CSSe 1</li>
                        <li>Service 2</li>
                        <li>Service 3</li>
                    </ul>
                </div>
            </main>



        
    );
}
