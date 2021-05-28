import { Layout } from "antd";
import React, { lazy } from "react";

const RouterMenu = lazy(() => import("components/molecules/RouterMenu"));

const { Header } = Layout;

function HomepageHeader() {
	return (
		<Header>
			<RouterMenu />
		</Header>
	);
}

export default HomepageHeader;
