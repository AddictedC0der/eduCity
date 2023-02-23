import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';


function not(a: readonly TransferListOption[], b: readonly TransferListOption[]) {
    return a.filter((value) => b.indexOf(value) === -1);
}


function intersection(a: readonly TransferListOption[], b: readonly TransferListOption[]) {
    return a.filter(value => b.indexOf(value) !== -1);
}


function union(a: readonly TransferListOption[], b: readonly TransferListOption[]) {
  return [...a, ...not(b, a)];
}


interface TransferListProps {
    choices: TransferListOption[];
    leftColumnTitle: string;
    rightColumnTitle: string;
    onAddItems: (newItems: number[]) => void;
    onRemoveItems: (removedItems: number[]) => void;
}

interface TransferListOption {
    label: string;
    id: number;
    index: number;
}


export function TransferList(props: TransferListProps) {
    const [checked, setChecked] = React.useState<readonly TransferListOption[]>([]);
    const [left, setLeft] = React.useState<readonly TransferListOption[]>(props.choices);
    const [right, setRight] = React.useState<readonly TransferListOption[]>([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value: TransferListOption) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
        newChecked.push(value);
        } else {
        newChecked.splice(currentIndex, 1);
        }

        console.log(newChecked)
        setChecked(newChecked);
    };

    const numberOfChecked = (items: readonly TransferListOption[]) =>
        intersection(checked, items).length;

    const handleToggleAll = (items: readonly TransferListOption[]) => () => {
        if (numberOfChecked(items) === items.length) {
        setChecked(not(checked, items));
        } else {
        setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        const toRight = right.concat(leftChecked)
        setRight(toRight);
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
        props.onAddItems(toRight.map(e => e.id));
    };

    const handleCheckedLeft = () => {
        const toLeft = left.concat(rightChecked)
        setLeft(toLeft);
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
        props.onRemoveItems(toLeft.map(e => e.id));
    };

    const customList = (title: React.ReactNode, items: readonly any[]) => (
        
        <Card>
            <CardHeader
                sx={{ px: 2, py: 1 }}
                avatar={
                <Checkbox
                    onClick={handleToggleAll(items)}
                    checked={numberOfChecked(items) === items.length && items.length !== 0}
                    indeterminate={
                    numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
                    }
                    disabled={items.length === 0}
                    inputProps={{
                    'aria-label': 'all items selected',
                    }}
                />
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length} выбраны`}
            />
            <Divider />
            <List
                sx={{
                width: 200,
                height: 230,
                bgcolor: 'background.paper',
                overflow: 'auto',
                }}
                dense
                component="div"
                role="list"
            >
                {items.map((value: any) => {
                const labelId = `transfer-list-all-item-${value.label}-label`;

                return (
                    <ListItem
                    key={value.id}
                    role="listitem"
                    onClick={handleToggle(value)}
                    >
                    <ListItemIcon>
                        <Checkbox
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{
                            'aria-labelledby': labelId,
                        }}
                        />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={value.label} />
                    </ListItem>
                );
                })}
            </List>
        </Card>
    );

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>{customList(props.leftColumnTitle, left)}</Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                <Button
                    sx={{ my: 0.5 }}
                    variant="outlined"
                    size="small"
                    onClick={handleCheckedRight}
                    disabled={leftChecked.length === 0}
                    aria-label="move selected right"
                >
                    &gt;
                </Button>
                <Button
                    sx={{ my: 0.5 }}
                    variant="outlined"
                    size="small"
                    onClick={handleCheckedLeft}
                    disabled={rightChecked.length === 0}
                    aria-label="move selected left"
                >
                    &lt;
                </Button>
                </Grid>
            </Grid>
            <Grid item>{customList(props.rightColumnTitle, right)}</Grid>
        </Grid>
    );
}