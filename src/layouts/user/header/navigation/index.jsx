import { Dropdown } from "antd";
import React from "react";

import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Navigation() {
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
          className="block px-4 py-2 text-sm" // Tailwind classes for padding and text size
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
          className="block px-4 py-2 text-sm"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
          className="block px-4 py-2 text-sm"
        >
          3rd menu item
        </a>
      ),
    },
  ];

  const categories = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
          className="block px-4 py-2 text-sm"
        >
          1st category item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
          className="block px-4 py-2 text-sm"
        >
          2nd category item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
          className="block px-4 py-2 text-sm"
        >
          3rd category item
        </a>
      ),
    },
  ];

  return (
    <nav className="hidden md:flex gap-6">
      <p className="text-[24px] font-bold cursor-pointer hover:text-blue-500 items-center">
        Home
      </p>
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
      <Dropdown
        menu={{
          items: categories,
        }}
        placement="bottom"
        overlayStyle={{ minWidth: "300px" }} // Set dropdown menu width here
      >
        <p className="flex text-[24px] font-bold cursor-pointer text-center hover:text-blue-500 items-center">
          Categories
          <IoMdArrowDropdown />
        </p>
      </Dropdown>
    </nav>
  );
}
