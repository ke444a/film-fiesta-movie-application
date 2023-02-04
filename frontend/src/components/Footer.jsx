const Footer = () => {
  return (
    <footer className="bg-black p-2">
      <div className="container">
        <div className="flex flex-col items-center justify-center min-[450px]:flex-row min-[450px]:justify-between">
          <p className="mb-1 text-xs opacity-50 sm:mb-0 sm:text-sm xl:text-base">
            &copy; 2023. All rights reserved
          </p>
          <img
            className="max-h-[10px] xl:max-h-[15px]"
            src="../tmbd-logo.svg"
            alt=""
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
