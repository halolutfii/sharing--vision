import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultValue = {
    articles: [],
}

const getArticlesFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('articles')) || defaultValue;
}

const articleSlice = createSlice({
    name: 'article',
    initialState: getArticlesFromLocalStorage(),
    reducers: {
        addArticle: (state, action) => {
            const { article } = action.payload;

            // cek apakah artikel sudah ada berdasarkan id
            const item = state.articles.find(i => i.id === article.id);
            if (item) {
                toast.info('Article already exists!');
            } else {
                state.articles.push(article);
                toast.success('Article added successfully!');
            }

            localStorage.setItem('articles', JSON.stringify(state));
        },
        updateArticle: (state, action) => {
            const { id, updatedArticle } = action.payload;
            const index = state.articles.findIndex(item => item.id === id);

            if (index !== -1) {
                state.articles[index] = { ...state.articles[index], ...updatedArticle };
                localStorage.setItem('articles', JSON.stringify(state));
                toast.info('Article updated successfully!');
            }
        },
        removeArticle: (state, action) => {
            const { id } = action.payload;
            state.articles = state.articles.filter(item => item.id !== id);
            localStorage.setItem('articles', JSON.stringify(state));
            toast.success('Article deleted successfully!');
        },
        clearArticles: (state) => {
            localStorage.setItem('articles', JSON.stringify(defaultValue));
            return defaultValue;
        }
    }
});

export const { addArticle, updateArticle, removeArticle, clearArticles } = articleSlice.actions;
export default articleSlice.reducer;