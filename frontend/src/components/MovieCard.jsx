import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { selectAllFavorites } from "../features/favorites/favoritesSlice";
import {
  addFavorite,
  removeFavorite,
} from "../features/favorites/favoritesSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const MovieCard = (props) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectAllFavorites);
  const [isFavorite, setIsFavorite] = useState(
    favorites.some((movie) => movie.id === props.id)
  );
  const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;

  const handleFavoriteChange = () => {
    isFavorite ? dispatch(removeFavorite(props)) : dispatch(addFavorite(props));
    setIsFavorite((prevFavorite) => !prevFavorite);
  };

  return (
    <div className="w-[29%] flex-none bg-black-1 min-[400px]:w-[22%] md:w-[18%] lg:w-[15%]">
      <Link
        className="cursor-pointer transition-opacity duration-300 hover:opacity-80"
        to={`../movie/${props.id}`}
      >
        <LazyLoadImage
          className="3xl:h-[300px] h-[150px] min-[400px]:h-[170px] sm:h-[210px] md:h-[230px] lg:h-[245px] 2xl:h-[280px]"
          src={imageBaseUrl + props.poster_path}
          placeholder={
            <div className="h-[150px] bg-dark blur-lg min-[400px]:h-[170px] sm:h-[210px] md:h-[230px] lg:h-[245px] 2xl:h-[280px]" />
          }
          width={"100%"}
        />
      </Link>
      <div className="p-1 text-xs min-[300px]:text-sm md:p-2 md:text-base">
        <Link
          to={`../movie/${props.id}`}
          className="inline-block w-full cursor-pointer truncate hover:underline md:font-medium"
        >
          {props.title}
        </Link>
        <div className="flex justify-between">
          <p>
            <FontAwesomeIcon className="mr-1 text-golden" icon={faStar} />
            {props.rating}
          </p>
          <a
            onClick={handleFavoriteChange}
            className="transition-color cursor-pointer rounded-lg px-1 text-red-highlight duration-500 hover:bg-[rgba(248,51,60,0.5)] hover:text-white-1 min-[300px]:px-2"
          >
            {isFavorite ? (
              <FontAwesomeIcon icon={faHeart} />
            ) : (
              <FontAwesomeIcon icon={faHeartRegular} />
            )}
          </a>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
