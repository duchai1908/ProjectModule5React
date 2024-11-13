import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../../services/productService";
import { findProductDetailByProductId } from "../../../services/productDetailService";

const TestPage = () => {
  const dispatch = useDispatch();
  const productId = 1;

  // Lấy dữ liệu từ redux store
  const product = useSelector((state) => state.product.data); // assuming state.product holds product data
  const productDetails = useSelector((state) => state.productDetail.data); // assuming state.productDetail holds product detail data
  const productStatus = useSelector((state) => state.product.status);
  const productDetailStatus = useSelector(
    (state) => state.productDetail.status
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Sử dụng Promise.all để gọi cả 2 API cùng một lúc
        await Promise.all([
          dispatch(getProductById({ id: productId })),
          dispatch(findProductDetailByProductId({ id: productId })),
        ]);
      } catch (error) {
        console.error("Error fetching product and details:", error);
      }
    };

    fetchData();
  }, [dispatch, productId]);

  if (productStatus === "pending" || productDetailStatus === "pending") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Product Information</h1>
      {product && (
        <div>
          <p>Product Name: {product.name}</p>
        </div>
      )}

      <h2>Product Details</h2>
      {productDetails && productDetails.length > 0 ? (
        productDetails.map((detail) => (
          <div key={detail.id}>
            <p>
              Detail Color:{" "}
              {typeof detail.color === "object"
                ? JSON.stringify(detail.color)
                : detail.color}
            </p>
            <p>
              Detail Size:{" "}
              {typeof detail.size === "object"
                ? JSON.stringify(detail.size)
                : detail.size}
            </p>
          </div>
        ))
      ) : (
        <p>No details available for this product.</p>
      )}
    </div>
  );
};

export default TestPage;

// export default function TestPage() {
//   return <div>TestPage</div>;
// }
