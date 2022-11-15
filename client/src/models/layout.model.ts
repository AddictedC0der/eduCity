import * as React from 'react';

export type paddingMain = 'LR' | 'TB' | 'ALL' | 'NONE';

export const paddingConstants = {
    LR: {paddingLeft: '5%', paddingRight: '5%'},
    TB: {paddingTop: '5%', paddingBottom: '5%'},
    ALL: {padding: '5%'},
    NONE: {}
}