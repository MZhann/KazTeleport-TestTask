import React from "react";

const Picture = ({ src, alt }) => {
    return (
        <div className="inline-block m-2">
            <img src={src} width={335} height={312} alt={alt}  className="w-[334px] h-[311px] object-cover rounded-md"/>
        </div>
    );
};

export default Picture;
