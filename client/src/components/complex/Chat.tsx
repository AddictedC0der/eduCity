import * as React from 'react';
import { Typography, Paper, List, ListItem, Box, TextField, Fab } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import { IChatMessage } from '../../models/chat.model';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { IUser } from '../../models/user.model';


interface IChatMessageProps {
    message: IChatMessage;
    userId: number
}


function ChatMessage(props: IChatMessageProps) {
    return (
        <ListItem key={props.message.text}
                sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
                alignItems: props.message.author.id === props.userId ? 'end' : 'start', maxWidth: '90%',
                alignSelf: props.message.author.id === props.userId ? 'end' : 'start'}}>
            <Typography>{props.message.author.UserLogin}</Typography>
            <Paper sx={{backgroundColor: 'gray', padding: '1%', minWidth: '5vw', maxWidth: '30vw'}}>
                <Typography sx={{maxWidth: '100%', flexGrow: '1', wordWrap: 'break-word'}}>{props.message.text}</Typography>
            </Paper>
            <Typography sx={{color: 'gray'}}>{new Date(props.message.sendTime).toLocaleTimeString()}</Typography>
        </ListItem>
    )
}


function ChatInputBox(props: {onSend: (newMsg: IChatMessage) => void, user: IUser}) {
    const [msg, setMsg] = React.useState<string>('');
    const [isReplying, setIsReplying] = React.useState<number | false>(false);

    const { createMessage } = useActions()

    const stopReplying = () => {
        setIsReplying(false);
    }

    const handleChangeMsg = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMsg(event.target.value);
    }

    const generateMessageFromPlain = (): IChatMessage => {
        return {
            author: props.user,
            text: msg,
            replyTo: isReplying ? isReplying : -1,
            isEdited: false,
            sendTime: (new Date()).toString()
        }
    }

    const sendMsg = () => {
        setMsg('');
        const result = generateMessageFromPlain();
        createMessage(result);
        props.onSend(result);
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <TextField value={msg} onChange={handleChangeMsg} sx={{width: '100%'}} />
            <Fab onClick={sendMsg} sx={{marginLeft: '1%'}}>
                <SendIcon />
            </Fab>
        </Box>
    )
}


export function Chat() {    
    const [msgs, setMsgs] = React.useState<IChatMessage[]>([])
    
    const { user } = useTypedSelector(state => state.user)
    
    const { load_messages } = useActions()
    const { messages } = useTypedSelector(state => state.chat)

    React.useEffect(() => {
        load_messages();
        setMsgs(messages ? messages : []);
    }, [])

    const addMsg = (newMsg: IChatMessage) => {
        setMsgs(msgs.concat([newMsg]))
    }

    return (
        <Paper sx={{webkitBoxShadow: '1px 1px 8px 9px rgba(34, 60, 80, 0.2)',
            mozBoxShadow: '1px 1px 8px 9px rgba(34, 60, 80, 0.2)',
            boxShadow: '1px 1px 8px 9px rgba(34, 60, 80, 0.2)', height: '100%'}}>
            <List>
                {msgs.map(msg => ChatMessage({message: msg, userId: user.id}))}
            </List>
            <div style={{padding: '1%', alignSelf: 'self-end'}}>
                <ChatInputBox onSend={addMsg} user={user} />
            </div>
            
        </Paper>
    )
}