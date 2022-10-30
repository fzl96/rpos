import { IoMdPricetag } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import Card from "./ui/card";

export type OrdersCardItems = {
  title: string;
  subtitle: string;
  icon: any;
  background: string;
  value: string | number;
};

const ordersCardItems: OrdersCardItems[] = [
  {
    title: "Sales",
    subtitle: "Total sales today",
    icon: <IoMdPricetag />,
    background: "bg-[#fdefef]",
    value: "Rp1.000.000",
  },
  {
    title: "Orders",
    subtitle: "Total orders today",
    icon: <MdOutlineShoppingCart />,
    background: "bg-[#f9f3df]",
    value: 50,
  },
];

const OrdersCard = () => {
  return (
    <>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5 pt-5">
        {ordersCardItems.map((item, index) => (
          <Card {...item} key={index} />
        ))}
      </div>
    </>
  );
};
export default OrdersCard;
