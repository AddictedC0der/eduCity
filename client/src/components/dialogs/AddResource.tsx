import * as React from 'react';
import { Typography, Dialog, DialogTitle, DialogContent, TextField, Select, MenuItem, FormControlLabel, Button, Box, SelectChangeEvent } from '@mui/material';
import { BaseDialog } from './BaseDialog';
import { SubjectService } from '../../http/subjectsAPI';
import { IRealSubject } from '../../models/subject.model';
import { ResourceService } from '../../http/ResourceAPI';
import { useTypedSelector } from '../../hooks/useTypedSelector';


interface AddResourceDialogProps {
    open: boolean;
    onClose: () => void
}


export function AddResourceDialog(props: AddResourceDialogProps) {
    const [category, setCategory] = React.useState<string>();
    const [categories, setCategories] = React.useState<IRealSubject[]>([]);
    const [link, setLink] = React.useState<string>('');

    const { user } = useTypedSelector(state => state.user)

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await (await SubjectService.getAll()).data;
            setCategories(data);
        }
        fetchData();
    }, [])

    const handleChangeLink = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLink(event.target.value);
    }

    const handleAddResource = () => {
        ResourceService.createResource({Link: link, Category: JSON.parse(category!).id, Author: user.user.id});
        props.onClose();
    }

    const controls = (
        <Button onClick={handleAddResource} disabled={!category || !link} variant='contained'>Добавить ресурс</Button>
    )
    
    const renderMenuItmes = () => {
        return (
            categories.map(e => {return (
                <MenuItem key={e.id} value={JSON.stringify({label: e.SubjectName, id: e.id})}>{e.SubjectName}</MenuItem>
            )})
        )
    }

    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value || '');
    }

    return (
        <BaseDialog open={props.open} onClose={props.onClose} title='Добавить ресурс' controlsNode={controls}>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%'}}>
                <FormControlLabel
                    control={
                        <Select sx={{width: '70%'}} value={category ?? ''} onChange={handleChange}>
                            {renderMenuItmes()}
                        </Select>
                    } 
                    label='Категория' labelPlacement='start' sx={{columnGap: '5%', width: '50%'}}
                />
                <FormControlLabel
                    control={
                        <TextField sx={{width: '70%'}} value={link} onChange={handleChangeLink} placeholder='www.example.com' />
                    } 
                    label='Ссылка' labelPlacement='start' sx={{columnGap: '5%', marginTop: '5%', width: '50%'}} 
                />
            </Box>
        </BaseDialog>
    )
}