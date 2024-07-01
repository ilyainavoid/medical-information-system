export const formatDate = (inputDate: string | null | undefined): string => {
    if (!inputDate) {
        return '';
    }

    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}

export const formatDateTime = (isoString: string): { date: string, time: string } => {
    if (!isoString) {
        return {date: '', time: ''};
    }
    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const year = date.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;

    return { date: formattedDate, time: formattedTime };
};