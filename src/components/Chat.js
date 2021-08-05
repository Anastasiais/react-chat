import React, {useContext, useState} from "react";
import { Context } from "../index";
import { useAuthState } from "react-firebase-hooks/auth";
import { Container, Grid, TextField, Button, Avatar } from "@material-ui/core";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Loader from "./Loader";
import firebase from "firebase";




const Chat = () => {
    const {auth, firestore}  = useContext(Context)
    const [user] = useAuthState(auth)
    const [value, setValue] = useState('')
    const [messages, loading] = useCollectionData(
        firestore.collection("messages").orderBy("createdAt")
    )

    const sendMessage = async () => {
        firestore.collection("messages").add({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setValue('')
    }

    if(loading) {
        return <Loader/>
    }

    return (
        <Container>
          <Grid container
           style={{height: window.innerHeight - 50, marginTop: 25}}
           justifyContent={"center"}>
            <div style={{width: "80%", height: "50vh", border: "1px solid black", overflowY: "auto"}}>
                  {messages.map((message,index) =>
                      <div style={{
                          margin: 10,
                          border: user.uid === message.uid ? '2px solid green' : '2px dashed red',
                          marginLeft:  user.uid === message.uid ? 'auto' : '10px',
                          width: 'fit-content',
                          padding: 5,
                        }}
                        key={index}
                        >
                          <Grid container>
                            <Avatar src={message.photoURL} />
                            <div>{message.displayName}</div>
                          </Grid>
                          <div>{message.text}</div>
                      </div>
                    )}
            </div>
            <Grid container
                direction={"column"}
                alignItems={"flex-end"}
                style={{width: "80%"}}
               >
                 <TextField
                 fullWidth
                 value={value}
                 maxRows={2}
                 variant={"outlined"}
                 onChange={e => setValue(e.target.value)}

                 />
                 <Button
                 variant={"outlined"}
                 onClick={sendMessage}
                 >Отправить</Button>
            </Grid>

          </Grid>
        </Container>
    )
}

export default Chat
