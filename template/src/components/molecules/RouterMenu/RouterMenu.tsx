import { Menu } from "antd";
// eslint-disable-next-line import/no-extraneous-dependencies
import { History } from "history";
import _ from "lodash";
import { useHistory, useLocation, useParams } from "react-router-dom";
import RouteWithMenuItemsData, { ItemType, RouteWithMenuItem, SubMenuItem } from "routes/RouteData";
import traverse from "traverse";
import RouteUtils from "utils/RouteUtils";

function renderMenuItem(routeWithMenuItemsData: Array<RouteWithMenuItem | SubMenuItem>, history: History) {
	return _.map(routeWithMenuItemsData, (selectedArray) => appendChildren(selectedArray, history));
}

function appendChildren(item: RouteWithMenuItem | SubMenuItem, history: History) {
	if (item.type === ItemType.RouteWithMenuItem) {
		const menuItem = item as RouteWithMenuItem;
		const handleClick = () => {
			history.push(menuItem.linkTo);
		};

		return (
			<Menu.Item key={menuItem.key} onClick={handleClick}>
				{menuItem.title}
			</Menu.Item>
		);
	}

	if (item.type === ItemType.SubMenuItem) {
		const subMenuItem = item as SubMenuItem;

		let children;

		if (_.has(item, "items")) {
			children = renderMenuItem(subMenuItem.items!, history);
		}

		if (_.has(item, "itemGroup")) {
			const itemGroup = subMenuItem.itemGroup!;
			children = (
				<Menu.ItemGroup title={itemGroup.title}>{renderMenuItem(itemGroup.items!, history)}</Menu.ItemGroup>
			);
		}

		return (
			<Menu.SubMenu key={subMenuItem.key} title={subMenuItem.title}>
				{children}
			</Menu.SubMenu>
		);
	}

	return null;
}

function addKey(routeWithMenuItemData: Array<RouteWithMenuItem | SubMenuItem>): Array<RouteWithMenuItem | SubMenuItem> {
	// eslint-disable-next-line
	const mapTree = traverse(routeWithMenuItemData).map(function (x) {
		if (x.type === ItemType.RouteWithMenuItem || x.type === ItemType.SubMenuItem) {
			const filterdPath = [...this.path];
			_.remove(filterdPath, (n) => n === "itemGroup" || n === "items");

			if (x.type === ItemType.RouteWithMenuItem) {
				this.update({
					...x,
					key: _.join(filterdPath, "-"),
					linkTo: RouteUtils.appendContextLink(this.parent!, x.linkTo),
				});
			} else {
				this.update({ ...x, key: _.join(filterdPath, "-") });
			}
		}
	});

	return mapTree;
}

function modifiedKeys(filterdPath: string[]) {
	// eslint-disable-next-line func-names
	return traverse(filterdPath).reduce(function (acc, x) {
		const key = _.toNumber(this.key);
		if (this.notRoot) {
			if (key === 0) {
				acc.push(x);
			} else {
				acc.push(`${acc[key - 1]}-${x}`);
			}
		}

		return acc;
	}, []);
}

function getSelectedKeys(
	routeWithMenuItemData: Array<RouteWithMenuItem | SubMenuItem>,
	pathName: string,
	params: {},
	isOpen: boolean
) {
	let defaultOpenKeys: string[] = [];
	// eslint-disable-next-line func-names
	const defaultSelectedKeys = traverse(routeWithMenuItemData).reduce(function (acc, x) {
		if (x.type === ItemType.RouteWithMenuItem && x.linkTo === pathName) {
			acc.push(x.key);
			defaultOpenKeys = [...this.path];

			if (isOpen) {
				_.remove(defaultOpenKeys, (n) => n === "itemGroup" || n === "items");
				defaultOpenKeys = _.slice(defaultOpenKeys, 0, defaultOpenKeys.length - 1);
				defaultOpenKeys = modifiedKeys(defaultOpenKeys);
			}
		}

		return acc;
	}, []);

	return {
		defaultSelectedKeys,
		defaultOpenKeys,
	};
}

function removePathValue(pathName: History.Pathname, params: {}): string {
	if (_.isEmpty(params)) {
		return pathName;
	}

	const splitPath: string[] = _.split(pathName, "/");
	const keys: string[] = _.keys(params);

	return _.chain(splitPath)
		.slice(0, splitPath.length - keys.length)
		.join("/")
		.value();
}

function RouterMenu() {
	const params = useParams();
	const { pathname } = useLocation();
	const history = useHistory();

	const addedKeyMenuData = addKey(RouteWithMenuItemsData);
	const renderMenuItems = renderMenuItem(addedKeyMenuData, history);

	const orgPathName = removePathValue(pathname, params);

	const { defaultSelectedKeys, defaultOpenKeys } = getSelectedKeys(addedKeyMenuData, orgPathName, params, true);

	return (
		<Menu
			theme="dark"
			mode="horizontal"
			defaultSelectedKeys={defaultSelectedKeys}
			defaultOpenKeys={defaultOpenKeys}>
			{renderMenuItems}
		</Menu>
	);
}

export default RouterMenu;
