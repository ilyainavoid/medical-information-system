import dayjs from "dayjs";

export const disabledDate = (current: dayjs.ConfigType): boolean => {
    return dayjs(current).isAfter(dayjs(), 'day');
};