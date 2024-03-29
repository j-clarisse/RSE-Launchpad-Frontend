import React from 'react';
import { Container, Box } from '@material-ui/core';
import { StyledText, StyledInput, PrimaryButton } from '../styles/Styled';
import { ifEmpty, passwordMatch } from '../helpers/validation';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';


import { mdiRocketOutline } from '@mdi/js';
import Icon from '@mdi/react'

import { UserContext } from '../components/UserContext';

const useStyles = makeStyles((theme) => ({
  placement: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '75vh',
  },
  container: {
    /* textAlign: 'center', */
    width: '50%',
    padding: '0 90px'
  },
  heading: {
    fontSize: '7vh'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textTransform: 'none',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,
    margin: '25px 0 0 0',
    fontSize: '1.25rem',
  },
  subtitle: {
    fontSize: '2.5vh',
  }
}));

export function Register() {
  const classes = useStyles();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [usernameErr, setUsernameErr] = React.useState("");
  const [passwordErr, setPasswordErr] = React.useState("");
  const [getConfirm, setGetConfirm] = React.useState(false);
  const [confCode, setConfCode] = React.useState("");
  const history = useHistory();
  const context = React.useContext(UserContext);
  const [usernameToken, setUsernameToken] = context
  if (usernameToken === '' && localStorage.getItem('userName')) {
    usernameToken = localStorage.getItem('userName')
  }

  async function signUp() {
    try {
        const { user } = await Auth.signUp({
            username,
            password,
            attributes: {
                email
            }
        });
        setGetConfirm(true)
        setUsernameToken(user['username'])
        localStorage.setItem('userName', user['username']);
        // console.log(user)
    } catch (error) {
        alert('error signing up:', error);
    }
  }

  // handle initial registration 
  async function handleSubmit (event) {
    event.preventDefault();
    setUsernameErr("");
    setPasswordErr("")
    if (ifEmpty(username)) {
      setUsernameErr("Invalid username");
    } 
    if (ifEmpty(password) || ifEmpty(confirmPass)) {
      setPasswordErr("Enter password")
    }
    if (!passwordMatch(password, confirmPass)) {
      setPasswordErr("Passwords must match");
    }
    /* USERNAME TAKEN ERR */
    signUp()
  }

  // handle confirmation code
  async function handleConfirm (event) {
    event.preventDefault();
    try {
      const response = await Auth.confirmSignUp(username, confCode);
      console.log(response);
      history.push('/');
    } catch (error) {
        alert('error confirming sign up', error);
    }
  }

  return(
    <div className={classes.placement}>
      <div className={classes.container}>
        <h1 className={classes.heading}>
          Hi there!
        </h1>
        <h3 className={classes.subtitle}>
          Join the world's most inspired community of self-learners.
        </h3>
      </div>
      <div className={classes.container}>
        <Container maxWidth="sm">
          <Box bgcolor='white' color="black" className='box-generic'>
          {getConfirm === false
            ? <div className={classes.paper}>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="fname"
                        name="username"
                        variant="outlined"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        autoFocus
                        onChange =  {(e) => setUsername(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange =  {(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange =  {(e) => setPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="confirm password"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="current-password"
                        onChange =  {(e) => setConfirmPass(e.target.value)}
                      />
                    </Grid>
                    {/* <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                        style={{textAlign:'left'}}

                      />
                    </Grid> */}
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign Up
                    <Icon path={mdiRocketOutline}
                      size={1.5}
                      color="white"
                      rotate='90'
                      style={{margin: '0 0 0 10px'}}
                    />
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="/login" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
            : <div className={classes.paper}>
                <form className={classes.form} noValidate onSubmit={handleConfirm}>
                  <h3>Check your email for confirmation code</h3>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField 
                        variant="outlined"
                        required
                        fullWidth
                        id="confirm"
                        label="Enter Confirmation Code"
                        name="confirm"
                        onChange = {(e) => setConfCode(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Enter Code
                  </Button>
                </form>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => history.push('/')}
                  >
                    Skip confirmation
                </Button>
              </div>
          }
          </Box>
      </Container>
      </div>
    </div>









/* 
    <Container maxWidth='sm'>
      <Box color='black' bgcolor='#E4816B' className='box-generic'>
          <div>
            <StyledText>Create New Account</StyledText>
            <StyledInput
              label={usernameErr || "Username"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={usernameErr}
            />
            <StyledInput
              label={passwordErr || "Password"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordErr}
            />
            <StyledInput
              label={passwordErr || "Confirm Password"}
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              error={passwordErr}
            />
          </div>
          <PrimaryButton 
            text="Next"
            onClick={handleSubmit}
          />
      </Box>
    </Container> */
  );
}