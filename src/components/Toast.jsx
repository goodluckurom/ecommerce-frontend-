/* eslint-disable react/prop-types */
const Toast = (props) => {
  // eslint-disable-next-line react/prop-types
  const { imageUrl, productName, actionType } = props;

  const actionText = {
    "add-to-cart": "Added to Cart",
    "remove-from-cart": "Removed from Cart",
    "add-to-wishlist": "Added to Wishlist",
    "remove-from-wishlist": "Removed from Wishlist",
  };

  return (
    <div className="toast flex items-center justify-between">
      <div className="flex items-center">
        <img
          src={imageUrl}
          alt={productName}
          className="w-10 h-10 mr-4 rounded-sm object-cover"
        />
        <p className="text-sm font-medium">
          {productName?.length > 10
            ? productName.slice(0, 15) + "..."
            : productName}
        </p>
      </div>
      <button
        className={`px-1 py-0 rounded-md text-sm font-medium text-white ${
          actionType === "add-to-cart" || actionType === "add-to-wishlist"
            ? "bg-green-500 hover:bg-green-700"
            : "bg-red-500 hover:bg-red-700"
        }`}
      >
        {actionText[actionType]}
      </button>
    </div>
  );
};

export default Toast;
