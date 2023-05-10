import { useState, useRef } from "react";

import { useProductVariantsData, useFilter, useCloseMenuAction } from "@root/hooks";

import { CircularProgress } from "@mui/material";
import Slider from "@mui/material/Slider";
import { Button } from "react-bootstrap";

import CloseIcon from "@mui/icons-material/Close";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import style from "./sidebarfilter.module.scss";

const SidebarFilter = ({ pageNumber, dynamicRoute, additionalQuery }) => {
	const [sideBarFilterMobile, setSideBarFilterMobile] = useState(false);
	const { filterRules, applyFilter, resetFilter, handleOnChangeInputFilter } = useFilter(pageNumber, dynamicRoute, additionalQuery);

	const { data: productVariants, isLoading: isLoadingProductsVariants } = useProductVariantsData();

	const sideBarFilterMObileRef = useRef(null);

	// close mobile fitler menu on mouse click, and on esacpe key down
	useCloseMenuAction(setSideBarFilterMobile, sideBarFilterMObileRef);

	const valueLabelFormat = (value) => value;

	const handleToggleSidebarMobileFilter = (event) => {
		event.stopPropagation();
		setSideBarFilterMobile(!sideBarFilterMobile);
	};

	const loadingIconStyle = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%)",
	};
	return (
		<div className={style.sidebarWrapper}>
			<Button onClick={handleToggleSidebarMobileFilter} className={style.applyFilterMobile}>
				<FilterAltIcon fontSize="small" />
			</Button>
			<div className={`${style.sidebarWrapperMobile} ${sideBarFilterMobile ? style.openSideBarFitlerMobile : ""}`} ref={sideBarFilterMObileRef}>
				<Button className={style.closeFilterIcon}>
					<CloseIcon className={style.coloricon} fontSize="xs" onClick={() => setSideBarFilterMobile(false)} />
				</Button>
				<div className={style.priceFilter}>
					<div className="d-flex align-items-center justify-content-between">
						<h4 className={style.title} style={{ margin: "0px" }}>
							السعر
						</h4>
						<Button className={style.clearFilter} onClick={() => resetFilter()}>
							مسح الفلتر
							<CloseIcon className={style.coloricon} fontSize="xs" />
						</Button>
					</div>
					<Slider size="large" min={50} max={10000} step={80} getAriaValueText={valueLabelFormat} valueLabelFormat={valueLabelFormat} value={filterRules.price} onChange={handleOnChangeInputFilter("price")} valueLabelDisplay="auto" disableSwap style={{ padding: "1rem 0px", marginTop: "10px" }} />
					<p className={style.priceRange}>
						رينج السعر : {Number(filterRules.price[1]).toLocaleString()}- {Number(filterRules.price[0]).toLocaleString()}
					</p>
				</div>
				<div style={{ position: "relative" }}>
					{isLoadingProductsVariants ? (
						<div style={{ position: "relative", height: "113px" }}>
							<CircularProgress className={style.iconLoading} size={18} />
						</div>
					) : (
						<div>
							{!!productVariants?.brands?.length && (
								<div className={style.filter}>
									<h4 className={style.title}>البراندات</h4>
									<ul className={`list-unstyled ${style.filterList}`}>
										{productVariants.brands.map((brand) => {
											const activeFilterRule = filterRules.brands?.includes(brand.brand_name) ? "checked" : "";
											return (
												<li key={brand.id} className={`${style.filterItem} d-flex align-items-center`}>
													<input className={style.checkBox} type="checkbox" value={brand.brand_name} id={brand.brand_name} onChange={handleOnChangeInputFilter("brands")} checked={activeFilterRule} />
													<label htmlFor={brand.brand_name} className="ms-2">
														{brand.brand_name}
													</label>
												</li>
											);
										})}
									</ul>
								</div>
							)}
							{!!productVariants?.sizes?.length && (
								<div className={style.filter}>
									<h4 className={style.title}>المقاسات</h4>
									<ul className={`list-unstyled ${style.filterList}`}>
										{productVariants.sizes.map((size) => {
											const activeFilterRule = filterRules.sizes.includes(size.size_name) ? "checked" : "";
											return (
												<li key={size.id} className={`${style.filterItem} d-flex align-items-center`}>
													<input className={style.checkBox} type="checkbox" value={size.size_name} id={size.size_name} onChange={handleOnChangeInputFilter("sizes")} checked={activeFilterRule} />
													<label htmlFor={size.size_name} className="ms-2">
														{size.size_name}
													</label>
												</li>
											);
										})}
									</ul>
								</div>
							)}
							{!!productVariants?.colors.length && (
								<div className={style.filter}>
									<h4 className={style.title}>اللون</h4>
									<ul className={`list-unstyled ${style.filterList}`}>
										{productVariants.colors.map((color) => {
											const activeFilterColorChecked = filterRules.colors.includes(color.color_name) ? "checked" : "";
											const activeLabelColorClass = filterRules.colors.includes(color.color_name) ? style.activeColor : "";
											return (
												<li key={color.id} className={`${style.filterItem} d-flex align-items-center`}>
													<input className={style.checkBox} type="checkbox" value={color.color_name} id={color.color_name} onChange={handleOnChangeInputFilter("colors")} checked={activeFilterColorChecked} />
													<label htmlFor={color?.color_name} className="ms-2 d-flex align-items-center w-100">
														<span>{color?.color_name}</span>
														<span style={{ background: color?.color_value, marginLeft: "3px" }} className={`${style.boxColor} ${activeLabelColorClass} ms-auto`} />
													</label>
												</li>
											);
										})}
									</ul>
								</div>
							)}
						</div>
					)}
				</div>

				<div className={style.applyFilter}>
					<Button className={style.applyFilterBtn} onClick={() => applyFilter()}>
						تطبيق الفلتر
					</Button>
				</div>
			</div>
		</div>
	);
};
export default SidebarFilter;
