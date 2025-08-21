import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import customAPI from "../api";
import { toast } from "react-toastify";

const UpdateView = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("draft");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchArticle();
    }, [id]);

    const fetchArticle = async () => {
        try {
        const res = await customAPI.get(`/article/${id}`);
        const data = res.data;
        setTitle(data.Title || "");
        setContent(data.Content || "");
        setCategory(data.Category || "");
        setStatus(data.Status || "draft");
        } catch (err) {
        console.error(err);
        toast.error("Failed to fetch article");
        }
    };

    const handleUpdate = async (newStatus) => {
        if (!title || !content || !category) {
        toast.error("All fields are required!");
        return;
        }

        setLoading(true);
        try {
        await customAPI.put(`/article/${id}`, {
            Title: title,
            Content: content,
            Category: category,
            Status: newStatus,
        });

        toast.success(`Article updated as ${newStatus}`);
        navigate("/");
        } catch (err) {
        console.error(err);
        toast.error("Failed to update article");
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Update Article</h2>

        <div className="form-control mb-4">
            <label className="label">Title</label>
            <input
            type="text"
            placeholder="Enter title"
            className="input input-bordered"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
        </div>

        <div className="form-control mb-4">
            <label className="label">Content</label>
            <textarea
            placeholder="Enter content"
            className="textarea textarea-bordered h-32"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            />
        </div>

        <div className="form-control mb-4">
            <label className="label">Category</label>
            <input
            type="text"
            placeholder="Enter category"
            className="input input-bordered"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            />
        </div>

        <div className="flex gap-4 mt-6">
            <button
            className={`btn btn-primary ${loading ? "loading" : ""}`}
            onClick={() => handleUpdate("publish")}
            disabled={loading}
            >
            Publish
            </button>
            <button
            className={`btn btn-secondary ${loading ? "loading" : ""}`}
            onClick={() => handleUpdate("draft")}
            disabled={loading}
            >
            Draft
            </button>
        </div>
        </div>
    );
};

export default UpdateView;
