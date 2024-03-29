import React from 'react';
import { Container, Box } from '@material-ui/core';
import { StyledText, StyledInput, PrimaryButton } from '../styles/Styled';
//import TextField from '@material-ui/core/TextField';
import { validateEmail } from '../helpers/validation';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Icon from '@mdi/react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';

import Grid from '@material-ui/core/Grid';
import { mdiRocketOutline } from '@mdi/js';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
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
    padding: '0 90px',
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
    margin: '10px 0 0 0',
    fontSize: '1.25rem',
  },
  subtitle: {
    fontSize: '2.5vh',
  }
}));

/* Check if user is existing */
function checkExistingUser(email) {
  /* fetch from endpoint */
  const dummy = true;
  
  return dummy; // If existing
}


export function Login() {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [validEmail, setValidEmail] = React.useState(false);
  const [existingUser, setExistingUser] = React.useState(null);
  const history = useHistory();
  const context = React.useContext(UserContext);
  let [usernameToken, setUsernameToken] = context;
  if (usernameToken === '' && localStorage.getItem('userName')) {
    usernameToken = localStorage.getItem('userName')
  }

  let emailError = error ? "Invalid email" : "Email";
  let passwordError = error ? "Incorrect password" : "Password";

  const handleEmail = (e) => {
    e.preventDefault();
    const emailCheck = validateEmail(email);
    if (!emailCheck) { 
      setError(true)
    } else {
      setError(false);
      setValidEmail(true);
      /* EMAIL IS VALID CHECK FOR EXISTING USER */
      if (checkExistingUser(email)) {
        setExistingUser(true);
      } else {
        setExistingUser(false);
      }
    }
  }

  const handlePassword = (e) => {
    e.preventDefault();
    /* Check login */

  }

  const toRegister = () => {
    console.log('to rego');
    return (
      <Redirect to={{
        pathname: '/register',
        state: { emailInput: email }
      }} />
    );
  }

  const emailDialogue = (
    <div>
      <div>
        <StyledText>What is your email?</StyledText>
        <StyledInput 
          label={emailError} 
          placeholder="sample@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
        />
      </div>
      <PrimaryButton 
        text="Next"
        onClick={handleEmail}
      />
    </div>
  );

  const passwordDialogue = (
    <div>
      <div>
      <StyledText>Welcome back!</StyledText>
      <StyledInput 
        label={passwordError} 
        type="password"
        placeholder="Password"
        value={password}
        error={error}
        onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <PrimaryButton 
        text="Sign In"
        onClick={handlePassword}
      />
    </div>
  );

  async function signIn(event) {
    event.preventDefault();
    try {
        const user = await Auth.signIn(username, password);
        // console.log(user);
        localStorage.setItem('userName', user['username']);
        setUsernameToken(user['username'])
        history.push('/');
    } catch (error) {
        alert('error signing in', error);
    }
  }

  return(
    <div className={classes.placement}>
      <div className={classes.container}>
        <h1 className={classes.heading}>
          Welcome back!
        </h1>
        <h3 className={classes.subtitle}>
          Be a part of the world's most inspired community of self-learners.
        </h3>
      </div>
      <div className={classes.container}>
        <Container maxWidth='sm'>
          <Box bgcolor='white' color="black" className='box-generic'>
          <div className={classes.paper}>
              <form className={classes.form} noValidate onSubmit={signIn}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Username"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={username}
                  onChange = {(e) => setUsername(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange = {(e) => setPassword(e.target.value)}
                />
                <div style={{display: 'flex', flexDirection: 'row'}}>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label={<span style={{fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem'}}>Remember me</span>}
                    style={{fontFamily: 'Poppins, sans-serif', textAlign: 'left'}}
                  />
                  <div style={{flex: 1}}/>
                  <Link 
                    href="#" 
                    variant="body2" 
                    style={{fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem', margin: 'auto'}}
                    >
                    Forgot password?
                  </Link>
                </div>
                {/* <div style={{display: 'flex', flexDirection: 'column'}}>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label={<span style={{fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem'}}>Remember me</span>}
                    style={{fontFamily: 'Poppins, sans-serif'}}
                  />
                  <Link 
                    href="#" 
                    variant="body2" 
                    style={{fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem'}}
                    >
                    Forgot password?
                  </Link>
                </div> */}
                {/* <Grid container>
                  <Grid item xs>
                    
                  </Grid>
                  <Grid item >
                    
                  </Grid>
                </Grid> */}
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
                <div>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    style={{margin: '10px 0 0 0', fontSize: '1.25rem'}}
                  >
                    Launch
                    <Icon path={mdiRocketOutline}
                      size={1.5}
                      color="white"
                      rotate='90'
                      style={{margin: '0 0 0 10px'}}
                    />
                  </Button>
                </div>
              </form>
            </div>
          </Box>
        </Container>
      </div>

    </div>
    /* <Container maxWidth='sm'>
      <Box color='black' bgcolor='#E4816B' className='box-generic'>
          {(!existingUser && validEmail) ? toRegister : (existingUser && validEmail ? passwordDialogue : emailDialogue)}
      </Box>
    </Container> */
  );
}