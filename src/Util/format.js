export const formatVND = (value) => {
    const formater = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND"
    });

    return formater.format(value);
}

export const formatVNtime = (value) => {
    const timeStr = new Date(value);
    const formater = new Intl.DateTimeFormat("vi-VN", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    return formater.format(timeStr);
}