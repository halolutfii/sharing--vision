import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayouts";
import HomeView from "./pages/HomeView";
import ErrorView from "./pages/ErrorView";
import CreateView from "./pages/Create";
import UpdateView from "./pages/Update";
import PreviewView from "./pages/Preview";
import DetailPreviewView from "./pages/DetailPreview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <ErrorView />,
    children:[
      {
        index: true,
        element: <HomeView />
      },
      {
        path: "create",
        element: <CreateView />,
      },
      {
        path: "update/:id",
        element: <UpdateView />,
      },
      {
        path: "preview",
        element: <PreviewView />,
      },
      {
        path: "preview/:id",
        element: <DetailPreviewView />,
      },
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;