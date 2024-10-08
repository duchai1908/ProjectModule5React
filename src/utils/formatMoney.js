export const formatCurrencyVND = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

export const newDateArrive = () => {
  const currentDate = new Date(); // Get the current date
  currentDate.setDate(currentDate.getDate() + 3); // Add 3 days
  return currentDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
};
