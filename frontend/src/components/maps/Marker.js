// Marker.js
import React from 'react';
import PropTypes from 'prop-types';

const Marker = ({text, onClick}) => (
    <div className={"marker-wrapper"}
         onClick={onClick}
    />
);

Marker.defaultProps = {
    onClick: null,
};

Marker.propTypes = {
    onClick: PropTypes.func,
};

export default Marker;