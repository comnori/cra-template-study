import { Menu } from "antd";
import _ from "lodash";
import { ItemType, RouteWithMenuItem, SubMenuItem } from "routes/RouteData";

function renderMenuItem(routeWithMenuItemsData: Array<RouteWithMenuItem | SubMenuItem>) {
	return _.map(routeWithMenuItemsData, (selectedArray) => appendChildren(selectedArray));
}

function appendChildren(item: RouteWithMenuItem | SubMenuItem) {
	if (item.type === ItemType.RouteWithMenuItem) {
		return <Menu.Item key={_.uniqueId()}>{item.title}</Menu.Item>;
	}

	if (item.type === ItemType.SubMenuItem) {
		const subMenuItem = item as SubMenuItem;

		let children;

		if (_.has(item, "items")) {
			children = renderMenuItem(subMenuItem.items!);
		}

		if (_.has(item, "itemGroup")) {
			const itemGroup = subMenuItem.itemGroup!;
			children = <Menu.ItemGroup title={itemGroup.title}>{renderMenuItem(itemGroup.items!)}</Menu.ItemGroup>;
		}

		return (
			<Menu.SubMenu key={subMenuItem.key} title={subMenuItem.title}>
				{children}
			</Menu.SubMenu>
		);
	}

	return <Menu.Item key={_.uniqueId()}>임시</Menu.Item>;
}

function RouterMenu({ routeWithMenuItemData }: { routeWithMenuItemData: Array<RouteWithMenuItem | SubMenuItem> }) {
	const renderMenuItems = renderMenuItem(routeWithMenuItemData);
	return (
		<Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
			{renderMenuItems}
		</Menu>
	);
}

export default RouterMenu;
