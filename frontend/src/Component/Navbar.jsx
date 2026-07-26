import React, { useEffect, useState } from "react";
import {
  FaShoppingBag,
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router";
import SearchReasult from "./SearchReasult";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [searchText , setSearchText] = useState("");
  const [searchError , setSearchError] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [displaySearch, setDisplaySearch] = useState(false);

  // const navLinks = [
  //   'Home',
  //   'Shop',
  //   'Categories',
  //   'Deals',
  //   'New Arrivals',
  //   'Contact',
  // ];

  const handleChange = async (value) => {
    setSearchText(value);
    setSearchResult([]);
    setSearchError(null);
    if(value.length >= 3){
      setDisplaySearch(true);
      try{

        const res = await fetch(`http://localhost:8080/api/product/search?keyword=${value}`);
        if(!res.ok) throw new Error("Product Not Found");

        const data = await res.json();
        setSearchResult(data);
        setSearchError(data.length === 0);
        console.log(data);        

      }catch(e){
        setSearchError(e);
        setSearchResult([]);
      }
    }else{
      setDisplaySearch(false);
    }
  }
  useEffect(()=> {
   console.log(searchError);
   console.log(searchResult);
   
   
  }, [searchResult, searchError]);


  const navLinks = [
    { link: "/", name: "Home" },
    { link: "/", name: "Shop" },
    { link: "/addproduct", name: "Add Product" },
  ];
  return (
    <>
      {" "}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center shadow-lg">
                <FaShoppingBag className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  TechStore
                </h1>
                <p className="text-xs text-slate-500 -mt-1">
                  Premium Electronics
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((navlink, idx) => (
                <NavLink
                  key={idx}
                  to={`${navlink.link}`}
                  className="text-slate-700 font-medium hover:text-blue-600 transition-colors relative group"
                >
                  {navlink.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              ))}
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                onChange={(e) => handleChange(e.target.value)}
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {displaySearch && <SearchReasult searchError={searchError} searchResult={searchResult} setDisplaySearch={setDisplaySearch} />}
              </div>
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-3">
              <button className="hidden sm:flex w-11 h-11 rounded-xl hover:bg-slate-100 items-center justify-center transition-colors relative">
                <FaHeart className="text-slate-700 text-lg" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  2
                </span>
              </button>

              <button className="flex w-11 h-11 rounded-xl hover:bg-slate-100 items-center justify-center transition-colors relative">
                <FaShoppingCart className="text-slate-700 text-lg" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              <button className="hidden sm:flex w-11 h-11 rounded-xl hover:bg-slate-100 items-center justify-center transition-colors">
                <FaUser className="text-slate-700 text-lg" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-11 h-11 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-colors"
              >
                {isMenuOpen ? (
                  <FaTimes className="text-slate-700 text-xl" />
                ) : (
                  <FaBars className="text-slate-700 text-xl" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
              onChange={(e) => handleChange(e.target.value)}
                type="text"
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
               {displaySearch && <SearchReasult searchError={searchError} searchResult={searchResult} />}            
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96 border-t border-slate-200" : "max-h-0"
          }`}
        >
          <div className="px-4 py-4 bg-white">
            <div className="flex flex-col space-y-1">
              {navLinks.map((navlink, idx) => (
                <NavLink
                  key={idx}
                  to={`${navlink.link}`}
                  className="px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                >
                  {navlink.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
