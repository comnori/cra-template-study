import { PickerTimeProps } from "antd/es/date-picker/generatePicker";
import { Omit } from "antd/es/_util/type";
import DatePicker from "components/atoms/DatePicker";
import { forwardRef } from "react";

export interface TimePickerProps extends Omit<PickerTimeProps<Date>, "picker"> {}

const TimePicker = forwardRef<any, TimePickerProps>((props: TimePickerProps, ref) => (
	// eslint-disable-next-line react/jsx-props-no-spreading
	<DatePicker {...props} picker="time" mode={undefined} ref={ref} />
));

TimePicker.displayName = "TimePicker";

export default TimePicker;
