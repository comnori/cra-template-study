import { ConfigProvider } from "antd";
import "antd/dist/antd.css";
import ko_KR from "antd/es/locale/ko_KR";
import Homepage from "components/pages/Homepage";
import "./styles/App.css";

ko_KR.DatePicker!.lang.locale = "ko";

function App() {
	return (
		<ConfigProvider locale={ko_KR}>
			<Homepage />;
		</ConfigProvider>
	);
}

export default App;
