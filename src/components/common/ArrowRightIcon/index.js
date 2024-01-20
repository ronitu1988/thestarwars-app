import React from 'react';

const ArrowRightIcon = ({ onClick, isDisabled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={onClick} className={isDisabled}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
);

export default ArrowRightIcon;