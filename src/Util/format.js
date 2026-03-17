export const formatVND = (value) => {
    const formater = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND"
    });

    return formater.format(value);
}