import generateCalendar from "antd/es/calendar/generateCalendar";
import "antd/es/calendar/style";
import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns";

const Calendar = generateCalendar<Date>(dateFnsGenerateConfig);

export default Calendar;
