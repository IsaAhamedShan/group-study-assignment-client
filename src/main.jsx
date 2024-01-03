import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import Home from "./pages/Home.jsx";
import Main from "./pages/Main.jsx";
import Register from "./components/Authentication/Register.jsx";
import SignIn from "./components/Authentication/SignIn.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import UserList from "./components/User/UserList.jsx";
import AssignmentForm from "./pages/AssignmentForm.jsx";
import AllAssignment from "./pages/AllAssignment.jsx";
import AssignmentDetails from "./pages/AssignmentDetails.jsx";
import AssignmentCompleteList from "./components/Assignment/AssignmentCompleteList.jsx";
import SubmittedAssignment from "../src/pages/SubmittedAssignments.jsx"
import MyLifeTimeSubmittedList from "./components/Assignment/MyLifeTimeSubmittedList.jsx";
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>,
      },
      {
        path:"/allUsersList",
        element:<UserList></UserList>
      },
      {
        path:"/assignmentForm",
        element:<AssignmentForm></AssignmentForm>
      },
      {
        path:"/allAssignment",
        element:<AllAssignment></AllAssignment>
      },
      {
        path:"/assignmentDetails/:id",
        element:<AssignmentDetails></AssignmentDetails>
      },
      {
        path:"/assignmentCompleteList",
        element:<AssignmentCompleteList></AssignmentCompleteList>
      },
      {
        path:"/submittedAssignment/:id",
        element:<SubmittedAssignment></SubmittedAssignment>
      },
      {
        path:"/myLifeTimeSubmission/:id",
        element:<MyLifeTimeSubmittedList></MyLifeTimeSubmittedList>
      }

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <div>
      <AuthProvider>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </AuthProvider>
    </div>
  </QueryClientProvider>
);
