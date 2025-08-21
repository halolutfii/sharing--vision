import React from "react";
import { Link, useRouteError } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayouts";

const ErrorView = () => {
    const error = useRouteError();

    if (error.status === 404) {
        return (
            <PublicLayout>
                <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 mt-16">
                    <div className="text-center">
                        <img src="./images/crashed-error.svg" alt="404 Error" className="w-64 md:w-72 mx-auto animate-fade-in drop-shadow-xl"/>
                        <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-lg animate-pulse" style={{animationDelay: '0.1s'}}>404</h1>
                        <p className="text-base md:text-lg text-black dark:text-black">Sorry, the page you're looking for was not found.</p>
                        <div className="mt-2 animate-bounce" style={{animationDelay: '0.1s'}}>
                            <Link to='/' className="inline-block mt-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 shadow-lg">Back to home</Link>
                        </div>
                    </div>
                </div>
            </PublicLayout>
        )
    } else if (error.status === 500) {
        return (
            <main className="grid min-h-[100vh] place-items-center px-8">
                <div className="text-center">
                    <h1 className="text-9xl font-bold text-primary">500</h1>
                    <p className="mt-6 text-lg leading-7">Sorry, there is a server problem. Please come back in 15 minutes!</p>
                </div>
            </main>
        )
    }
}

export default ErrorView;