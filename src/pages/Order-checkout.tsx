import CartItem from "@/components/ui/cart-item";
import ListBox from "@/components/ui/listbox";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMenu } from "../context/MenuContext";
import { useOrder } from "../context/OrderContext";

const types = [{ name: "Dine-in" }, { name: "Takeout" }];

const OrderCheckout = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(types[0]);
  const { menu } = useMenu();
  const { cart, removeFromCart, addToCart, addOrder } = useOrder();

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => {
      const itemData = menu.find((x: any) => x.id === item.id);
      return sum + itemData.price * item.quantity;
    }, 0);
  };

  const [order, setOrder] = useState({
    type: selected.name,
    table: 0,
    cash: 0,
    change: 0,
    items: cart,
    total: getTotalPrice() * 0.1 + getTotalPrice(),
    date: new Date(),
  });

  useEffect(() => {
    setOrder({
      ...order,
      type: selected.name,
    });
  }, [selected.name]);

  const handleOrderSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (order.cash < order.total) return;
      await addOrder(order);
      navigate("/orders");
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
      else console.log(err);
    }
  };

  return (
    <>
      <motion.div
        className="grid md:grid-cols-2 grid-cols-1"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="flex flex-col md:pr-20">
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold">Order Summary</h2>
            <p className="text-gray-500">
              Check the items before saving the order.
            </p>
          </div>
          <div className="rounded-xl flex flex-col border-2 p-6 gap-5 mt-6">
            {cart.map((item) => {
              const itemData = menu.find((x: any) => x.id === item.id);
              return (
                <CartItem
                  key={item.id}
                  {...itemData}
                  quantity={item.quantity}
                  removeFromCart={removeFromCart}
                  addToCart={addToCart}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col md:mt-0 mt-10">
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold">Order Details</h2>
            <p className="text-gray-500">Fill out the details of the order.</p>
          </div>
          <form
            className="flex flex-col gap-3 mt-4"
            onSubmit={handleOrderSubmit}
          >
            <label htmlFor="type" className="font-semibold">
              Order Type (Dine-in / Takeout)
            </label>
            <ListBox
              selected={selected}
              setSelected={setSelected}
              types={types}
            />
            <label htmlFor="email" className="font-semibold">
              Table Number
            </label>
            <input
              type="number"
              name="tableNumber"
              id="tableNumber"
              className={`${
                selected.name === "Takeout" ? "bg-gray-100" : ""
              } py-3 px-6 rounded-lg border-2`}
              placeholder="No"
              onChange={(e) =>
                setOrder({
                  ...order,
                  table: isNaN(parseInt(e.target.value))
                    ? 0
                    : parseInt(e.target.value),
                })
              }
              disabled={selected.name === "Takeout"}
            />
            <label htmlFor="price" className="font-semibold">
              Cash
            </label>
            <input
              type="number"
              name="cash"
              id="cash"
              className="py-3 px-6 rounded-lg border-2"
              placeholder="Cash"
              min={1}
              onChange={(e) => {
                setOrder({
                  ...order,
                  cash: isNaN(parseInt(e.target.value))
                    ? 0
                    : parseInt(e.target.value),
                  change: isNaN(parseInt(e.target.value))
                    ? 0
                    : parseInt(e.target.value) - order.total,
                });
              }}
            />

            <div className="flex flex-col gap-3">
              <div className="flex  justify-between">
                <h2>Subtotal</h2>
                <h3>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(getTotalPrice())}
                </h3>
              </div>
              <div className="flex  justify-between">
                <h2>Pajak (10%)</h2>
                <h3>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(getTotalPrice() * 0.1)}
                </h3>
              </div>
              <div className="flex font-bold justify-between">
                <h2>Total</h2>
                <h3>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(getTotalPrice() * 0.1 + getTotalPrice())}
                </h3>
              </div>
              <div className="flex justify-between">
                <h2>Cash</h2>
                <h3>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(order.cash)}
                </h3>
              </div>
              <div className="flex font-bold justify-between">
                <h2>Kembalian</h2>
                <h3>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(order.cash - getTotalPrice() * 1.1)}
                </h3>
              </div>
            </div>

            <button className="bg-[#111827] text-white rounded-lg py-4 px-6 mt-4">
              Save
            </button>
          </form>
        </div>
      </motion.div>
    </>
  );
};

export default OrderCheckout;
