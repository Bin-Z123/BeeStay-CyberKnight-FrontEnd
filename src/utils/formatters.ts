import { format } from 'date-fns';
export const formatVND = (value: number): string => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(value);
}

export function formatDateWithTimeToSQL(date: Date, hours = 14, minutes = 0, seconds = 0): string {
    const d = new Date(date);
    d.setHours(hours, minutes, seconds, 0);

    const pad = (n: number): string => n.toString().padStart(2, '0');

    const yyyy = d.getFullYear();
    const MM = pad(d.getMonth() + 1); // tháng bắt đầu từ 0
    const dd = pad(d.getDate());
    const HH = pad(d.getHours());
    const mm = pad(d.getMinutes());
    const ss = pad(d.getSeconds());

    return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
}

export function formatDateWithTime(date: Date, hours = 14, minutes = 0, seconds = 0): string {
    const d = new Date(date);
    d.setHours(hours, minutes, seconds, 0);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const day = String(d.getDate()).padStart(2, '0');
    const hour = String(d.getHours()).padStart(2, '0');
    const minute = String(d.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hour}:${minute}`; // Chính xác định dạng input cần
}