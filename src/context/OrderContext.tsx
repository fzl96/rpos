import { createContext, useContext, useState } from "react";

export type OrderItem = {
  id: string;
  quantity: number;
};

// create order context type
type OrderContextType = {
  orders: any;
  cart: OrderItem[];
  loading: boolean;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  isItemInCart: (id: string) => boolean;
};

// create order context
const OrderContext = createContext<OrderContextType>({
  orders: null,
  cart: [],
  loading: false,
  addToCart: () => {},
  removeFromCart: () => {},
  isItemInCart: () => false,
});

// create type for children
type Props = {
  children: React.ReactNode;
};

export const OrderProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // create a function that checks if the item is already in the cart
  const isItemInCart = (id: string) => {
    return !!cart.find((cartItem) => cartItem.id === id);
  };

  // create a function that will add item to cart
  const addToCart = (id: string) => {
    // check if item already exist in cart
    const exist = cart.find((x: OrderItem) => x.id === id);

    // if item already exist in cart, increase quantity
    if (exist) {
      setCart(
        cart.map((x: OrderItem) =>
          x.id === id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    } else {
      // if item not exist in cart, add item to cart
      setCart([...cart, { id, quantity: 1 }]);
    }
  };

  // create a function that decrease quantity of item in cart or remove item from cart
  const removeFromCart = (id: string) => {
    // find item in cart
    const exist = cart.find((x: OrderItem) => x.id === id);

    // if item quantity is 1, remove item from cart
    if (exist?.quantity === 1) {
      return setCart(cart.filter((x: OrderItem) => x.id !== id));
    }

    if (exist && exist.quantity > 1) {
      // if item quantity is more than 1, decrease quantity
      return setCart(
        cart.map((x: OrderItem) =>
          x.id === id ? { ...exist, quantity: exist?.quantity - 1 } : x
        )
      );
    }
  };

  return (
    <OrderContext.Provider
      value={{ cart, addToCart, removeFromCart, isItemInCart, orders, loading }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
