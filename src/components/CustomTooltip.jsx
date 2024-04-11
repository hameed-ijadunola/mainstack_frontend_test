import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const CustomTooltip = ({ children, text }) => {
  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id={text}>{text}</Tooltip>}
    >
      {children}
    </OverlayTrigger>
  );
};

export default CustomTooltip;
