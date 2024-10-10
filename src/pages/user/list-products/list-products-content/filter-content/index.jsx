import React, { useState } from "react";
import { Menu } from "antd";
import { Checkbox } from "antd";

export default function FilterContent({ handleFilterValueLeft }) {
  // State to store the single checked value
  const [checkedValue, setCheckedValue] = useState(null);

  // Handle checkbox changes
  const onChange = (color, e) => {
    const { checked } = e.target;

    // If the checkbox is checked, set it as the selected value, otherwise reset the value
    const newCheckedValue = checked ? color : null;
    setCheckedValue(newCheckedValue);

    // Send the updated checked value to ProductsContent
    handleFilterValueLeft(newCheckedValue);
  };

  // Menu items with checkboxes
  const items = [
    {
      key: "sub2",
      label: <p className="font-bold">Color</p>,
      children: [
        {
          key: "1",
          label: (
            <Checkbox
              onChange={(e) => onChange("red", e)}
              checked={checkedValue === "red"}
            >
              Red
            </Checkbox>
          ),
        },
        {
          key: "2",
          label: (
            <Checkbox
              onChange={(e) => onChange("blue", e)}
              checked={checkedValue === "blue"}
            >
              Blue
            </Checkbox>
          ),
        },
        {
          key: "3",
          label: (
            <Checkbox
              onChange={(e) => onChange("green", e)}
              checked={checkedValue === "green"}
            >
              Green
            </Checkbox>
          ),
        },
      ],
    },
  ];

  return (
    <div className="m-5 ">
      {/* <Menu
        className="md:w-[300px] w-[100%]"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub2"]}
        mode="inline"
        items={items}
      /> */}
      <img
        src="https://i.pinimg.com/564x/1d/6e/fc/1d6efc0a6d3797bc9aa11996ce4b88b3.jpg"
        className="md:max-w-[400px] md:w-[300px] w-[100%] rounded-lg"
        alt=""
      />
    </div>
  );
}
