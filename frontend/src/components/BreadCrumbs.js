import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

const CustomBreadCrumbs = ({handleClick, ...props}) => {
    return (
        <Breadcrumbs aria-label="breadcrumb" className={"text-center"}>
            {props.children}
        </Breadcrumbs>
    );
}

export default CustomBreadCrumbs;