// src/views/PreviewView.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import customAPI from "../api";

const PreviewView = () => {
    const [allArticles, setAllArticles] = useState([]);
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(0);
    const limit = 5;

    const fetchArticles = async () => {
        try {
        const res = await customAPI.get("/articles/100/0");
        // filter hanya publish
        const published = res.data.filter((a) => a.Status === "publish");
        setAllArticles(published);

        // pagination awal
        const start = 0;
        const paginated = published.slice(start, start + limit);
        setArticles(paginated);
        } catch (err) {
        console.error("Failed to fetch articles", err);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        const start = newPage * limit;
        const paginated = allArticles.slice(start, start + limit);
        setArticles(paginated);
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    return (
        <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Blog Preview</h1>

        {articles.length === 0 ? (
            <p className="text-gray-500">No published articles found.</p>
        ) : (
            articles.map((a) => (
            <div key={a.Id} className="border-b py-4">
                <h2 className="text-xl font-semibold">{a.Title}</h2>
                <p className="text-gray-500 text-sm mb-2">{a.Category}</p>
                <p className="mt-2 text-gray-700 line-clamp-3">{a.Content}</p>
                <Link
                to={`/preview/${a.Id}`}
                className="text-blue-500 hover:underline"
                >
                Read more →
                </Link>
            </div>
            ))
        )}

        {/* Pagination */}
        {allArticles.length > limit && (
            <div className="flex items-center justify-between mt-6">
            <button
                className="btn btn-outline"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 0}
            >
                Prev
            </button>

            <span className="text-gray-600">
                Page {page + 1} of {Math.ceil(allArticles.length / limit)}
            </span>

            <button
                className="btn btn-outline"
                onClick={() => handlePageChange(page + 1)}
                disabled={(page + 1) * limit >= allArticles.length}
            >
                Next
            </button>
            </div>
        )}
        </div>
    );
    };

export default PreviewView;
