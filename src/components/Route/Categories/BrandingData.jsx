// eslint-disable-next-line react-refresh/only-export-components
export const brandingData = [
  {
    id: 1,
    title: "Free Shipping",
    description: "From all orders over $100",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1H5.63636V24.1818H35"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeLinecap="square"
        />
        {/* Add other path elements */}
      </svg>
    ),
  },
  {
    id: 2,
    title: "Daily Surprise Offers",
    description: "Save up to 25% off",
    icon: (
      <svg
        width="32"
        height="34"
        viewBox="0 0 32 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M31 17.4502C31 25.7002 24.25 32.4502 16 32.4502C7.75 32.4502 1 25.7002 1 17.4502C1 9.2002 7.75 2.4502 16 2.4502C21.85 2.4502 26.95 5.7502 29.35 10.7002"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeLinecap="square"
        />
        {/* Add other path elements */}
      </svg>
    ),
  },
  {
    id: 4,
    title: "Affordable Prices",
    description: "Get Factory direct price",
    icon: (
      <svg
        width="32"
        height="35"
        viewBox="0 0 32 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 13H5.5C2.95 13 1 11.05 1 8.5V1H7"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeLinecap="square"
        />
        {/* Add other path elements */}
      </svg>
    ),
  },
  {
    id: 5,
    title: "Secure Payments",
    description: "100% protected payments",
    icon: (
      <svg
        width="32"
        height="38"
        viewBox="0 0 32 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.6654 18.667H9.33203V27.0003H22.6654V18.667Z"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeLinecap="square"
        />
        {/* Add other path elements */}
      </svg>
    ),
  },
];
// eslint-disable-next-line react/prop-types
const SvgIcon = ({ svgString }) => {
  return <div dangerouslySetInnerHTML={{ __html: svgString }} />;
};

export default SvgIcon;
