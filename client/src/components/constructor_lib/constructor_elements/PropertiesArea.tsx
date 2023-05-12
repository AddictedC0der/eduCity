import * as React from 'react';
import { Box } from '@mui/material';
import { useConstructorStore } from '../../../hooks/useConstructorStore';
import * as Types from '../types';
import { ComponentsRepository } from '../ComponentsRepository';


export function PropertiesArea(props: Types.PropetiesAreaProps) {
    return (
        <Box id='PropertiesAreaPlaceholder' sx={{width: '100%', height: '100%'}}
                aria-label='PropertiesArea-MainBox'>
        </Box>
    )
}