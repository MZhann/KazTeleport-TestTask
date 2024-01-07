import React from "react";
import { Link } from 'react-router-dom';

const Picture = ({ src, alt, photoId }) => {
    return (
        <Link className="inline-block m-2" to={`/photo/${photoId}`}>
            <img src={src} width={335} height={312} alt={alt}  className="w-[334px] h-[311px] object-cover rounded-md"/>
        </Link>
    );
};

export default Picture;
