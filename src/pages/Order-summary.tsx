import CartItem from "@/components/ui/cart-item";
import { useMenu } from "../context/MenuContext";
import { useOrder } from "../context/OrderContext";

const OrderSummary = () => {
  const { menu } = useMenu();
  const { cart, removeFromCart, addToCart } = useOrder();

  // create a function that will calculate total price of items in cart
  const getTotalPrice = () => {
    return cart.reduce((sum, item) => {
      const itemData = menu.find((x: any) => x.id === item.id);
      return sum + itemData.price * item.quantity;
    }, 0);
  };

  return (
    <>
      <div className="grid md:grid-cols-2 grid-cols-1">
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
          <form className="flex flex-col gap-3 mt-4" action="submit">
            <label htmlFor="type" className="font-semibold">
              Order Type (Dine-in / Takeout)
            </label>
            <input
              type="text"
              name="type"
              id="type"
              className="py-3 px-6 rounded-lg border-2"
              placeholder="Type"
            />
            <label htmlFor="email" className="font-semibold">
              Table Number
            </label>
            <input
              type="number"
              name="name"
              id="name"
              className="py-3 px-6 rounded-lg border-2"
              placeholder="No"
              required
              // onChange={(e) => setFood({ ...food, name: e.target.value })}
            />
            <label htmlFor="price" className="font-semibold">
              Cash
            </label>
            <input
              type="number"
              name="price"
              id="price"
              className="py-3 px-6 rounded-lg border-2"
              placeholder="Cash"
              min={1}
              // onChange={(e) =>
              //   setFood({ ...food, price: parseInt(e.target.value) })
              // }
            />

            <div className="flex flex-col gap-3">
              <div className="flex  justify-between">
                <h2>Subtotal</h2>
                <h3>$ {getTotalPrice()}.00</h3>
              </div>
              <div className="flex  justify-between">
                <h2>Vat (10%)</h2>
                <h3>$ {getTotalPrice() * 0.1}</h3>
              </div>
              <div className="flex font-bold justify-between">
                <h2>Total</h2>
                <h3>$ {getTotalPrice() * 0.1 + getTotalPrice()}</h3>
              </div>
            </div>

            <button className="bg-[#111827] text-white rounded-lg py-4 px-6 mt-4">
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default OrderSummary;
