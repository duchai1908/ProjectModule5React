import { Button, Input, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { deleteRating, getAllRating } from "../../../services/review";
import { useDebounce } from "@uidotdev/usehooks";

export default function CommentManager() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(4);
  const [search, setSearch] = useState("");
  const [listData, setListData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalEleRating, setTotalEleRating] = useState(0);
  const debouncedSearchTerm = useDebounce(search, 500);

  useEffect(() => {
    loadingData();
  }, [debouncedSearchTerm]);
  const loadingData = async () => {
    const ratingData = await getAllRating(currentPage, pageSize, search);
    setPageSize(ratingData.data.data.pageable.pageSize);
    setPageNumber(ratingData.data.data.pageable.pageNumber);
    setTotalEleRating(ratingData.data.data.totalElements)
    setListData(ratingData.data.data.content);
  };
 
    const handlePageChange = async (page)=>{
        const changePage = await getAllRating(page -1, pageSize,search);
        setCurrentPage (page);
        setPageSize(changePage.data.data.pageable.pageSize);
        setPageNumber(changePage.data.data.pageable.pageNumber);
        setTotalEleRating(changePage.data.data.totalElements)
        setListData(changePage.data.data.content);
    }
    const handleDelete = async (id) =>{
        const deleteRemove = await deleteRating(id);
        loadingData();
    }
    const handleChange = (e) => {
        setSearch(e.target.value);  
    }

  return (
    <div>
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[24px] font-bold">Danh sách đánh giá</h1>
        </div>
        <div className="mb-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Input.Search
              className="w-[300px]"
              placeholder="Tìm kiếm đánh giá theo tên"
              //   onSearch={handleSearch} // Gọi hàm khi tìm kiếm
              //   value={searchTerm} // Gán giá trị cho input
                onChange={handleChange}
            />
          </div>
        </div>
        {listData && listData.length > 0 ? (
          <>
            <div className="overflow-x-auto max-h-[65vh] overflow-scroll">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 h-11 text-center">STT</th>
                    <th className="px-4 h-11 text-left">Username</th>
                    <th className="px-4 h-11 text-left">Đánh giá</th>
                    <th className="px-4 h-11 text-left">Bình luận</th>
                    <th className="px-4 h-11 text-left">Sản phẩm</th>
                    <th className="px-4 h-11 text-left">Ngày đánh giá</th>
                    <th className="px-4 h-11 text-left">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {listData.map((item, index) => {
                    return (
                      <tr className="border-b" key={item.id}>
                        <td className="px-4 h-11">{pageNumber * pageSize + index + 1}</td>
                        <td className="px-4 h-11">{item.user.username}</td>
                        <td className="px-4 h-11 text-left">{item.rating}</td>
                        <td className="px-4 h-11 text-left">{item.comment}</td>
                        <td className="px-4 h-11 text-left">{item.products.name}</td>
                        <td className="px-4 h-11 text-left">{new Date(item.createdAt).toLocaleDateString('en-GB')}</td>
                        <td className="px-4 h-11 text-center ">
                          <Button color="danger" variant="solid" onClick={()=>handleDelete(item.id)}>
                            Xoá
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-between items-center ">
                   <div className="flex items-center gap-5">
                     <div className="flex items-center gap-3">
                       <Pagination
                         current={currentPage}
                         total={totalEleRating}
                         pageSize={pageSize}
                         onChange={handlePageChange}
                       />
                     </div>
                   </div>
                 </div>
          </>
        ) : (
          <div>Không có dữ liệu</div>
        )}
      </div>
    </div>
  );
}
