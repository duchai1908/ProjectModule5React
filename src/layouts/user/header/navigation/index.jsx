import { Dropdown } from "antd";
import React from "react";

import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Navigation() {
  const items = [
    {
      key: "1",
      label: (
        <Link to="/list-products">
          <p className="block px-4 py-2 text-sm">Categories 1</p>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to="/list-products">
          <p className="block px-4 py-2 text-sm">Categories 2</p>
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link to="/list-products">
          <p className="block px-4 py-2 text-sm">Categories 3</p>
        </Link>
      ),
    },
  ];

  return (
    <nav className="hidden md:flex gap-6">
      <Link to="/">
        <p className="text-[24px] font-bold cursor-pointer hover:text-blue-500 items-center">
          Home
        </p>
      </Link>
      <Dropdown
        menu={{
          items,
        }}
        placement="bottom"
        overlayStyle={{ minWidth: "1000px" }} // Set dropdown menu width here
      >
        <Link to="/list-products">
          <p className="flex text-[24px] font-bold cursor-pointer text-center hover:text-blue-500 items-center">
            Shop
            <IoMdArrowDropdown />
          </p>
        </Link>
      </Dropdown>

      <Link to="/about">
        <p className="text-[24px] font-bold cursor-pointer hover:text-blue-500 items-center">
          About
        </p>
      </Link>
      <Link to="/contact">
        <p className="text-[24px] font-bold cursor-pointer hover:text-blue-500 items-center">
          Contact
        </p>
      </Link>
    </nav>
  );
}
