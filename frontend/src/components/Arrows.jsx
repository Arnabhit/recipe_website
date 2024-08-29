import React from 'react';

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', background: 'gray', borderRadius: '50%' }}
            onClick={onClick}
        />
    );
};

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', background: 'gray', borderRadius: '50%' }}
            onClick={onClick}
        />
    );
};

export { NextArrow, PrevArrow };