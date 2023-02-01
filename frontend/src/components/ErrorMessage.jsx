import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const ErrorMessage = ({message}) => {
    const [isVisible, setIsVisible] = useState(true);

    return (
        isVisible &&
        <div onClick={() => setIsVisible(false)} className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-highlight text-white-1 font-medium font-heading flex justify-start p-4 items-center cursor-pointer z-40">
            <FontAwesomeIcon className="mr-2" icon={faTriangleExclamation} />
            <p>Error! {message}</p>
        </div>
    );
};

export default ErrorMessage;