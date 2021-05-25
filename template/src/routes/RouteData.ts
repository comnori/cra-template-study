import { HomeOutlined } from "@ant-design/icons";
import Homepage from "pages/Homepage";
import { ReactNode } from "react";

export enum ItemType {
	RouteWithMenuItem,
	MenuItemGroup,
	SubMenuItem,
}

interface DefaultTypes {
	readonly type: ItemType;
	readonly title: string;
	readonly icon?: ReactNode;
}

export interface RouteWithMenuItem extends DefaultTypes {
	readonly linkTo: string;
	readonly component: ReactNode;
}

export interface MenuItemGroup extends DefaultTypes {
	readonly context: string;
	readonly items?: Array<RouteWithMenuItem | SubMenuItem>;
}

export interface SubMenuItem extends MenuItemGroup {
	readonly key: string;
	readonly context: string;
	readonly itemGroup?: MenuItemGroup;
}

/**
 * ItemType.SubMenuItem 하위의 RouteWithMenuItem은 해당 SubMenuItem의 Context가 linkTo 앞에 추가됨
 * @example 비전 페이지 링크 = /company-info/vision
 */
const RouteWithMenuItemsData: Array<RouteWithMenuItem | SubMenuItem> = [
	{
		type: ItemType.RouteWithMenuItem,
		title: "Home",
		linkTo: "/",
		icon: HomeOutlined,
		component: Homepage,
	},
	{
		type: ItemType.SubMenuItem,
		title: "회사 소개",
		key: "CompanyInfo",
		context: "/company-info",
		items: [
			{
				type: ItemType.RouteWithMenuItem,
				title: "비전",
				linkTo: "/vision",
				component: Homepage,
			},
			{
				type: ItemType.RouteWithMenuItem,
				title: "기업윤리",
				linkTo: "/business-ethics",
				component: Homepage,
			},
			{
				type: ItemType.RouteWithMenuItem,
				title: "회사연혁",
				linkTo: "/company-history",
				component: Homepage,
			},
			{
				type: ItemType.SubMenuItem,
				title: "회사 소개2222",
				key: "CompanyInfo2",
				context: "/company-info",
				items: [
					{
						type: ItemType.RouteWithMenuItem,
						title: "비전",
						linkTo: "/vision",
						component: Homepage,
					},
					{
						type: ItemType.RouteWithMenuItem,
						title: "기업윤리",
						linkTo: "/business-ethics",
						component: Homepage,
					},
					{
						type: ItemType.RouteWithMenuItem,
						title: "회사연혁",
						linkTo: "/company-history",
						component: Homepage,
					},
				],
			},
		],
	},
	{
		type: ItemType.SubMenuItem,
		title: "사업 소개",
		key: "BussinessInfo",
		context: "/bussiness-info",
		itemGroup: {
			type: ItemType.MenuItemGroup,
			title: "Industry",
			context: "/industry",
			items: [
				{
					type: ItemType.RouteWithMenuItem,
					title: "통신",
					linkTo: "/communication",
					component: Homepage,
				},
			],
		},
	},
];

export default RouteWithMenuItemsData;
