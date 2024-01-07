import React from "react";
import logo from "/images/logo.svg";
import like from "/images/like.svg";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const isPhotoPage =
        location.pathname.startsWith("/photo") ||
        location.pathname.startsWith("/favorites");

    return (
        <div className="flex items-center justify-center  w-full h-[72px] bg-black  px-8 md:px-15 lg:px-40">
            <div className="w-full flex items-center justify-between max-w-[64.5rem]">
                <Link className="cursor-pointer" to={"/"}>
                    <img src={logo} width={84} height={32.91} alt="logo" />
                </Link>

                <div className="flex space-x-4 lg:space-x-8 ">
                    {isPhotoPage && (
                        <Link
                            to="/"
                            className="right-3 flex items-center
                            hover:border-b-2 hover:border-gray-200 transition
                            duration-300"
                        >
                            <svg
                                width="25"
                                height="25"
                                viewBox="0 0 23 23"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M22.8596 22.1821L15.8614 15.1838C17.315 13.5699 18.2084 11.442 18.2084 9.10414C18.2083 4.08416 14.1242 0 9.10418 0C4.08416 0 0 4.08416 0 9.10418C0 14.1242 4.08416 18.2084 9.10418 18.2084C11.442 18.2084 13.5699 17.315 15.1839 15.8614L22.1821 22.8596C22.2756 22.9532 22.3983 23 22.5209 23C22.6435 23 22.766 22.9532 22.8597 22.8596C23.0468 22.6724 23.0468 22.3692 22.8596 22.1821ZM9.10418 17.25C4.61294 17.25 0.958363 13.5959 0.958363 9.10418C0.958363 4.61249 4.61294 0.958318 9.10418 0.958318C13.5954 0.958318 17.25 4.61244 17.25 9.10418C17.25 13.5959 13.5954 17.25 9.10418 17.25Z"
                                    fill="white"
                                />
                            </svg>
                            <p className="hidden lg:block text-white ml-2 text-sm">
                                Поиск
                            </p>
                        </Link>
                    )}

                    <Link
                        to="/favorites"
                        className="flex items-center space-x-2 hover:border-b-2 hover:border-gray-200 transition duration-300"
                    >
                        <img src={like} width={25} height={23} alt="liked" />
                        <p className="hidden lg:block text-white text-sm">
                            Избранное
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
