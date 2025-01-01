import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Browse from "./components/Browse";
import "./App.css";

const AdminLogin = lazy(() => import("./components/Admin/AdminLogin"));
const AdminHomePage = lazy(() => import("./components/Admin/AdminHomePage"));
const AdminAddAnnouncement = lazy(() =>
  import("./components/Admin/AdminAddAnouncement")
);
const AdminViewComplaints = lazy(() =>
  import("./components/Admin/AdminViewComplaints")
);
const AdminAddActivity = lazy(() =>
  import("./components/Admin/AdminAddActivity")
);
const AdminAddScheme = lazy(() => import("./components/Admin/AdminAddScheme"));
const AdminViewUsers = lazy(() => import("./components/Admin/AdminViewUsers"));
const UserLogin = lazy(() => import("./components/User/UserLogin"));
const UserHomePage = lazy(() => import("./components/User/UserHomePage"));
const UserRegister = lazy(() => import("./components/User/UserReg"));
const UserVillageAnnouncements = lazy(() =>
  import("./components/User/UserVillageAnnouncements")
);
const UserComplaint = lazy(() => import("./components/User/UserComplaint"));
const UserSchemes = lazy(() => import("./components/User/UserSchemes"));
const UserActivities = lazy(() => import("./components/User/UserActivities"));

const Applayout = () => {
  return (
    <div>
      <Browse />
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    Element: <Applayout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense>
            <Browse />
          </Suspense>
        ),
      },
      {
        path: "/Adminlogin/",
        element: (
          <Suspense>
            <AdminLogin />
          </Suspense>
        ),
      },
      {
        path: "/userLogin/",
        element: (
          <Suspense>
            <UserLogin />
          </Suspense>
        ),
      },
      {
        path: "/admin/",
        element: (
          <Suspense>
            <AdminHomePage />
          </Suspense>
        ),
      },
      {
        path: "/userRegister",
        element: (
          <Suspense>
            <UserRegister />
          </Suspense>
        ),
      },
      {
        path: "admin/AddActivity",
        element: (
          <Suspense>
            <AdminAddActivity />
          </Suspense>
        ),
      },
      {
        path: "admin/AddAnnouncement",
        element: (
          <Suspense>
            <AdminAddAnnouncement />
          </Suspense>
        ),
      },
      {
        path: "admin/AddScheme",
        element: (
          <Suspense>
            <AdminAddScheme />
          </Suspense>
        ),
      },
      {
        path: "admin/ViewComplaints",
        element: (
          <Suspense>
            <AdminViewComplaints />
          </Suspense>
        ),
      },
      {
        path: "admin/ViewUsers",
        element: (
          <Suspense>
            <AdminViewUsers />
          </Suspense>
        ),
      },
      {
        path: "/user/",
        element: (
          <Suspense>
            <UserHomePage />
          </Suspense>
        ),
      },
      {
        path: "/userVillageAnnouncements/",
        element: (
          <Suspense>
            <UserVillageAnnouncements />
          </Suspense>
        ),
      },
      {
        path: "/complaints/",
        element: (
          <Suspense>
            <UserComplaint />
          </Suspense>
        ),
      },
      {
        path: "/villageActivity/",
        element: (
          <Suspense>
            <UserActivities />
          </Suspense>
        ),
      },
      {
        path: "/villageSchemes/",
        element: (
          <Suspense>
            <UserSchemes />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
