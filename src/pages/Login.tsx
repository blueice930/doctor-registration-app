import React, { useRef, useState } from 'react';
import { faSpinner, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import {
  Avatar, Button, CssBaseline, TextField, Paper, Box, Grid, Typography,
} from '@mui/material';
import styled from '@emotion/styled';

import CopyRight from 'src/components/CopyRight';
import { useAuth } from 'src/contexts/AuthContext';
import Routes from 'src/routes/Routes';
import { makeStyles } from '@mui/styles';

const StyledIcon = styled(FontAwesomeIcon)`
  margin: 5px;
`;

const useStyles = () => makeStyles({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
  },
  error: {
    width: '100%',
    margin: '20px 0',
  },
});

const StyleBg = styled(Grid)`
  background-image: url('https://source.unsplash.com/random');
  background-repeat: 'no-repeat';
  background-size: 'cover';
  background-position: 'center';
`;

const Container = styled(Grid)`
  height: 100vh;
`;

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

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
    <Container container>
      <StyleBg item xs={false} sm={4} md={7} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div style={{ textAlign: 'center' }}>
          <Avatar sx={{ margin: 'auto', marginTop: '20%' }}>
            <StyledIcon icon={faLock} />
          </Avatar>
        </div>
        <form noValidate onSubmit={(e) => handleSubmit(e)} style={{ textAlign: 'center' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ margin: '20px' }}>
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
            <Grid item xs={12} sx={{ margin: '20px' }}>
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
            variant="contained"
            color="primary"
            sx={{ margin: '20px' }}
            disabled={loading}
          >
            {'Admin log in'}
            {loading && (
              <StyledIcon icon={faSpinner} spin />
            )}
          </Button>
          <Box mt={5}>
            <CopyRight websiteName="sggex.sg" url="https://sggex.sg" />
          </Box>
        </form>
      </Grid>
    </Container>
  );
};

export default Login;
