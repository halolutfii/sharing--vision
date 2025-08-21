import { useState } from "react";
import { useNavigate } from "react-router-dom";
import customAPI from "../api";
import { toast } from "react-toastify";

const CreateView = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        content: "",
        category: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (status) => {
        const { title, content, category } = form;

        if (!title || !content || !category) {
        toast.error("All fields are required!");
        return;
        }

        setLoading(true);
        try {
        await customAPI.post("/article/", {
            Title: title,
            Content: content,
            Category: category,
            Status: status, // "publish" atau "draft"
        });

        toast.success(
            `Article ${status === "publish" ? "published" : "saved as draft"}!`
        );
        navigate("/"); // kembali ke halaman HomeView
        } catch (err) {
        console.error(err);
        toast.error("Failed to create article!");
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Add New Article</h2>

        {/* Title */}
        <div className="form-control mb-4">
            <label className="label font-medium">Title</label>
            <input
            type="text"
            name="title"
            placeholder="Enter title"
            className="input input-bordered"
            value={form.title}
            onChange={handleChange}
            />
        </div>

        {/* Content */}
        <div className="form-control mb-4">
            <label className="label font-medium">Content</label>
            <textarea
            name="content"
            placeholder="Enter content"
            className="textarea textarea-bordered h-32"
            value={form.content}
            onChange={handleChange}
            />
        </div>

        {/* Category */}
        <div className="form-control mb-4">
            <label className="label font-medium">Category</label>
            <input
            type="text"
            name="category"
            placeholder="Enter category"
            className="input input-bordered"
            value={form.category}
            onChange={handleChange}
            />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
            <button
            className={`btn btn-primary ${loading ? "loading" : ""}`}
            onClick={() => handleSubmit("publish")}
            disabled={loading}
            >
            Publish
            </button>
            <button
            className={`btn btn-secondary ${loading ? "loading" : ""}`}
            onClick={() => handleSubmit("draft")}
            disabled={loading}
            >
            Draft
            </button>
        </div>
        </div>
    );
};

export default CreateView;