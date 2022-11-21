import ListBox from "@/components/ui/listbox";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { useMenu } from "../context/MenuContext";

const types = [{ name: "Food" }, { name: "Drink" }];

const NewMenuForm = () => {
  const navigate = useNavigate();
  const { addMenu, addLoading } = useMenu();
  const [selected, setSelected] = useState(types[0]);
  const [image, setImage] = useState<any>();
  const [file, setFile] = useState<any>(null);
  const [price, setPrice] = useState(0);

  const [item, setItem] = useState({
    name: "Add a name",
    price: price,
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
          onChange={(e) => setItem({ ...item, description: e.target.value })}
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
        <ListBox selected={selected} setSelected={setSelected} types={types} />
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
    </>
  );
};
export default NewMenuForm;
