import type { OrderType } from "@/context/OrderContext";
import { useOrder } from "@/context/OrderContext";
import { startOfToday } from "date-fns";
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
    title: "Pendapatan",
    subtitle: "Total pendapatan bulan ini",
    icon: <IoMdPricetag />,
    background: "bg-[#ffefe2]",
  },
  {
    title: "Pesanan",
    subtitle: "Total pesanan bulan ini",
    icon: <MdOutlineShoppingCart />,
    background: "bg-[#E6F5F9]",
  },
  {
    title: "Produk",
    subtitle: "Jumlah produk",
    icon: <MdLocalDining />,
    background: "bg-[#F4F6FA]",
  },
];

const DashboardCard = () => {
  const { orders } = useOrder();
  const today = startOfToday();
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
              item.title === "Pendapatan"
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
