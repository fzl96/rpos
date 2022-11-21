import type { OrderType } from "@/context/OrderContext";
import { useOrder } from "@/context/OrderContext";
import { startOfMonth, startOfToday } from "date-fns";
import { eachDayOfInterval, endOfMonth } from "date-fns/esm";
import { IoMdPricetag } from "react-icons/io";
import { MdLocalDining, MdOutlineShoppingCart } from "react-icons/md";
import Card from "./ui/card";

export type DashboardItems = {
  title: string;
  subtitle: string;
  icon: any;
  background: string;
};

export const dashboardItems: DashboardItems[] = [
  {
    title: "Sales",
    subtitle: "Total sales this month",
    icon: <IoMdPricetag />,
    background: "bg-[#ffefe2]",
  },
  {
    title: "Orders",
    subtitle: "Total orders this month",
    icon: <MdOutlineShoppingCart />,
    background: "bg-[#E6F5F9]",
  },
  {
    title: "Products",
    subtitle: "Number of products",
    icon: <MdLocalDining />,
    background: "bg-[#F4F6FA]",
  },
];

const DashboardCard = () => {
  const { orders } = useOrder();
  const today = startOfToday();
  const currentMonth = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  });

  // get all orders for the current month
  const currentMonthOrders = orders.filter((order: OrderType) => {
    const orderDate = new Date(order.date);
    if (
      orderDate.getMonth() === today.getMonth() &&
      orderDate.getFullYear() === today.getFullYear()
    ) {
      return order;
    }
  });

  const totalSalesThisMonth = currentMonthOrders.reduce(
    (acc: number, order: OrderType) => acc + order.total,
    0
  );

  return (
    <>
      <div className="grid md:grid-cols-3 grid-cols-2 gap-5 pt-5">
        {dashboardItems.map((item, index) => (
          <Card
            value={
              item.title === "Sales"
                ? totalSalesThisMonth
                : currentMonthOrders.length
            }
            {...item}
            key={index}
          />
        ))}
      </div>
    </>
  );
};
export default DashboardCard;
