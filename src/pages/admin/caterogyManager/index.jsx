import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findAllCategory } from "../../../services/categoryService";

export default function CategoryManager() {
  const { data, status, error } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(findAllCategory());
  }, []);


  console.log("Data: ", data);
  return (
    <>
      <>
        <div>{status === "pending" ? "Loading..." : ""}</div>
        <div>
          {data && (
            <ul>
              {data.data.content.map((d) => (
                <li>{d.name}</li>
              ))}
            </ul>
          )}
        </div>
      </>
    </>
  );
}
