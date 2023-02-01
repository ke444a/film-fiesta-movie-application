import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const MainHeader = () => {
    return (
        <div className="relative h-fit pt-3 sm:pt-5 md:pt-7 before:bg-[url('../assets/header-bg-small.jpg')] before:md:bg-[url('../assets/header-bg-big.jpg')] before:bg-cover before:bg-center before:opacity-50 before:absolute before:top-0 before:left-0 before:w-full before:shadow-[inset_0_0_80px_100px_rgba(0,0,0,0.5)] before:brightness-90 before:h-full before:-z-30">
            <div className="container">
                <div className="text-center max-w-[85%] sm:max-w-[70%] xl:max-w-[60%] mx-auto">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl min-[1350px]:text-6xl font-bold mt-10 md:mt-20 lg:mt-24 md:drop-shadow-md">
                        Discover Your Next Favorite Film
                    </h1>
                    <p className="my-3 sm:mt-2 sm:mb-5 md:mt-4 sm:text-lg lg:font-medium min-[1350px]:text-2xl md:drop-shadow-lg">
                        Explore the Latest Movie Releases and Classics on FilmFiesta
                    </p>
                    <Link to="/search" className="inline-block cursor-pointer rounded-md p-3 lg:p-4 w-full min-[400px]:w-3/4 lg:w-1/2 bg-dark-blue font-medium transition hover:brightness-110 active:animate-click active:opacity-70 mb-5 min-[400px]:mb-12 sm:mb-20 md:mb-28 md:text-lg xl:text-xl">
                        Start Browsing
                        <FontAwesomeIcon className="ml-1" icon={faChevronRight} />
                    </Link>
                    <a href="#trending" className="hidden cursor-pointer sm:block">
                        <FontAwesomeIcon className="animate-bounce" icon={faChevronDown} size="2x" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MainHeader;