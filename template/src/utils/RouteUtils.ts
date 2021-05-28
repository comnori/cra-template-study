import _ from "lodash";
import { ItemType, RouteWithMenuItem, SubMenuItem } from "routes/RouteData";
import traverse, { TraverseContext } from "traverse";

const RouteUtils = {
	exportRouteItems,
	appendContextLink,
};

/**
 * RouteWithMenuItem 추출
 * @param routeWithMenuItemsData
 * @returns
 */
function exportRouteWithMenuItem(routeWithMenuItemsData: any) {
	/**
	 * traverse 함수의 this를 사용하기 위해서 화살 함수를 사용할 수 없으며 eslint disable
	 *
	 * */
	// eslint-disable-next-line func-names
	const leaves = traverse(routeWithMenuItemsData).reduce(function (acc, x) {
		if (x.type === ItemType.RouteWithMenuItem || x.type === ItemType.RouteItem) {
			acc.push({ ...x, linkTo: appendContextLink(this.parent!, x.linkTo) });
		}
		return acc;
	}, []);

	return leaves;
}

/**
 * 상위 ItemGroup과 SubMenuItem의 Context 값을 linkTo 앞에 추가하는 함수
 * @param x
 * @param link
 * @returns
 */
function appendContextLink(x: TraverseContext, link: string): string {
	if (x.isRoot) {
		return `${link}`;
	}

	if (Array.isArray(x.node)) {
		return appendContextLink(x.parent!, link);
	}

	if (_.find(x, "context")) {
		const linkWithContext = `${x.node.context}${link}`;

		if (x.parent?.isRoot) {
			return linkWithContext;
		}

		return appendContextLink(x.parent!, linkWithContext);
	}

	return `${link}`;
}

function exportRouteItems(routeWithMenuItemsData: Array<RouteWithMenuItem | SubMenuItem>): Array<RouteWithMenuItem> {
	return exportRouteWithMenuItem(routeWithMenuItemsData);
}

export default RouteUtils;
