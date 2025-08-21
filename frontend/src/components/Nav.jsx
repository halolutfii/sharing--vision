import React, { useState, useEffect } from "react";
import NavList from "./NavList";
import { NavLink } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";

const Nav = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        // nanti di buat fix sticky top ya
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            isScrolled 
                ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20' 
                : 'bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 backdrop-blur-sm'
        }`}>
            <div className="navbar mx-auto max-w-7xl px-8 py-2">
                <div className="navbar-start">
                    {/* Desktop Logo */}
                    <NavLink 
                        to={'/'} 
                        className='hidden lg:flex text-3xl items-center group'
                    >
                        <div className="relative">
                            <h1 className={`font-bold text-2xl xl:text-3xl whitespace-nowrap transition-all duration-300 ${
                                isScrolled 
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent' 
                                    : 'bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent'
                            }`}>
                                Article
                            </h1>
                            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
                        </div>
                    </NavLink>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button 
                            onClick={toggleMobileMenu}
                            className={`p-2 rounded-lg transition-all duration-300 ${
                                isScrolled 
                                    ? 'text-gray-700 hover:bg-gray-100' 
                                    : 'text-black hover:bg-white/10'
                            }`}
                        >
                            {isMobileMenuOpen ? (
                                <FaBarsStaggered className="h-6 w-6" />
                            ) : (
                                <FaBarsStaggered className="h-6 w-6" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Logo */}
                    <NavLink 
                        to={'/'} 
                        className='lg:hidden ml-4'
                    >
                        <h1 className={`font-bold text-xl whitespace-nowrap transition-all duration-300 ${
                            isScrolled 
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent' 
                                : 'bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent'
                        }`}>
                            Article
                        </h1>
                    </NavLink>
                </div>

                <div className="navbar-end">
                    {/* Desktop Menu */}
                    <div className="hidden lg:flex">
                        <ul className="menu menu-horizontal space-x-2">
                            <NavList isScrolled={isScrolled} />
                        </ul>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
                isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
                <div className="bg-white/95 backdrop-blur-md border-t border-white/20 shadow-lg">
                    <ul className="menu p-4 space-y-2">
                        <NavList isScrolled={true} isMobile={true} onItemClick={() => setIsMobileMenuOpen(false)} />
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav;