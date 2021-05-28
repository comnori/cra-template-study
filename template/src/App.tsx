import { ConfigProvider } from "antd";
import "antd/dist/antd.css";
import ko_KR from "antd/es/locale/ko_KR";
import _ from "lodash";
import Exception, { ExceptionType } from "pages/Exception";
import { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RouteWithMenuItemsData from "routes/RouteData";
import RouteUtils from "utils/RouteUtils";
import "./styles/App.css";

/**
 * AntD Locale force setting For Date-fns locale
 * @see https://github.com/ant-design/ant-design/issues/26699
 */
ko_KR.DatePicker!.lang.locale = "ko";

/**
 * 서버에서 Menu를 가져와서 동적으로 생성해야 할 경우 `RouteData.ts` 파일 구조 참조
 *
 * See {@link src/routes/RouteData.ts}
 */
const routeItems = RouteUtils.exportRouteItems(RouteWithMenuItemsData);

const routes = _.map(routeItems, ({ linkTo, component }, key) => (
	<Route exact key={key} path={linkTo}>
		{component}
	</Route>
)).concat(
	<Route key={404}>
		<Exception type={ExceptionType.NotFound} />
	</Route>
);

function App() {
	return (
		<ConfigProvider locale={ko_KR}>
			<Router>
				<Suspense fallback={<Exception type={ExceptionType.Loading} />}>
					<Switch>{routes}</Switch>
				</Suspense>
			</Router>
		</ConfigProvider>
	);
}

export default App;
