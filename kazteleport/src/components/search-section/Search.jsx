import React from "react";
import search from "/images/search-vector.svg";
// import like from '/images/like.svg'

const Search = () => {
    return (
        <div className="w-full  relative bg-starry bg-cover bg-center h-[230px] flex items-center justify-center">
            <div className="absolute inset-0 bg-black backdrop-blur backdrop-filter opacity-50"></div>
            <div className="relative w-4/5 h-[70px] flex items-center justify-center">
                <input
                    className="absolute pl-3 z-10 h-full w-full md:w-[600px] md:pl-5 lg:w-[866px] placeholder-black text-lg font-light"
                    type="text"
                    placeholder="Поиск"
                />
                <img
                    className="absolute z-20 right-3 md:static md:inset-0 md:ml-[540px] lg:static lg:inset-0 lg:ml-[800px]"
                    src={search}
                    width={23}
                    height={23}
                    alt="search"
                />
            </div>
        </div>
    );
};

export default Search;
