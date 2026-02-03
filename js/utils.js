export function formatDate(dateStr) {
    const date = new Date(dateStr);
    return isNaN(date) ? dateStr : date.toLocaleDateString('ru-RU');
}