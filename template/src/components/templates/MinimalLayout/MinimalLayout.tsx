import { Layout } from "antd";
import classes from "styles/pages/templates/MinimalLayout.module.scss";

const { Content } = Layout;

function MinimalLayout({ children }: { children: React.ReactNode }) {
	return (
		<Layout>
			<Content className={classes.content__height}>{children}</Content>
		</Layout>
	);
}

export default MinimalLayout;
