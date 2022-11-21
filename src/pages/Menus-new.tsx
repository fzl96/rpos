import ListBox from "@/components/ui/listbox";
import MenuCard from "@/components/ui/menus-card";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { BsFileEarmarkImage } from "react-icons/bs";
import { FiImage } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { useMenu } from "../context/MenuContext";

const types = [{ name: "Food" }, { name: "Drink" }];

const MenusNew = () => {
  const navigate = useNavigate();
  const { addMenu, addLoading } = useMenu();
  const [selected, setSelected] = useState(types[0]);
  const [image, setImage] = useState<any>();
  const [file, setFile] = useState<any>(null);
  const [price, setPrice] = useState(0);

  const [item, setItem] = useState({
    name: "Add a name",
    price: 0,
    description: "Add a description",
    image: image,
    file: file,
    type: selected.name,
  });

  useEffect(() => {
    document.title = "POS - Add Menu";
  }, []);

  useEffect(() => {
    setItem({ ...item, price: price });
  }, [price]);

  const onDrop = useCallback((acceptedFiles: any) => {
    // const file = acceptedFiles[0];
    if (acceptedFiles[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setItem({ ...item, image: reader.result, file: acceptedFiles[0] });
      };
      reader.readAsDataURL(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await addMenu(item);
      navigate("/menus");
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
      else console.log(err);
    }
  };

  return (
    <>
      <motion.div
        className="grid md:grid-cols-2 grid-cols-1 min-h-full gap-2 mt-10"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col md:gap-5 border-r md:max-w-sm">
          <div className="flex flex-col md:max-w-xs ">
            <h1 className="text-2xl font-bold">Item Preview</h1>
            <p className="text-gray-500">
              Below is the preview of the item in the menus page.
            </p>
          </div>
          <div className="flex flex-col gap-5 ">
            <MenuCard {...item} />
            <div
              {...getRootProps()}
              className="md:max-w-xs h-40 border-2 border-dashed cursor-pointer flex flex-col items-center justify-center rounded-lg"
            >
              <input {...getInputProps()} accept="image/*" />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p className="text-center text-3xl flex flex-col justify-center items-center gap-2">
                  <FiImage />
                  <span className="text-sm">
                    Drag 'n' drop file, or click to select file
                  </span>
                </p>
              )}
            </div>
            {image ? (
              <p className="md:max-w-xs w-fit bg-[#f1f3f5] rounded-md text-sm py-2 px-3 flex items-center gap-2">
                <span className="text-base">
                  <BsFileEarmarkImage />
                </span>
                {item.file?.name.length > 35
                  ? item.file?.name.substr(0, 35) + "..."
                  : item.file?.name}
              </p>
            ) : null}
          </div>
        </div>
        <div className="">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Item Details</h1>
            <p className="text-gray-500">Fill out the details for the item.</p>
          </div>
          <div className="mt-5">
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <label htmlFor="email" className="font-semibold">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="py-3 px-6 rounded-lg border-2"
                placeholder="Name"
                required
                onChange={(e) => setItem({ ...item, name: e.target.value })}
              />
              <label htmlFor="description" className="font-semibold">
                Description
              </label>
              <input
                type="text"
                name="description"
                id="description"
                className="py-3 px-6 rounded-lg border-2"
                placeholder="Description"
                required
                onChange={(e) =>
                  setItem({ ...item, description: e.target.value })
                }
              />
              <label htmlFor="price" className="font-semibold">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="py-3 px-6 rounded-lg border-2"
                placeholder="Price"
                min={1}
                onChange={(e) =>
                  setItem({
                    ...item,
                    price: isNaN(parseInt(e.target.value))
                      ? 0
                      : parseInt(e.target.value),
                  })
                }
              />
              <label htmlFor="type" className="font-semibold">
                Type
              </label>
              <ListBox
                selected={selected}
                setSelected={setSelected}
                types={types}
              />
              <button
                disabled={addLoading}
                className="bg-[#111827]  text-white rounded-lg h-[3rem] px-6 mt-4"
              >
                {addLoading ? (
                  <span className="text-center">
                    <PropagateLoader color={"#fff"} loading={true} size={10} />
                  </span>
                ) : (
                  "Add Menu"
                )}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </>
  );
};
export default MenusNew;
