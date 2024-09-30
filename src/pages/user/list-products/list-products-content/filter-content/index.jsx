import React from "react";
import { Menu } from "antd";
import { Checkbox } from 'antd';

export default function FilterContent() {
  const onClick = (e) => {
    console.log("click ", e);
  };
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const items = [
    {
      key: "sub1",
      // label: "Navigation Three",
      label: <p className="font-bold">Availability</p>,
      // icon: <SettingOutlined />,
      children: [
        {
          key: "1",
          label: <Checkbox onChange={onChange}>In Stock</Checkbox>,
        },
        {
          key: "2",
          label: <Checkbox onChange={onChange}>Out Stock</Checkbox>,
        },
      ],
    },
    {
      key: "sub2",
      // label: "Navigation Three",
      label: <p className="font-bold">Color</p>,
      // icon: <SettingOutlined />,
      children: [
        {
          key: "3",
          label: <Checkbox onChange={onChange}>Red</Checkbox>,
        },
        {
          key: "4",
          label: <Checkbox onChange={onChange}>Blue</Checkbox>,
        },
        {
          key: "5",
          label: <Checkbox onChange={onChange}>Green</Checkbox>,
        },
      ],
    },
  ];
  

  return (
    <div className="m-5">
      {/* <div className="block md:hidden mb-4 w-auto h-[46px]">
        <button className="w-[100%] h-[46px]">Filter</button>
      </div> */}
      <Menu
        onClick={onClick}
        className="md:w-[300px] w-[100%]"
        // style={{
        //   width: 300,
        // }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1","sub2"]}
        mode="inline"
        items={items}
      />
    </div>
  );
}
