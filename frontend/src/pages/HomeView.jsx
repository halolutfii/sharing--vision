import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaPencilAlt, FaPlus } from "react-icons/fa";
import customAPI from "../api";
import { toast } from "react-toastify";

const HomeView = () => {
    const tabs = ["Published", "Drafts", "Trashed"];
    const [activeTab, setActiveTab] = useState("Published");
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(0);
    const limit = 5; // tampilkan 5 per halaman
    const navigate = useNavigate();

    useEffect(() => {
        fetchArticles();
    }, [activeTab, page]);

    const fetchArticles = async () => {
        try {
        const res = await customAPI.get("/articles/100/0"); // ambil semua
        const filtered = res.data.filter((a) => {
            if (activeTab === "Published") return a.Status === "publish";
            if (activeTab === "Drafts") return a.Status === "draft";
            if (activeTab === "Trashed") return a.Status === "thrash"; // typo "thrash"
            return false;
        });

        // pagination FE
        const start = page * limit;
        const paginated = filtered.slice(start, start + limit);
        setArticles(paginated);
        } catch (err) {
        console.error(err);
        toast.error("Failed to fetch articles");
        }
    };

    const handleTrash = async (id) => {
        try {
        await customAPI.post(`/article/${id}/trash`, { Status: "thrash" });
        toast.success("Article moved to trash!");
        fetchArticles();
        } catch (err) {
        console.error(err);
        toast.error("Failed to move article!");
        }
    };

    return (
        <div className="p-6">
        {/* Tabs + Add Button */}
        <div className="flex items-center justify-between mb-4">
            <div className="tabs">
            {tabs.map((tab) => (
                <button
                key={tab}
                className={`tab tab-bordered ${
                    activeTab === tab ? "tab-active" : ""
                }`}
                onClick={() => {
                    setActiveTab(tab);
                    setPage(0); // reset page tiap ganti tab
                }}
                >
                {tab}
                </button>
            ))}
            </div>

            {/* Add Article Button */}
            <button
            onClick={() => navigate("/create")}
            className="btn btn-primary flex items-center gap-2"
            >
            <FaPlus /> Add Article
            </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
            <table className="table table-zebra w-full">
            <thead className="bg-base-200">
                <tr>
                <th>Title</th>
                <th>Category</th>
                <th className="text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                {articles.length > 0 ? (
                articles.map((article) => (
                    <tr key={article.Id}>
                    <td>{article.Title}</td>
                    <td>{article.Category}</td>
                    <td className="flex gap-3 justify-center">
                        <Link to={`/update/${article.Id}`}>
                        <FaPencilAlt className="text-info cursor-pointer" />
                        </Link>
                        <FaTrash
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleTrash(article.Id)}
                        />
                    </td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500">
                    No articles found.
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between mt-6">
            <button
            className="btn btn-outline"
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            >
            Prev
            </button>
            <button
            className="btn btn-outline"
            onClick={() => setPage((p) => p + 1)}
            disabled={articles.length < limit}
            >
            Next
            </button>
        </div>
        </div>
    );
};

export default HomeView;
