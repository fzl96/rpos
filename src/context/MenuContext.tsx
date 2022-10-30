import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";

// create interface for menu context
interface MenuContextType {
  menu: any;
  loading: boolean;
}

// create menu context
const MenuContext = createContext<MenuContextType>({
  menu: null,
  loading: true,
});

// create type for children
type Props = {
  children: React.ReactNode;
};

export const MenuProvider = ({ children }: Props) => {
  // create state for menu
  const [menu, setMenu] = useState<any>();
  const [loading, setLoading] = useState(true);

  // get menu from database when load with onsnapshot
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "menu"), (snapshot) => {
      const menu: any = [];
      snapshot.forEach((doc) => {
        menu.push({ ...doc.data(), id: doc.id });
      });
      setMenu(menu);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <MenuContext.Provider value={{ menu, loading }}>{children}</MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
