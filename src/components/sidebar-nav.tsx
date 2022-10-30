import { signOut } from "firebase/auth";
import { motion } from "framer-motion";
import { BiLogOut } from "react-icons/bi";
import {
  MdLocalDining,
  MdShoppingCart,
  MdSpaceDashboard,
} from "react-icons/md";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

export interface NavItem {
  title: string;
  icon: any;
  path: string;
}

export const sidebarItem: NavItem[] = [
  {
    title: "Dashboard",
    icon: <MdSpaceDashboard />,
    path: "/",
  },
  {
    title: "Orders",
    icon: <MdShoppingCart />,
    path: "/orders",
  },
  {
    title: "Menus",
    icon: <MdLocalDining />,
    path: "/menus",
  },
];

const SidebarNav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const navLinkClass =
    "flex items-center font-medium gap-4 px-8 py-3 rounded-lg ";

  const logout = (e: any) => {
    e.preventDefault();
    try {
      signOut(auth);
      navigate("/login");
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return (
    <>
      <ul className="flex flex-col h-full px-[5.5rem] lg:pt-[8rem] lg:pb-20 pb-[10rem] pt-5">
        {sidebarItem.map((item, index) => (
          <motion.li
            key={index}
            className="mb-2 text-[#5f6368]"
            whileTap={{ scale: 0.9 }}
          >
            <NavLink
              to={item.path}
              className={
                navLinkClass +
                (pathname === item.path
                  ? " bg-[#111827] rounded-xl text-white"
                  : " hover:bg-[#F3F4F6] hover:text-[black]")
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-base">{item.title}</span>
            </NavLink>
          </motion.li>
        ))}
        <li className="last:mt-auto">
          <button className={navLinkClass + ""} onClick={logout}>
            <span className="text-xl">
              <BiLogOut />
            </span>
            <span className="text-base">Logout</span>
          </button>
        </li>
      </ul>
    </>
  );
};
export default SidebarNav;
