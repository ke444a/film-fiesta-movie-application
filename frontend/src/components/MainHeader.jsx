import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const MainHeader = () => {
  return (
    <div className="relative h-fit pt-3 before:absolute before:top-0 before:left-0 before:-z-30 before:h-full before:w-full before:bg-[url('../assets/header-bg-small.jpg')] before:bg-cover before:bg-center before:opacity-50 before:shadow-[inset_0_0_80px_100px_rgba(0,0,0,0.5)] before:brightness-90 sm:pt-5 md:pt-7 before:md:bg-[url('../assets/header-bg-big.jpg')]">
      <div className="container">
        <div className="mx-auto max-w-[85%] text-center sm:max-w-[70%] xl:max-w-[60%]">
          <h1 className="mt-10 text-3xl font-bold md:mt-20 md:text-4xl md:drop-shadow-md lg:mt-24 lg:text-5xl min-[1350px]:text-6xl">
            Discover Your Next Favorite Film
          </h1>
          <p className="my-3 sm:mt-2 sm:mb-5 sm:text-lg md:mt-4 md:drop-shadow-lg lg:font-medium min-[1350px]:text-2xl">
            Explore the Latest Movie Releases and Classics on FilmFiesta
          </p>
          <Link
            to="/search"
            className="mb-5 inline-block w-full cursor-pointer rounded-md bg-dark-blue p-3 font-medium transition hover:brightness-110 active:animate-click active:opacity-70 min-[400px]:mb-12 min-[400px]:w-3/4 sm:mb-20 md:mb-28 md:text-lg lg:w-1/2 lg:p-4 xl:text-xl"
          >
            Start Browsing
            <FontAwesomeIcon className="ml-1" icon={faChevronRight} />
          </Link>
          <a href="#trending" className="hidden cursor-pointer sm:block">
            <FontAwesomeIcon
              className="animate-bounce"
              icon={faChevronDown}
              size="2x"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
