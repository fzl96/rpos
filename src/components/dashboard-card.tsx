import { IoMdPricetag } from "react-icons/io";
import { MdLocalDining, MdOutlineShoppingCart } from "react-icons/md";
import Card from "./ui/card";

export type DashboardItems = {
  title: string;
  subtitle: string;
  icon: any;
  background: string;
  value: string | number;
};

export const dashboardItems: DashboardItems[] = [
  {
    title: "Sales",
    subtitle: "Total sales this month",
    icon: <IoMdPricetag />,
    background: "bg-[#ffefe2]",
    value: "Rp35.000.000",
  },
  {
    title: "Orders",
    subtitle: "Total orders this month",
    icon: <MdOutlineShoppingCart />,
    background: "bg-[#E6F5F9]",
    value: 2000,
  },
  {
    title: "Products",
    subtitle: "Number of products",
    icon: <MdLocalDining />,
    background: "bg-[#F4F6FA]",
    value: 26,
  },
];

const DashboardCard = () => {
  return (
    <>
      <div className="grid md:grid-cols-3 grid-cols-2 gap-5 pt-5">
        {dashboardItems.map((item, index) => (
          <Card {...item} key={index}/>
        ))}
      </div>
    </>
  );
};
export default DashboardCard;
