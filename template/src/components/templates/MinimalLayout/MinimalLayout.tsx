import { Layout } from "antd";

const { Content } = Layout;

function MinimalLayout({ children }: { children: React.ReactNode }) {
	return (
		<Layout>
			<Content>{children}</Content>
		</Layout>
	);
}

export default MinimalLayout;
