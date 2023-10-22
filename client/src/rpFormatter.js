export const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0, // Jumlah desimal minimal (0 berarti bilangan bulat)
  }).format(number);
};
