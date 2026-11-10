import { Navigate, createBrowserRouter, type RouteObject } from "react-router";

import { RootLayout, RouteError } from "@/pages/RootLayout";
import { Landing } from "@/pages/Landing";
import { AppShell } from "@/pages/AppShell";
import { AuthPage } from "@/pages/AuthPage";
import { NotFound } from "@/pages/NotFound";

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/app", element: <AppShell /> },
      { path: "/sign-in", element: <AuthPage mode="signin" /> },
      { path: "/sign-up", element: <AuthPage mode="signup" /> },
      // Old combined auth URL — keep existing links working.
      { path: "/auth", element: <Navigate to="/sign-in" replace /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
