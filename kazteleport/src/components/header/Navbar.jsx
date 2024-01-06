import React from "react";
import logo from '/public/images/logo.svg'
import like from '/images/like.svg'

const Navbar = () => {
    return ( 
        <div className="w-full h-[72px] bg-black flex items-center justify-between px-8 md:px-15 lg:px-40">
            <button>
                <img src={logo} width={84} height={32.91} alt="logo" />
            </button>

            <button className="flex space-x-1">
                <img src={like} width={25} height={23} alt="liked" />
                <p className="hidden lg:block text-white text-sm">Избранное</p>
            </button>
        </div>
    )
};

export default Navbar;
