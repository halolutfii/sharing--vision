// src/views/PreviewView.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import customAPI from "../api";
import { toast } from "react-toastify";

const PreviewView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchArticle = async () => {
        try {
        const res = await customAPI.get(`/article/${id}`);
        if (res.data.Status === "publish") {
            setArticle(res.data);
        } else {
            toast.warn("This article is not published yet.");
            setArticle(null);
        }
        } catch (err) {
        console.error("Failed to fetch article", err);
        toast.error("Failed to fetch article");
        setArticle(null);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticle();
    }, [id]);

    if (loading)
        return (
        <div className="p-6 text-center">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
        );

    if (!article)
        return (
        <div className="p-6 text-center">
            <p className="mb-4">Article not found or not published.</p>
            <button className="btn btn-primary" onClick={() => navigate("/")}>
            Back to Home
            </button>
        </div>
        );

    return (
        <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{article.Title}</h1>
        <p className="text-gray-500 text-sm mb-4">
            {article.Category} •{" "}
            {new Date(article.CreatedDate).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
            })}
        </p>

        <div className="prose prose-lg max-w-none">
            {article.Content}
        </div>
        </div>
    );
};

export default PreviewView;
