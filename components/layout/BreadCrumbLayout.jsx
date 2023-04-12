import { Breadcrumb, Container } from "react-bootstrap";

import style from './breadcrumblayout.module.scss';

const BreadCrumbLayout = ({ data }) => {


    const renderItem = data?.map(item => {

        const activeItem = item.active ? style.active : '';
        return <Breadcrumb.Item className={`${activeItem} ${style.item}`}
            href={item.link ? item.link : ""}>
            {item.label}
        </Breadcrumb.Item>
    });
    return (
        <Breadcrumb
            className={style.breadCrumbLayout}
            listProps={{ style: { marginBottom: '0px' } }}>
            <Container fluid="xl" className="d-flex" style={{ padding: '0px' }}>
                {renderItem}
            </Container>
        </Breadcrumb>
    )
}
export default BreadCrumbLayout;