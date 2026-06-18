import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import Header from "../common/layout/Header";
import { useDispatch } from "react-redux";
import { addAuthUser } from "../slices/user";

function ProtectedRoute() {
  const location = useLocation();
  const [status, setStatus] = useState("checking");
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    async function checkAuthorization() {
      try {
        const res = await axiosInstance.get("/auth/check-user-auth", {
          withCredentials: true,
        });

        if (res.data.data) {
          dispatch(addAuthUser(res.data.data));
        }

        if (isMounted) {
          setStatus("authorized");
        }
      } catch (err) {
        if (isMounted) {
          setStatus("unauthorized");
        }
      }
    }

    checkAuthorization();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (status !== "authorized") return;

    const currentPath = `${location.pathname}${location.search || ""}${location.hash || ""}`;
    if (currentPath && currentPath !== "/login") {
      sessionStorage.setItem("lastVisited", currentPath);
    }
  }, [location, status]);

  if (status === "checking") {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <p className="text-sm uppercase tracking-[0.28em] text-onsurface/60">
          Loading
        </p>
      </main>
    );
  }

  if (status === "unauthorized") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default ProtectedRoute;
