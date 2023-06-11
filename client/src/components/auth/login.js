import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import swal from "sweetalert";
import SocialLogin from "./SocialLogin";
import account from "../Appwrite/appwriteConfig";
import Navbar from "../Homepages/Navbar";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <NavLink color="inherit" to="/">
        MAKEaNOTE
      </NavLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const promise = account.createEmailSession(
      data.get("email"),
      data.get("password")
    );

    promise.then(
      function (response) {
        console.log(response); // Success
        navigate("/profile");
      },
      function (error) {
        console.log(error); // Failure
        swal("Oops!", "Something went wrong!", "error");
      }
    );
  };

  return (
    <>
      <Navbar></Navbar>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 3, bgcolor: "secondary.main", fontSize: 30 }}>
              <span role="img" aria-label="logo" aria-labelledby="logo">
                👀
              </span>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={loginUser}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <NavLink to="/forgot" variant="body2">
                    Forgot password?
                  </NavLink>
                </Grid>
                <Grid item>
                  <NavLink to="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </NavLink>
                </Grid>
              </Grid>
              <Grid container className="d-flex justify-content-center ">
                <SocialLogin />
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}
