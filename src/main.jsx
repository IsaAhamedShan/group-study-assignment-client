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
import Private from "./private/Private.jsx";
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
        element:<Private>
          <UserList></UserList>
        </Private>
      },
      {
        path:"/assignmentForm",
        element:<AssignmentForm></AssignmentForm>
      },
      {
        path:"/allAssignment",
        element:<Private>
          <AllAssignment></AllAssignment>
        </Private>
      },
      {
        path:"/assignmentDetails/:id",
        element:<Private>
          <AssignmentDetails></AssignmentDetails>
        </Private>
      },
      {
        path:"/assignmentCompleteList",
        element:<Private>
          <AssignmentCompleteList></AssignmentCompleteList>
        </Private>
      },
      {
        path:"/submittedAssignment/:id",
        element:<Private>
          <SubmittedAssignment></SubmittedAssignment>
        </Private>
      },
      {
        path:"/myLifeTimeSubmission/:id",
        element:<Private>
          <MyLifeTimeSubmittedList></MyLifeTimeSubmittedList>
        </Private>
      }

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <div className="max-w-7xl m-auto">
      <AuthProvider>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </AuthProvider>
    </div>
  </QueryClientProvider>
);
