import { Button, Result } from "antd";
import MinimalLayout from "components/templates/MinimalLayout/MinimalLayout";

export enum ExceptionType {
	NotFound = 404,
}

/**
 * React Router 에서 찾을 수 없는 페이지를 만난 경우 호출 페이지
 */
function Exception({ type }: { type: ExceptionType }) {
	switch (type) {
		case ExceptionType.NotFound:
			return (
				<MinimalLayout>
					<Result
						status="404"
						title="404"
						subTitle="죄송합니다. 방문하실려는 페이지가 존재하지 않습니다."
						extra={<Button type="primary">Home으로 돌아가기</Button>}
					/>
				</MinimalLayout>
			);
	}
}

export default Exception;
