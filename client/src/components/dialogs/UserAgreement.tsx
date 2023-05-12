import * as React from 'react';
import { Dialog, DialogProps, DialogActions, DialogTitle, DialogContent, Typography, Button, FormControlLabel, Checkbox } from '@mui/material';


interface UserAgreementDialogProps {
    open: boolean;
    onClose: (confirm: boolean) => void
}


export function UserAgreementDialog(props: UserAgreementDialogProps) {
    const { open, onClose } = props

    const [agreed, setAgreed] = React.useState(false);

    const handleAgree = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAgreed(event.target.checked);
    }

    const submit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onClose(true);
    }

    // React.useEffect(() => {
    //     console.log(agreed)
    // }, [agreed])

    return (
        <Dialog open={open} onClose={() => onClose(false)}>
            <DialogTitle sx={{color: 'black'}}>
                Пользовательсое соглашение
            </DialogTitle>
            <DialogContent>
                Вы даёте согласие, что не будете использовать конструктор заданий в целях разработки, моделирования или создания ядерного оружия.

            </DialogContent>
            <DialogActions>
                <FormControlLabel control={<Checkbox onChange={handleAgree} />} label={<Typography>Я ознакомлен(а)</Typography> } />
            </DialogActions>
            <DialogActions>
                <Button disabled={!agreed} onClick={submit} variant='contained'>Принять</Button>
            </DialogActions>
        </Dialog>
    )
}