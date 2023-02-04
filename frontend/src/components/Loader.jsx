import { BeatLoader } from "react-spinners";

const Loader = ({ isDarkTheme }) => {
  return (
    <div className="mt-16 text-center">
      <BeatLoader color={`${isDarkTheme ? "#F5F5FA" : "#141010"}`} size={15} />
    </div>
  );
};

export default Loader;
