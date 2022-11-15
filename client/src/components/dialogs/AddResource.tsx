import * as React from 'react';
import { Typography, Dialog, DialogTitle, DialogContent, TextField, Select, MenuItem, FormControlLabel, Button } from '@mui/material';


interface AddResourceDialogProps {
    open: boolean;
    onClose: () => void
}


export function AddResourceDialog(props: AddResourceDialogProps) {
    const [category, setCategory] = React.useState('Математика');
    const [link, setLink] = React.useState<string>('');

    const handleChangeLink = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLink(event.target.value);
    }

    return (
        <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth='md'>
            <DialogTitle>
                Добавление ресурса
            </DialogTitle>
            <DialogContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                <FormControlLabel
                    control={
                        <Select value={category} onChange={e => setCategory(e.target.value as string)}>
                            <MenuItem value='Математика'>Математика</MenuItem>
                            <MenuItem value='Русский язык'>Русский язык</MenuItem>
                            <MenuItem value='Биология'>Биология</MenuItem>
                        </Select>
                    } 
                    label='Категория' labelPlacement='start' sx={{columnGap: '5%'}}
                />
                <FormControlLabel
                    control={
                        <TextField value={link} onChange={handleChangeLink} placeholder='www.example.com' />
                    } 
                    label='Ссылка' labelPlacement='start' sx={{columnGap: '5%'}} 
                />
                <Button variant='contained'>Добавить ресурс</Button>
            </DialogContent>
        </Dialog>
    )
}