import { Layout } from "antd";

const { Content } = Layout;

function BasicLayout({
	children,
	header,
	footer,
}: {
	children: React.ReactNode;
	header: React.ReactNode;
	footer: React.ReactNode;
}) {
	return (
		<Layout>
			{header}
			<Content>{children}</Content>
			{footer}
		</Layout>
	);
}

export default BasicLayout;
