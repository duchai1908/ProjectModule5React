import React, { useEffect, useRef, useState } from "react";
import { Button, Input, notification } from "antd";
import { useParams } from "react-router-dom";
import { addReviewProduct } from "../../../../../../services/review";
import { useSelector } from "react-redux";

export default function FormReviewUsers({handleReload}) {
  const formRef = useRef();
  const {id} = useParams();
  const[rating,setRating] = useState(null);
  const[comment,setComment]= useState("");
  const[error,setError] = useState("");
  const[review,setReview] = useState({});
  const[valueComment,setValueComment] = useState("");
  const data = useSelector((state)=>state.auth);
  const handleRating = (e)=>{
    setRating(e.target.value);
  }
  const handleComment = (event) => {
    setComment(event.target.value); 
  };
  /**
   * @description gọi api thêm đánh giá
   */
  useEffect(()=>{
    if(Object.keys(review).length > 0){
      const fetchAddReview = async () => {
        try {
          const response = await addReviewProduct(review);
          //  window.location.reload();
          handleReload();
          notification.success({
            message: "Đánh giá thành công"
          })
        } catch (error) {
          console.error("Error fetching review: ", error.response);
        }
      }
      // tạo hàm để gọi api bất đồng bộ review
      fetchAddReview();
    }
  },[review])

  /**
   * 
   * @param {*} e sự kiện khi submit form
   * @description gửi đánh giá sản phẩm
   * Auth: Duc Hai (07/10/2024)
   */
  const handleSubmitReview = (e)=>{
    e.preventDefault();
      let check = true;
      if(rating == null){
        setError("Bạn phải đánh giá sản phẩm này")
        check = false;
      }else if(comment == ""){
        setError("Bạn chưa viết đánh giá cho sản phẩm này")
        check = false;
      }  
      const productId = id?.id || id;
      if(check == true){
        setReview({
          "rating": +rating,
          "comment": comment,
          "productId": +productId,
        })
        formRef.current.reset();
        setComment("");
      }
  }

  
  return (
    <>
    
      <form ref={formRef}  action="" onSubmit={(e)=>handleSubmitReview(e)}>
        <div>
          <p className="text-[24px] font-bold text-center my-5">
            Write a review
          </p>
          <p className="text-[20px] text-center my-5">Rating</p>
          <div class="radio">
            <input id="rating-5" type="radio" name="rating" value="5" onChange={(e)=>handleRating(e)}/>
            <label for="rating-5" title="5 stars">
              <svg
                viewBox="0 0 576 512"
                height="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
              </svg>
            </label>

            <input id="rating-4" type="radio" name="rating" value="4" onChange={(e)=>handleRating(e)} />
            <label for="rating-4" title="4 stars">
              <svg
                viewBox="0 0 576 512"
                height="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
              </svg>
            </label>

            <input id="rating-3" type="radio" name="rating" value="3" onChange={(e)=>handleRating(e)} />
            <label for="rating-3" title="3 stars">
              <svg
                viewBox="0 0 576 512"
                height="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
              </svg>
            </label>

            <input id="rating-2" type="radio" name="rating" value="2" onChange={(e)=>handleRating(e)} />
            <label for="rating-2" title="2 stars">
              <svg
                viewBox="0 0 576 512"
                height="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
              </svg>
            </label>

            <input id="rating-1" type="radio" name="rating" value="1" onChange={(e)=>handleRating(e)} />
            <label for="rating-1" title="1 star">
              <svg
                viewBox="0 0 576 512"
                height="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
              </svg>
            </label>
          </div>
          <div className="text-center my-5">
            <p>Review</p>
          </div>
          <div className="flex justify-center text-[20px]">
            <Input.TextArea rows={4} className="input-review w-[70%]" value={comment} onChange={handleComment}/>
            
          </div>
          {error && (
              <p className="text-center text-red-500 mt-2">{error}</p>
            )}

          <div className="flex justify-center my-5">
            <Button htmlType="submit">Submit Comment</Button>
          </div>
        </div>
      </form>
    </>
  );
}
