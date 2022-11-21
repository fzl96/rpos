import type { OrderType } from "@/context/OrderContext";
import { useOrder } from "@/context/OrderContext";
import { IoMdPricetag } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import Card from "./ui/card";

export type OrdersCardItems = {
  title: string;
  subtitle: string;
  icon: any;
  background: string;
};

const ordersCardItems: OrdersCardItems[] = [
  {
    title: "Sales",
    subtitle: "Total sales today",
    icon: <IoMdPricetag />,
    background: "bg-[#fdefef]",
  },
  {
    title: "Orders",
    subtitle: "Total orders today",
    icon: <MdOutlineShoppingCart />,
    background: "bg-[#f9f3df]",
  },
];

const OrdersCard = () => {
  const { orders } = useOrder();

  // get all orders today
  const today = new Date();
  const todayOrders = orders.filter((order: OrderType) => {
    const orderDate = new Date(order.date);
    if (
      orderDate.getDate() === today.getDate() &&
      orderDate.getMonth() === today.getMonth() &&
      orderDate.getFullYear() === today.getFullYear()
    ) {
      return order;
    }
  });

  // get total sales today
  const totalSalesToday = todayOrders.reduce(
    (acc: number, order: OrderType) => acc + order.total,
    0
  );

  const totalOrdersToday = todayOrders.length;

  console.log(todayOrders);

  return (
    <>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5 pt-5">
        {ordersCardItems.map((item, index) => (
          <Card
            value={item.title === "Sales" ? totalSalesToday : totalOrdersToday}
            {...item}
            key={index}
          />
        ))}
      </div>
    </>
  );
};
export default OrdersCard;
