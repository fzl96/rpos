import { Tab } from "@headlessui/react";
import { useMenu } from "../context/MenuContext";
import MenuCard from "./ui/menus-card";

const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};

const Tabs = () => {
  const { menu, loading } = useMenu();

  const categories = ["Food", "Drinks"];

  return (
    <>
      <Tab.Group>
        <Tab.List className="flex space-x-1 border-b-2 py-3">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "px-8 rounded-lg py-2.5 text-md font-medium leading-5",
                  "ring-[#1c253a] ring-opacity-60 ring-offset-2 ring-offset-white focus:outline-none focus:ring-2",
                  selected
                    ? "bg-[#111827] shadow text-white"
                    : "text-[#797a7b] hover:bg-white/[0.12] hover:text-black"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-3">
          <Tab.Panel className="grid md:grid-cols-3 grid-cols-2 gap-4">
            {loading
              ? <></>
              : menu.map((food: any) => <MenuCard key={food.id} {...food} />)}
          </Tab.Panel>
          <Tab.Panel></Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};
export default Tabs;
