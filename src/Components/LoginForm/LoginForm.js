import React from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
  Container,
  Grid,
  Link,
  IconButton,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'

const LoginForm = ({ onClose, onLogin }) => {

  const[email,setEmail]=useState('')
  const[password,setpassword]=useState('')
  const navigate=useNavigate();
  
  

  const handleemailchange=(e)=>{
    const newemail =e.target.value;
    setEmail(newemail);
  }
  const handlepasswordchange=(e)=>{
    const newepassword =e.target.value;
    setEmail(newepassword);
  }

  const handleLogin = async(e) => {
    // Add your login logic here
    // For now, just close the dialog
    const emailvalue=email.trim();
    const passwordvalue=password.trim();
    try{
      const response =await axios.get('http://localhost:8080/users?email=${emailvalue}&password=${passwordvalue}')
    
    if (response.data.length > 0) {
        
      console.log('Login successful');
      
      navigate('/'); 
    } else {
      console.log("no user found")
      navigate('/')
    }
  }catch (error) {
    console.error('Error during login:', error);
    
    
  }
    
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <Container maxWidth="xs">
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <TextField
              onChange={handleemailchange}
                label="Email or Phone"
                variant="outlined"
                margin="normal"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <AccountCircleIcon color="primary" style={{ marginRight: '8px' }} />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              onChange={handlepasswordchange}
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                InputProps={{
                  startAdornment: <LockIcon color="primary" style={{ marginRight: '8px' }} />,
                  endAdornment: (
                    <IconButton>
                      <VisibilityIcon />
                    </IconButton>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Typography variant="caption" color="textSecondary">
            <Link href="#" underline="always">
              Forgotten Password?
            </Link>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogin} color="primary" variant="contained" fullWidth>
            Log In
          </Button>
        </DialogActions>
        <center>Or</center>
        <DialogActions>
          <Button
            onClick={onClose} // Replace with your Google login logic
            color="primary"
            variant="contained"
            fullWidth
            startIcon={<GoogleIcon />}
          >
            Login with Google
          </Button>
        </DialogActions>
        <DialogActions>
          <Button
            onClick={onClose} // Replace with your Facebook login logic
            color="primary"
            variant="contained"
            fullWidth
            startIcon={<FacebookIcon />}
          >
            Login with Facebook
          </Button>
        </DialogActions>
      </Container>
    </Dialog>
  );
};

export default LoginForm;
