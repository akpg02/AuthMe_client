import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";

import { onAuthStateChangedListener } from "./utils/firebase/firebase.utils";
import { fetchUser } from "./store/auth/auth.action";

import PrimaryNavbar from "./routes/navigation/primary-navbar/primary-navbar.component";
import Home from "./routes/home/home.component";
import Auth from "./routes/auth/auth.component";
import User from "./routes/user/user.component";
import Admin from "./routes/admin/admin.component";
import PageNotFound from "./routes/page-not-found/page-not-found.component";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        const { token } = await user.getIdTokenResult();
        await dispatch(fetchUser(token));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<PrimaryNavbar />}>
          <Route index element={<Home />} />
          <Route path="auth/*" element={<Auth />} />
          <Route path="user/*" element={<User />} />
          <Route path="admin/*" element={<Admin />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
