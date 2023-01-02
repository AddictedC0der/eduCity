import * as React from 'react';
import { Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';


interface TooltipWrapperProps {
    title: string;
    placement: "left" | "right" | "top" | "bottom" | "bottom-end" | "bottom-start" | "left-end" | "left-start" | "right-end" | "right-start" | "top-end" | "top-start" | undefined;
    mergeWithIcon?: boolean;
    children?: React.ReactNode;
}

const styleSheet = {
    'left': {justifyContent: ''}
}

export function TooltipWrapper(props: TooltipWrapperProps) {    
    const {title, children, placement} = props;

    const constructChild = () => {
        const Child = props.children
        switch(props.placement) {
            case 'left': {
                return (
                    <>
                    <Tooltip title={title} placement={placement}>
                        <InfoIcon />
                    </Tooltip>
                    {Child}
                    </>
                )
            }
            case 'right': {
                return (
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: '5%'}}>
                    {Child}
                    <Tooltip title={title} placement={placement}>
                        <InfoIcon />
                    </Tooltip>
                    </div>
                )
            }
        }
    }
    
    
    const child = (props.mergeWithIcon ? (
        constructChild()
    ) : (children ?? <InfoIcon />)) as React.ReactElement

    return (
        !props.mergeWithIcon ?
            <Tooltip title={title} placement={placement}>
                {child}
            </Tooltip>
        : child
    )
}