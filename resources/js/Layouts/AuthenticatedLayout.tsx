import { useState, PropsWithChildren, ReactNode } from 'react';
import { Link } from '@inertiajs/react';
import { User } from '@/types';
import { Toaster } from "@/Components/ui/toaster";
import { Briefcase, Folder, FileText, Eye, Menu, X, Home, User as UserIcon } from 'lucide-react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

export default function Authenticated({ user, header, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleNavigationDropdown = () => setShowingNavigationDropdown(prevState => !prevState);
    const toggleSidebar = () => setIsSidebarOpen(prevState => !prevState);

    // @ts-ignore
    // @ts-ignore
    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">

                        <div className="flex items-center">
                            <h1 className="font-bold text-indigo-600 text-2xl">JOB PORTAL</h1>
                        </div>

                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                            {user.UserType === 1 && (
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    ADMIN PART
                                </NavLink>
                            )}
                            <NavLink href={route('cv-infos.index')} active={route().current('cv-infos.index')}>
                                CV
                            </NavLink>
                            <NavLink href='#' active={route().current('index')}>
                               Job Anounce(coming)
                            </NavLink>
                            <NavLink href={route('sponsorship.index')} active={route().current('sponsorship.index')}>
                                sponsorship
                            </NavLink>
                            <NavLink href={route('career-advisor.index')} active={route().current('career-advisor.index')}>
                                {/*<Briefcase className="w-5 h-5 mr-2" />*/}
                                Career Advisor
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
                            <div className="font-medium text-base text-gray-800">
                                {user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
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

            <div className="flex">
                {/*@ts-ignore*/}
                {['cv-infos.show', 'cv-infos.index','userCvModels.index'].includes(route().current()) && (
                    <aside className={`${isSidebarOpen ? 'block' : 'hidden'} md:block w-64 bg-white shadow-lg`}>
                        <ul className="space-y-1 py-4">
                            <Link href={route('cv-infos.index')}>
                                <li className={`flex items-center space-x-2 p-3 rounded-md transition-colors duration-200 ${
                                    route().current('cv-infos.index') ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-indigo-50 text-gray-700'
                                }`}>
                                    <Folder className="h-5 w-5 text-indigo-500" />
                                    <span>Mon CV</span>
                                </li>
                            </Link>
                            <Link href={route('userCvModels.index')}>
                                <li className={`flex items-center space-x-2 p-3 rounded-md transition-colors duration-200 ${
                                    route().current('userCvModels.index') ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-indigo-50 text-gray-700'
                                }`}>
                                    <FileText className="h-5 w-5 text-indigo-500" />
                                    <span>Mes designs</span>
                                </li>
                            </Link>
                            <Link href={'/cv-infos/show'}>
                                <li className={`flex items-center space-x-2 p-3 rounded-md transition-colors duration-200 ${
                                    route().current('cv-infos.show') ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-indigo-50 text-gray-700'
                                }`}>
                                    <Eye className="h-5 w-5 text-indigo-500" />
                                    <span>Preview/Export</span>
                                </li>
                            </Link>
                            <Link href={'/cv-infos/show'}>
                                <li className={`flex items-center space-x-2 p-3 rounded-md transition-colors duration-200 ${
                                    route().current('cv-infos.show') ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-indigo-50 text-gray-700'
                                }`}>
                                    <Briefcase className="h-5 w-5 text-indigo-500" />
                                    <span>Portfolio</span>
                                </li>
                            </Link>
                        </ul>
                    </aside>
                )}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
            <Toaster />
        </div>
    );
}
