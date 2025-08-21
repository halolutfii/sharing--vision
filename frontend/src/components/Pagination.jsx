import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Pagination = ({ pagination }) => {
    const { page, totalPage } = pagination;
    const { search, pathname } = useLocation();
    const navigate = useNavigate();

    const handlePageChange = (number) => {
        const searchParams = new URLSearchParams(search);
        searchParams.set("page", number);
        navigate(`${pathname}?${searchParams.toString()}`);
    };

    const pages = Array.from({ length: totalPage }, (_, index) => index + 1);

    return (
        <div className="w-full overflow-x-auto">
            <div className="join flex flex-wrap justify-center overflow-x-auto scroll-smooth mt-4 gap-1">
                {pages.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`btn btn-sm bg-base-400 border-none join-item ${
                            pageNumber === page ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white " : ""
                        }`}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Pagination;