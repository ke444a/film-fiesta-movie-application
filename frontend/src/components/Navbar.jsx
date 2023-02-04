import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Fade as Hamburger } from "hamburger-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

const Navbar = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);

  useEffect(() => {
    const toggleScreen = () => {
      if (window.innerWidth < 640) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };
    window.addEventListener("resize", toggleScreen);

    return () => {
      window.removeEventListener("resize", toggleScreen);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-black">
      <div className="container">
        <nav className="flex items-center justify-between py-1 md:py-2 xl:py-3">
          <h2 className="cursor-pointer text-xl transition hover:brightness-110 2xl:text-2xl">
            <Link to="/">FilmFiesta</Link>
          </h2>
          {isSmallScreen ? (
            <>
              <div
                className={`relative z-20 ${
                  isHamburgerOpen ? "text-dark" : "text-white-1"
                }`}
              >
                <Hamburger
                  size={isSmallScreen ? 20 : 25}
                  toggled={isHamburgerOpen}
                  toggle={setIsHamburgerOpen}
                  direction="right"
                />
              </div>
              {isHamburgerOpen && (
                <div className="fixed top-0 right-0 z-10 h-full animate-slide-in bg-white-1 pt-12 pr-10 pl-3 sm:pt-9">
                  <ul className="ml-3 font-heading font-bold text-dark">
                    <li className="my-2">
                      <Link
                        to="/search"
                        className="cursor-pointer transition-colors hover:text-orange-highlight"
                      >
                        <FontAwesomeIcon
                          className="mr-1"
                          icon={faMagnifyingGlass}
                        />
                        Browse
                      </Link>
                    </li>
                    <li className="my-2">
                      <Link
                        to="/favorites"
                        className="cursor-pointer transition-colors hover:text-red-highlight"
                      >
                        <FontAwesomeIcon
                          className="mr-1"
                          icon={faHeartRegular}
                        />
                        Favorites
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <ul className="2xl-text:lg flex text-sm font-bold">
              <li className="mx-2 md:mx-3 lg:mx-4 xl:mx-6">
                <Link
                  to="/search"
                  className="cursor-pointer font-heading decoration-2 transition-all duration-300 hover:underline hover:decoration-orange-highlight hover:underline-offset-4"
                >
                  Browse
                </Link>
              </li>
              <li className="mx-2 md:mx-3 lg:mx-4 xl:mx-6">
                <Link
                  to="/favorites"
                  className="cursor-pointer font-heading decoration-2 transition-all duration-300 hover:underline hover:decoration-red-highlight hover:underline-offset-4"
                >
                  Favorites
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
