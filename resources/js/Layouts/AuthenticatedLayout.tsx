import { useState, PropsWithChildren, ReactNode } from 'react';
import { Link } from '@inertiajs/react';
import { User } from '@/types';
import { Toaster } from "@/Components/ui/toaster";
import { Folder, FileText, Eye, Menu, X } from 'lucide-react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

export default function Authenticated({ user, header, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleNavigationDropdown = () => setShowingNavigationDropdown(prevState => !prevState);
    const toggleSidebar = () => setIsSidebarOpen(prevState => !prevState);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-violet-900 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="font-bold text-white">JOB PORTAL</h1>
                        </div>

                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                            <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                ADMIN PART
                            </NavLink>
                            <NavLink href={route('cv-infos.index')} active={route().current('cv-infos.index')}>
                                CV
                            </NavLink>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}
                                                <Menu className="ms-2 -me-0.5 h-4 w-4" />
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={toggleNavigationDropdown}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                {showingNavigationDropdown ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`${showingNavigationDropdown ? 'block' : 'hidden'} sm:hidden`}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Home
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-white">
                                {user.name}
                            </div>
                            <div className="font-medium text-sm text-white">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink className="text-white" href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink className="text-white" method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <div className="w-full px-4 py-2 text-white flex">
                <aside className={`${isSidebarOpen ? 'block' : 'hidden'} md:block md:w-64 text-black`}>
                    <ul className="space-y-2">
                        <Link href={route('cv-infos.index')}>
                            <li className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 transition-colors duration-200">
                                <Folder className="h-6 w-6 text-gray-500" />
                                <span className="text-gray-700">Mon CV</span>
                            </li>
                        </Link>

                        <Link href={route('cv-infos.index')}>
                            <li className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 transition-colors duration-200">
                                <FileText className="h-6 w-6 text-gray-500" />
                                <span className="text-gray-700">Mes designs</span>
                            </li>
                        </Link>

                        <Link href={'/cv-infos/show'}>
                            <li className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 transition-colors duration-200">
                                <Eye className="h-6 w-6 text-gray-500" />
                                <span className="text-gray-700">Preview/Export</span>
                            </li>
                        </Link>
                    </ul>
                </aside>
                <main className="w-full p-4 text-black">
                    {children}
                </main>
                <Toaster />
            </div>
        </div>
    );
}
