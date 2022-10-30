import MenuCard from "@/components/ui/menus-card";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiImage } from "react-icons/fi";

const MenusNew = () => {
  const [image, setImage] = useState<any>();
  const [file, setFile] = useState<any>();

  const [food, setFood] = useState({
    name: "Add a name",
    price: 0,
    description: "Add a description",
    image: image,
    file: file,
  });

  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    if (acceptedFiles[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setFood({ ...food, image: reader.result, file: acceptedFiles[0] });
      };
      reader.readAsDataURL(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
  });

  return (
    <>
      <div className="grid md:grid-cols-2 grid-cols-1 min-h-full gap-2 mt-10">
        <div className="flex flex-col md:gap-5 border-r md:max-w-sm">
          <div className="flex flex-col md:max-w-xs ">
            <h1 className="text-2xl font-bold">Item Preview</h1>
            <p className="text-gray-500">
              Below is the preview of the item in the menus page.
            </p>
          </div>
          <div className="flex flex-col gap-5 ">
            <MenuCard {...food} />
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
            <p className="md:max-w-xs">selected: {food.file?.name}</p>
          </div>
        </div>
        <div className="">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Item Details</h1>
            <p className="text-gray-500">Fill out the details for the item.</p>
          </div>
          <div className="mt-5">
            <form className="flex flex-col gap-3" action="submit">
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
                onChange={(e) => setFood({ ...food, name: e.target.value })}
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
                  setFood({ ...food, description: e.target.value })
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
                  setFood({ ...food, price: parseInt(e.target.value) })
                }
              />
              <label htmlFor="type" className="font-semibold">
                Type
              </label>
              <input
                type="text"
                name="type"
                id="type"
                className="py-3 px-6 rounded-lg border-2"
                placeholder="Type"
              />
              <button className="bg-[#111827] text-white rounded-lg py-4 px-6 mt-4">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default MenusNew;
