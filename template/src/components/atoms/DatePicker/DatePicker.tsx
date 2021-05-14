import generatePicker from "antd/es/date-picker/generatePicker";
import "antd/es/date-picker/style/index";
import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns";

const DatePicker = generatePicker<Date>(dateFnsGenerateConfig);

export default DatePicker;
