import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {

    return (
        <>
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                    <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
                    <div className="absolute top-60 right-20 w-48 h-48 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
                    <div className="absolute bottom-40 left-1/4 w-32 h-32 bg-gradient-to-br from-green-200 to-blue-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
                </div>

                {/* Navigation */}
                <div className="relative">
                    <Nav />
                </div>
                
                {/* Main Content */}
                <main className="flex-grow mx-auto max-w-6xl px-8 py-16 relative">
                    <div className="animate-fade-in">
                        <Outlet />
                    </div>
                </main>
                
                {/* Footer */}
                <div className="relative">
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default PublicLayout;