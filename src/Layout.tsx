import SidebarNav from "@/components/sidebar-nav";
import { useState } from "react";
import { CgClose, CgMenuLeftAlt } from "react-icons/cg";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  open: boolean;
  setOpen: any;
}

const Shell: React.FC<Props> = ({ children, open, setOpen }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <></>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  }

  return (

    <>
      {/* hamburger menu */}
      <div className="lg:hidden fixed bg-white w-full p-5 z-10">
        <button className="text-3xl" onClick={() => setOpen(true)}>
          <CgMenuLeftAlt />
        </button>
      </div>
      {/* create a sidebar */}
      <motion.div
        animate={open ? "open" : "closed"}

        className={`lg:w-96 w-full fixed lg:left-0 ${
          open ? "left-0" : "left-full"
        } h-screen bg-white border-r-[1.5px] border-[#D1D5DB] z-10`}
      >
        {/* close menu button */}
        <div className="right-0 lg:hidden p-5">
          <button className="text-2xl" onClick={() => setOpen(false)}>
            <CgClose />
          </button>
        </div>

        {/* sidebar content */}
        <SidebarNav />
      </motion.div>

      {/* create a main content */}
      <div
        className={`bg-white lg:ml-96 min-h-screen lg:pb-0 md:pb-0 lg:py-[3rem] py-20 lg:px-20  px-6`}
      >
        {children}
      </div>
    </>
  );
};

const Layout = () => {
  const [open, setOpen] = useState(false);
  return (
    <Shell open={open} setOpen={setOpen}>
      <Outlet context={[open, setOpen]} />
    </Shell>
  );
};
export default Layout;
