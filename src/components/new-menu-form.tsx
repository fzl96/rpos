const NewMenuForm = () => {
  return (
    <>
      <form className="flex flex-col">
        <label htmlFor="email">Name</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="description">Description</label>
        <input type="text" name="description" id="description" />
        <label htmlFor="price">Price</label>
        <input type="number" name="price" id="price" />
        <label htmlFor="type">Type</label>
        <input type="text" name="type" id="type" />
      </form>
    </>
  );
};
export default NewMenuForm;
