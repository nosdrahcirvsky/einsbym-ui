export default function Footer() {
    const currentYear = new Date().getFullYear();
    const appVersion = process.env.NEXT_PUBLIC_APP_VERSION || ""

    return (
        <footer className="bg-gray-900 mt-5 mb-5 lg:mb-0 rounded-lg">
            <div className="w-full mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src="/icon.svg" className="h-8" alt="Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                            Einsbym
                        </span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
                        <li>
                            <a href="#" className="hover:text-[#cc00ff] me-4 md:me-6">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-[#cc00ff] me-4 md:me-6">
                                Privacy Policy
                            </a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <span className="block text-sm text-gray-500 text-center">
                    © {currentYear}{' '}
                    <a href="/" className="hover:text-[#cc00ff]">
                        Einsbym
                    </a>
                    . All Rights Reserved. Version: {appVersion}
                </span>
            </div>
        </footer>
    );
}
