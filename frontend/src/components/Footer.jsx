const Footer = () => {
    return (
        <footer className="p-2 bg-black">
            <div className="container">
                <div className="flex flex-col justify-center items-center min-[450px]:flex-row min-[450px]:justify-between">
                    <p className="mb-1 sm:mb-0 text-xs sm:text-sm xl:text-base opacity-50">&copy; 2023. All rights reserved</p>
                    <img className="max-h-[10px] xl:max-h-[15px]" src="../tmbd-logo.svg" alt="" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;