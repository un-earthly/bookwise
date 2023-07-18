export function formatDate(dateStr: string, format: string = 'YYYY-MM-DD'): string {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());

    format = format.replace('DD', day);
    format = format.replace('MM', month);
    format = format.replace('YYYY', year);

    return format;
}
