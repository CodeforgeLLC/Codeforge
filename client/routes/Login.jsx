// for '/' page
import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CSSBaseline from '@mui/material/CssBaseline';
import LoginIcon from '@mui/icons-material/Login';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { SET_USER } from '../reducers/forgeReducer';
import { useDispatch, useSelector } from 'react-redux';



//container--| username
//         --| password
//         --| login button
//         --| signup button
const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //Save the username and password values on-click to these variables
    const username =  data.get('username');
    const password = data.get('password');
    //Send the info to the database
    const serverResponse = await fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .catch(err => {
        console.log(err);
      });
    const parsedResponse = await serverResponse.json();
    console.log(parsedResponse);
    if(serverResponse.status === 200) {
      dispatch(SET_USER(parsedResponse));
      return navigate('/main');
    } else {
      console.log('show an error');
    };
  };

    
    return (
      <Container component='main' maxWidth='xs'>
        <CSSBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{
            p: 3,
            mb: 6,
            borderRadius: 15,
            color: 'white',
            backgroundColor: 'error.light',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',

          }}>
            <Typography component="h1" variant='h1'>
              CodeForge
            </Typography>
          </Box>
          <Avatar sx={{ m: 2, bgcolor: 'error.light' }}>
            <LoginIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* If we want to implement the ability to 'remember' a user's username and password info <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="error"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>  
          </Box>
          <Link href="/register" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Box>
      </Container>
    )
};
  
export default Login;