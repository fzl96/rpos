import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db, storage } from "../config/firebase";
// import necessary firebase storage modules
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export interface MenuProps {
  name: string;
  price: number;
  description: string;
  file: any;
  type: string;
}
// create interface for menu context
interface MenuContextType {
  menu: any;
  loading: boolean;
  addLoading: boolean;
  addMenu: (menu: MenuProps) => void;
}

export interface MenuType {
  name: string;
  price: number;
  description: string;
  image: string;
  type: string;
}

// create menu context
const MenuContext = createContext<MenuContextType>({
  menu: null,
  loading: true,
  addLoading: false,
  addMenu: async () => {},
});

// create type for children
type Props = {
  children: React.ReactNode;
};

export const MenuProvider = ({ children }: Props) => {
  // create state for menu
  const [menu, setMenu] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [addLoading, setAddLoading] = useState(false);

  // create a function that will add menu to firebase
  const addMenu = (menu: MenuProps) => {
    // return promise
    return new Promise((resolve, reject) => {
      try {
        // set add loading to true
        setAddLoading(true);
        // create a reference to the storage location
        const storageRef = ref(storage, `menu/${menu.file.name}`);
        // upload the file to the storage location
        const uploadTask = uploadBytesResumable(storageRef, menu.file);
        // listen to the upload task
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // get the progress of the upload
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            // catch any errors
            console.log(error);
            setAddLoading(false);
            reject(error);
          },
          () => {
            // get the download url
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              // add the menu to the database
              addDoc(collection(db, "menu"), {
                name: menu.name,
                price: menu.price,
                description: menu.description,
                image: downloadURL,
                type: menu.type,
              });
              // set add loading to false
              setAddLoading(false);
              resolve(true);
            });
          }
        );
      } catch (error) {
        // catch any errors
        console.log(error);
        setAddLoading(false);
        reject(error);
      }
    });
  };

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
    <MenuContext.Provider value={{ menu, loading, addMenu, addLoading }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
