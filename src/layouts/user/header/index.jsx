import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.scss"

export default function HeaderLayout() {
  return (
    <header className="fixed top-0 left-0 right-0 bottom-0 h-[var(--header-height)] border border-solid border-[var(--border-color)] bg-[var(--white-color)] shadow-[rgba(149,157,165,0.2)_0px_8px_24px] z-[20]">
      <div className="block p-0 w-full max-w-[1200px] m-[0_auto] ">
        <div className="w-full flex items-center justify-between h-[var(--header-height)] m-[0_auto] relative z-[10]">
          <div className="min-w-[72px]">
            <Link to="/" className="flex items-center no-underline">
              <img
                src="/assets/images/logo-sm.png"
                alt=""
                className="w-[72px] max-w-[100%] rounded-full"
              />
              <span className="ml-3 text-[26px] font-bold text-[var(--text-color)]"></span>
            </Link>
          </div>
          <nav className="flex items-center justify-center flex-1 p-4 text-white">
            <ul className="hidden md:flex items-center list-none pl-0 m-0">
              <li className="flex items-center relative mx-3">
                <i className="uil uil-estate text-[16px] font-bold leading-[38px] text-[var(--nav-color)] pr-2"></i>
                <NavLink
                  href="#home"
                  className="header-nav-link block text-[16px] leading-[38px] font-bold uppercase no-underline text-[var(--nav-color)]"
                >
                  Home
                </NavLink>
              </li>
              <li className="flex items-center relative mx-3 header-nav-item">
                <i className="uil uil-exclamation-circle text-[16px] font-bold leading-[38px] text-[var(--nav-color)] pr-2"></i>
                <NavLink
                  href="#about"
                  className="header-nav-link block text-[16px] leading-[38px] font-bold uppercase no-underline text-[var(--nav-color)]"
                >
                  category
                </NavLink>
                <ul className="category-list absolute top-[177%] left-[-100px] bg-[#fff] w-[300px] rounded-[5px] shadow-[rgba(149,157,165,0.2)_0px_8px_24px]">
                  <li className=" h-[50px] leading-[50px] mb-[10px] flex item-center font-medium pl-[5px] text-[14px] text-[var(--nav-color)] w-full cursor-pointer hover:bg-[var(--hover-text-bg-color)] hover:text-[#fff]">
                    sdcnsdkjck
                  </li>
                  <li className=" h-[50px] leading-[50px] mb-[10px] flex item-center font-medium pl-[5px] text-[14px] text-[var(--nav-color)] w-full cursor-pointer hover:bg-[var(--hover-text-bg-color)] hover:text-[#fff]">
                    sdcnsdkjck
                  </li>

                  <li className=" h-[50px] leading-[50px] mb-[10px] flex item-center font-medium pl-[5px] text-[14px] text-[var(--nav-color)] w-full cursor-pointer hover:bg-[var(--hover-text-bg-color)] hover:text-[#fff]">
                    sdcnsdkjck
                  </li>
                  <li className=" h-[50px] leading-[50px] mb-[10px] flex item-center font-medium pl-[5px] text-[14px] text-[var(--nav-color)] w-full cursor-pointer hover:bg-[var(--hover-text-bg-color)] hover:text-[#fff]">
                    sdcnsdkjck
                  </li>
                </ul>
              </li>
              <li className=" flex items-center relative mx-3 header-nav-item">
                <i className="uil uil-brain text-[16px] font-bold leading-[38px] text-[var(--nav-color)] pr-2"></i>
                <NavLink
                  href="#skills"
                  className="header-nav-link block text-[16px] leading-[38px] font-bold uppercase no-underline text-[var(--nav-color)]"
                >
                  Skills
                </NavLink>
                <ul className="category-list  absolute top-[177%] left-[-100px] bg-[#fff] w-[300px] rounded-[5px] shadow-[rgba(149,157,165,0.2)_0px_8px_24px]">
                  <li className=" h-[50px] leading-[50px] mb-[10px] flex item-center font-medium pl-[5px] text-[14px] text-[var(--nav-color)] w-full cursor-pointer hover:bg-[var(--hover-text-bg-color)] hover:text-[#fff]">
                    sdcnsdkjck
                  </li>
                  <li className=" h-[50px] leading-[50px] mb-[10px] flex item-center font-medium pl-[5px] text-[14px] text-[var(--nav-color)] w-full cursor-pointer hover:bg-[var(--hover-text-bg-color)] hover:text-[#fff]">
                    sdcnsdkjck
                  </li>

                  <li className=" h-[50px] leading-[50px] mb-[10px] flex item-center font-medium pl-[5px] text-[14px] text-[var(--nav-color)] w-full cursor-pointer hover:bg-[var(--hover-text-bg-color)] hover:text-[#fff]">
                    sdcnsdkjck
                  </li>
                  <li className=" h-[50px] leading-[50px] mb-[10px] flex item-center font-medium pl-[5px] text-[14px] text-[var(--nav-color)] w-full cursor-pointer hover:bg-[var(--hover-text-bg-color)] hover:text-[#fff]">
                    sdcnsdkjck
                  </li>
                </ul>
              </li>
              <li className="flex items-center relative mx-3">
                <i className="uil uil-image-plus text-[16px] font-bold leading-[38px] text-[var(--nav-color)] pr-2"></i>
                <NavLink
                  href="#portfolio"
                  className="header-nav-link block text-[16px] leading-[38px] font-bold uppercase no-underline text-[var(--nav-color)]"
                >
                  Portfolio
                </NavLink>
              </li>
              <li className="flex items-center relative mx-3">
                <i className="uil uil-envelope text-[16px] font-bold leading-[38px] text-[var(--nav-color)] pr-2"></i>
                <NavLink
                  href="#contact"
                  className="header-nav-link block text-[16px] leading-[38px] font-bold uppercase no-underline text-[var(--nav-color)]"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
          <ul className="flex items-center list-none pl-0 m-0">
            <li className="flex items-center relative mx-2">
              <i className="uil uil-sunset text-[25px] font-bold leading-[38px] text-[var(--nav-color)] cursor-pointer"></i>
            </li>
            <li className="text-[25px] leading-[38px] font-bold mx-2 text-[var(--nav-color)]">
              <i className="uil uil-bars cursor-pointer md:hidden"></i>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
