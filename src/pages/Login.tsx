import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { faSpinner, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import {
  Avatar, Button, CssBaseline, TextField, Paper, Box, Grid, Typography,
} from '@mui/material';

import CopyRight from 'src/components/CopyRight';
import { useAuth } from 'src/contexts/AuthContext';
import Routes from 'src/routes/Routes';

const StyledIcon = styled(FontAwesomeIcon)`
  margin: 5px;
`;

const useStyles = (theme: any) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    width: '100%',
    margin: '20px 0',
  },
});

const Login = () => {
  const fnameRef = useRef<HTMLInputElement>(null);
  const lnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { login } = useAuth();
  const history = useHistory();

  const handleLogIn = async () => {
    const email = emailRef?.current?.value;
    const pw = passwordRef?.current?.value;

    setLoading(true);
    try {
      setError('');
      await login(email, pw);
      history.push(Routes.admin);
    } catch {
      setError('Failed to log in');
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleLogIn();
  };

  return (
    <Grid container component="main" >
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div >
          <Avatar >
            <StyledIcon icon={faLock} spin />
          </Avatar>
          <Typography component="h1" variant="h5">
            { isSignUp ? 'Sign up' : 'Sign in'}
          </Typography>
          {/* <AlertMsg alertMsg={error} severity={Severity.ERROR} /> */}
          <form noValidate onSubmit={(e) => handleSubmit(e)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  inputRef={emailRef}
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
                  inputRef={passwordRef}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"

              disabled={loading}
            >
              {'Admin log in'}
              {loading && (
                <StyledIcon icon={faSpinner} spin />
              )}
            </Button>
            <Box mt={5}>
              <CopyRight websiteName="SG-Delivery" url={window.location.origin} />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
