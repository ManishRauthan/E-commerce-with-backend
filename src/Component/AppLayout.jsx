import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const AppLayout = () => {
  return (
    <>
      <Header />

      <main className="min-h-screen ">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;
