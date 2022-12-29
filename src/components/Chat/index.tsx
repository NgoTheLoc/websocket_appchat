import { useState, useRef, useEffect} from 'react';
import {Container, Paper, Box, Divider, Grid, List, ListItem, ListItemText, FormControl, TextField, IconButton} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { ChatMessageDto } from '../Models/ChatMessagesDto';

const styleChatWindow = {
    height: "15rem"
}

const styleChatWindowMessages ={
    height: "13rem",
    overflow: "auto"
}

export default function Chat () {
    const [chatMessages, setChatMessages] = useState([
        {
            user:"John",
            message:"Hi"
        }
    ])

    const [user, setUser] = useState('')
    const [message, setMessage] = useState('')

    const webSocket = new WebSocket("ws://localhost:3000");

    useEffect(() => {
        console.log("WebSocket Open")

        webSocket.onopen = (event) => {
            console.log("WebSocket connected", event)
        };

        webSocket.onclose = (event) => {
            console.log("WebSocket unconnected", event)
        };

        return () => {
            console.log("WebSocket Close");
            webSocket.close();
        }
    }, [])

    useEffect(() => {
        webSocket.onmessage = (event) => {
            const chatMessagesDto = JSON.parse(event.data)
            setChatMessages([...chatMessages, {user: chatMessagesDto.user, message: chatMessagesDto.message}])
        }
    }, [chatMessages])
    
    

    const listChatMess = chatMessages.map((item,index) => (
        <ListItem key={index}>
            <ListItemText primary={`${item.user} : ${item.message}`}/>
        </ListItem>
    ))

    const handleSendMessage = () => {
        if(user && message){
            console.log("send");
            webSocket.send(JSON.stringify(new ChatMessageDto(user , message)))
            setMessage("")
        }
    }

  return (
    <div>
        <Container>
            <Paper elevation={5}>
                <Box p={3}>
                    <h3>Happy day chatting !!!</h3>
                </Box>

                <Divider/>

                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} style={styleChatWindow}>
                        <List style={styleChatWindowMessages}>
                           {listChatMess}
                        </List>
                    </Grid>

                    <Grid item xs={2}>
                        <FormControl fullWidth>
                            <TextField id="standard-basic" label="User" variant="outlined" value={user} onChange={(e)=> setUser(e.target.value)}/>
                        </FormControl>
                    </Grid>

                    <Grid item xs={9}>
                        <FormControl fullWidth>
                            <TextField id="standard-basic" label="Message" variant="outlined" value={message} onChange={(e)=> setMessage(e.target.value)}/>
                        </FormControl>
                    </Grid>

                    <Grid item xs={1}>
                       <IconButton aria-label="send" color="primary" onClick={handleSendMessage}>
                            <SendIcon />
                       </IconButton>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    </div>
  );
}

