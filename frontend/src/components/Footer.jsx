import React from "react";

const Footer = () => {
    return (
        <footer className="w-full bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 backdrop-blur-sm border-t border-white/20 shadow-inner text-center py-4">
            <p className="text-sm md:text-base">
                Copyright © {new Date().getFullYear()} – All rights reserved by{" "}
                <strong className="bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent">Lutfi Cahya Nugraha</strong> 🚀
            </p>
        </footer>
    );
};

export default Footer;