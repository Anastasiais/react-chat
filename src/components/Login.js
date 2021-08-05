import React, { useContext } from "react";
import { Grid, Box, Button, Container} from "@material-ui/core";
import { Context } from "../index";
import firebase from "firebase";

export const Login = () => {
   const {auth} = useContext(Context)

   const login = async() => {
      const provider = new firebase.auth.GoogleAuthProvider();
      const {user}=  await auth.signInWithPopup(provider);
   }

    return (
        <Container>
          <Grid container
           style={{height: window.innerHeight - 50}}
             alignItems={"center"}
             justifyContent={"center"}
          >

          <Grid style={{width: 400, background: "lightgray"}}
             container
             alignItems={"center"}
             direction={"column"}
          >
              <Box p={5}>
                <Button onClick={login} variant={"outlined"}>Войти с помощью Google</Button>
              </Box>
          </Grid>

          </Grid>
        </Container>
    )
}

export default Login;