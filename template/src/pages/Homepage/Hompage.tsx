import { Breadcrumb, Col, Row } from "antd";
import HomepageFooter from "components/organisms/HomepageFooter";
import HomepageHeader from "components/organisms/HomepageHeader";
import BasicLayout from "components/templates/BasicLayout/BasicLayout";

function Homepage() {
	return (
		<BasicLayout header={<HomepageHeader />} footer={<HomepageFooter />}>
			<Breadcrumb style={{ margin: "16px 0" }}>
				<Breadcrumb.Item>Home</Breadcrumb.Item>
				<Breadcrumb.Item>List</Breadcrumb.Item>
				<Breadcrumb.Item>App</Breadcrumb.Item>
			</Breadcrumb>
			<Row>
				<Col>Contents</Col>
			</Row>
		</BasicLayout>
	);
}

export default Homepage;
