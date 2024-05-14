import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-violet-900 border-b border-gray-100" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                {/*<Link href="/">*/}
                                {/*    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />*/}
                                {/*</Link>*/}
                                <h1 className="font-bold text-white" >JOB PORTAL</h1>
                            </div>

                        </div>
                    </div>
                </div>
            </nav>
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                {/*<Link href="/">*/}
                {/*    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />*/}
                {/*</Link>*/}
                <h1 className="font-bold text-black" >JOB PORTAL</h1>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
        </div>
    );
}
