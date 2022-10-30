interface MenuCardProps {
  name: string;
  price: number;
  description: string;
  image: string;
}

const MenuCard = ({ name, price, description, image }: MenuCardProps) => {
  return (
    <>
      <div className="md:max-w-xs bg-white rounded-lg border border-gray-200 shadow-md ">
        <img
          className="rounded-t-lg h-[10rem] w-full object-cover"
          src={image}
          alt={name}
        />
        <div className="p-5">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
            {name}
          </h5>
          <p className="mb-3 font-normal text-sm text-gray-700">
            {description}
          </p>
          <p>
            <span className="font-bold text-lg text-gray-900">${price}</span>
          </p>
        </div>
      </div>
    </>
  );
};
export default MenuCard;
