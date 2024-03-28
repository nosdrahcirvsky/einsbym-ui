import { UserType } from '@/types/types';
import { AuthService } from '@/auth/auth.service';
import { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import NavbarUserPopover from './navbar-user-popover';

const menuItems = [
    { id: 1, label: 'Gallery', slug: '/' },
    { id: 2, label: 'Videos', slug: '/videos' },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isSidebarActive, setIsSidebarActive] = useState<boolean>(false);
    const [user, setUser] = useState<UserType | null>();

    const handleMenu = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
            return;
        }
        setIsMenuOpen(true);
    };

    useEffect(() => {
        new AuthService().getUser(setUser);
    }, []);

    return (
        <>
            <nav className="fixed inset-x-0 top-0 w-full rounded-lg z-10">
                <div className="absolute inset-0 backdrop-blur-md bg-black/30"></div>

                <div className="px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button
                                type="button"
                                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-[#cc00ff1e] hover:text-[#cc00ff] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#cc00ff]"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                                onClick={() => setIsSidebarActive(true)}
                            >
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className="block h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                </svg>
                                <svg
                                    className="hidden h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <a href="/">
                                    <img alt="Navbar Icon" className="h-8 w-auto" src="/icon.svg" />
                                </a>
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {menuItems.map((item) => (
                                        <a
                                            key={item.id}
                                            href={item.slug}
                                            className="hover:bg-[#cc00ff1e] text-[#cc00ff] rounded-md px-3 py-2 text-sm font-medium"
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button
                                type="button"
                                className="relative rounded-full bg-[#cc00ff1e] p-1 text-[#cc00ff] focus:outline-none focus:ring-2 focus:ring-[#cc00ff] focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <span className="absolute -inset-1.5"></span>
                                <span className="sr-only">View notifications</span>
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                                    />
                                </svg>
                            </button>

                            <NavbarUserPopover isMenuOpen={isMenuOpen} handleMenu={handleMenu} user={user || null} />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <Sidebar isSidebarActive={isSidebarActive} setIsSidebarActive={setIsSidebarActive} />
        </>
    );
}
