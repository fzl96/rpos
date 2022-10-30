import { motion } from "framer-motion";

interface ItemCardProps {
  name: string;
  price: number;
  description: string;
  image: string;
}

const OrderItemCard = ({ name, price, description, image }: ItemCardProps) => {
  return (
    <>
      <div className="flex md:flex-col w-full items-center bg-white rounded-lg border border-gray-200 shadow-md md:px-0 px-4">
        <img
          className="md:rounded-t-lg md:rounded-none md:shadow-none shadow-sm rounded-lg md:w-full md:h-[10rem] h-20 w-20 object-cover"
          src={image}
          alt={name}
        />
        <div className="flex flex-col md:p-5 p-3 md:gap-0 gap-2 w-full">
          <h5 className="md:mb-2 text-xl font-bold tracking-tight text-gray-900 ">
            {name}
          </h5>
          <p className="md:mb-3 font-normal text-sm text-gray-700">
            {description}
          </p>
          <div className="flex justify-between items-center">
            <p className="font-bold text-lg text-gray-900">${price}</p>
            <motion.button
              className="text-sm font-semibold py-2 px-4 border rounded-xl text-green-700 border-green-700 "
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
            >
              Add
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderItemCard;
