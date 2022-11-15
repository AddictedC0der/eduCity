import * as React from 'react';
import { Dialog, DialogProps, DialogActions, DialogTitle, DialogContent, Typography, Button, FormControlLabel, Checkbox } from '@mui/material';


interface UserAgreementDialogProps {
    open: boolean;
    onClose: () => void
}


export function UserAgreementDialog(props: UserAgreementDialogProps) {
    const { open, onClose } = props

    const [agreed, setAgreed] = React.useState(false);

    const handleAgree = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAgreed(event.target.checked);
    }

    const submit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onClose();
    }

    // React.useEffect(() => {
    //     console.log(agreed)
    // }, [agreed])

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                Пользовательсое соглашение
            </DialogTitle>
            <DialogContent>
                Lorem ipsum dolar sit amet...Lorem ipsum dolar sit amet...Lorem ipsum dolar sit amet...Lorem ipsum dolar sit amet...Lorem ipsum dolar sit amet...
                Lorem ipsum dolar sit amet...Lorem ipsum dolar sit amet...Lorem ipsum dolar sit amet...Lorem ipsum dolar sit amet...Lorem ipsum dolar sit amet...

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