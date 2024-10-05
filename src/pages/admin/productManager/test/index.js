//viết hàm tìm số nhỏ nhất

function findMin(arr) {
  let min = arr[0]; // giả sử phần tử đầu tiên là số nh�� nhất

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i]; // nếu phần tử hiện tại nh�� hơn số nh�� nhất đã tìm thấy, thay đ��i giá trị min
    }
  }

  return min; // trả về số nh�� nhất
}

// viết hàm tìm số chẵn

function findEven(arr) {
  let evenArr = []; // tạo mảng để chứa các số ch��n

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      evenArr.push(arr[i]); // nếu phần tử hiện tại chia hết cho 2, thêm vào mảng evenArr
    }
  }

  return evenArr; // trả về mảng chứa các số ch��n
}
