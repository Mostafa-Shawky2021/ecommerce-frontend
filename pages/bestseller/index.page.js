import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { dehydrate, QueryClient } from "@tanstack/react-query";

import { useProductsBestSeller } from "./hooks";

import { fetchProductsBestSeller } from "./queries";

import { generateQueryStringFilter } from "@root/utils";

import { Container, Row, Col } from "react-bootstrap";
import { BreadCrumbLayout } from "@root/components/layout";
import { ProductsList } from "@root/components/productslist";
import { SidebarFilter } from "@root/components/sidebars/sidebarfilter";

import { queryKeys } from "./data";

export async function getServerSideProps({ query }) {
	const queryClient = new QueryClient();

	let filterQueryString = "";
	filterQueryString =
		Object.keys(query).length > 0
			? generateQueryStringFilter(query) // extract query object data to make reqeust with filter rule
			: "";

	await queryClient.prefetchQuery(queryKeys.BEST_SELLER(1, filterQueryString), () => fetchProductsBestSeller(1, filterQueryString));

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}

const LatestProdutsPage = () => {
	const [pageNumber, setPageNumber] = useState(1);

	const router = useRouter();

	const latestProducts = useProductsBestSeller(pageNumber, router.query);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pageNumber]);

	const breadCrumbData = [
		{ label: "الصفحة الرئيسية", link: "/homepage" },
		{ label: "الأكثر مبيعاً", active: true },
	];

	return (
		<>
			<BreadCrumbLayout data={breadCrumbData} />
			<Container fluid="xxl">
				<Row className="g-0">
					<Col xs={12} md={4} lg={3}>
						<SidebarFilter pageNumber={pageNumber} />
					</Col>
					<Col xs={12} md={8} lg={9} style={{ position: "relative" }}>
						{latestProducts.data?.products ? <ProductsList productsData={latestProducts.data} isFetchingProducts={latestProducts.isFetching} setPageNumber={setPageNumber} /> : <p>ليس متوفر منتجات في الوقت الحالي</p>}
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default LatestProdutsPage;