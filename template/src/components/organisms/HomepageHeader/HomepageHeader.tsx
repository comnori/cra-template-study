import { Layout } from "antd";
import RouterMenu from "components/molecules/RouterMenu";
import RouteWithMenuItemsData from "routes/RouteData";

const { Header } = Layout;

function HomepageHeader() {
	return (
		<Header>
			<RouterMenu routeWithMenuItemData={RouteWithMenuItemsData} />
		</Header>
	);
}

export default HomepageHeader;
