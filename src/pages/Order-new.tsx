import OrderItemCard from "@/components/ui/order-item-card";
import { AnimatePresence, motion } from "framer-motion";
import { BsFillHandbagFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useMenu } from "../context/MenuContext";
import { useOrder } from "../context/OrderContext";

const OrderNew = () => {
  const { menu, loading } = useMenu();
  const { cart } = useOrder();

  // create a function that will return total price of all items in cart
  const getTotalPrice = () => {
    return cart.reduce((sum, item) => {
      const itemData = menu.find((x: any) => x.id === item.id);
      return sum + itemData.price * item.quantity;
    }, 0);
  };

  // create a function that will return total quantity of all items in cart
  const getTotalQuantity = () => {
    return cart.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);
  };

  return (
    <>
      <h1 className="text-2xl font-semibold">Select items</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 md:col-span-1 col-span-full grid-cols-1 gap-5 mt-5 pb-20">
        {loading ? (
          <></>
        ) : (
          menu.map((food: any) => <OrderItemCard key={food.id} {...food} />)
        )}
      </div>
      <AnimatePresence>
        {cart.length !== 0 ? (
          <Link to="/orders/new/checkout">
            <motion.div
              key="cart"
              className="bg-green-700 py-3 px-6 rounded-3xl shadow-lg fixed  bottom-10 md:left-[50%] left-[50%] text-white w-[30rem] flex justify-between"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
            >
              <p>{getTotalQuantity()} items</p>
              <p className="flex items-center gap-2 text-lg">
                ${getTotalPrice()}
                <span>
                  <BsFillHandbagFill />
                </span>
              </p>
            </motion.div>
          </Link>
        ) : (
          <></>
        )}
      </AnimatePresence>
    </>
  );
};
export default OrderNew;
