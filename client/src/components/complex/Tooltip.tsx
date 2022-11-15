import * as React from 'react';
import { Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';


interface TooltipWrapperProps {
    title: string;
    placement: "left" | "right" | "top" | "bottom" | "bottom-end" | "bottom-start" | "left-end" | "left-start" | "right-end" | "right-start" | "top-end" | "top-start" | undefined;
    children?: React.ReactNode;
}

export function TooltipWrapper(props: TooltipWrapperProps) {
    const {title, children, placement} = props;
    const child = (children ?? <InfoIcon />) as React.ReactElement;
    return (
        <Tooltip title={title} placement={placement}>
            {child}
        </Tooltip>
    )
}