import OrderItemCard from "@/components/ui/order-item-card";
import { useMenu } from "../context/MenuContext";

const OrderNew = () => {
  const { menu, loading } = useMenu();
  return (
    <>
      <h1 className="text-2xl font-semibold">Select items</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 md:col-span-1 col-span-full grid-cols-1 gap-5 mt-5">
        {loading ? (
          <></>
        ) : (
          menu.map((food: any) => <OrderItemCard key={food.id} {...food} />)
        )}
      </div>
    </>
  );
};
export default OrderNew;
