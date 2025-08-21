import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaEye } from "react-icons/fa";

const links = [
    { id: 1, url: '/', text: 'all posts', icon: <FaHome /> }, 
    { id: 2, url: '/preview', text: 'preview', icon: <FaEye /> }, 
]

const NavList = ({ isScrolled, isMobile, onItemClick }) => {
    return (
        <>
            {links.map((link) => {
                const {id, url, text, icon} = link;

                return(
                    <li key={id}>
                        <NavLink 
                            className={({ isActive }) => `
                                group relative capitalize font-medium transition-all duration-300 rounded-lg px-4 py-2
                                ${isMobile 
                                    ? `flex items-center space-x-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 ${
                                        isActive ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600' : ''
                                    }`
                                    : isScrolled 
                                        ? `text-gray-700 hover:text-8lue-600 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 ${
                                            isActive ? 'text-black' : ''
                                        }`
                                        : `text-black hover:text-blue-800 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 ${
                                            isActive ? 'text-black' : ''
                                        }`
                                }
                            `}
                            to={url}
                            onClick={onItemClick}
                        >
                            {({ isActive }) => (
                                <>
                                    {isMobile && (
                                        <span className="text-lg">{icon}</span>
                                    )}
                                    <span className="relative">
                                        {text}
                                        {/* Desktop underline effect */}
                                        {!isMobile && (
                                            <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ${
                                                isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                            }`}></div>
                                        )}
                                    </span>
                                    {/* Active indicator for mobile */}
                                    {isMobile && isActive && (
                                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full ml-auto"></div>
                                    )}
                                </>
                            )}
                        </NavLink>
                    </li>
                )
            })}
        </>
    )
}

export default NavList;