import { Badge, Dropdown } from "antd";
import React from "react";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline, IoSearch } from "react-icons/io5";


export default function ForUsers() {
    const items = [
      {
        key: "1",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="#"
          >
            My Accounts
          </a>
        ),
      },
      {
        key: "2",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="#"
          >
            WishList
          </a>
        ),
      },
      {
        key: "3",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="#"
          >
            Sign Out
          </a>
        ),
      },
    ];
  return (
    <>
      <div className="flex font-[16px] gap-6">
        {/* <IoSearch className="text-[20px] cursor-pointer" /> */}
        <Dropdown
          menu={{
            items,
          }}
          placement="bottom"
        >
          <FaRegUser className="text-[28px] cursor-pointer" />
        </Dropdown>
        <Badge count={10}>
          <IoCartOutline className="text-[30px] cursor-pointer" />
        </Badge>
      </div>
    </>
  );
}
