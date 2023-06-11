import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import swal from "sweetalert";
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

export default function ResetPass() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setConfPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit1 = (event) => {
    event.preventDefault();
    const pass = password;
    if (pass !== passwordConfirm) {
      swal("Error", "Passwords do not match", "error");
      return;
    } else {
      handleSubmit2(event, pass);
    }
  };

  const handleSubmit2 = (event, password) => {
    event.preventDefault();
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const userId = urlParams.get("userId");
      const secret = urlParams.get("secret");
      const newPass = password;
      const promise = account.updateRecovery(userId, secret, newPass, newPass);
      promise.then(
        function (response) {
          console.log(response);
          swal("Success", "Password reset successful", "success").then(() => {
            navigate("/login");
          });
        },
        function (error) {
          console.log(error);
          swal("Error", "Password reset failed", "error").then(() => {
            navigate("/login");
          });
        }
      );
    } catch (error) {
      console.log(error);
      swal(
        "Error",
        "Password reset failed please use link sent to mail",
        "error"
      );
    }
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main", fontSize: 30 }}>
              <span role="img" aria-label="logo" aria-labelledby="logo">
                👀
              </span>
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset you password
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit1}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="passwordConfirm"
                label="Confirm Password"
                type="password"
                id="passwordConfirm"
                autoComplete="current-password"
                onChange={(e) => {
                  setConfPassword(e.target.value);
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset Password
              </Button>
              <Grid container>
                <Grid item>
                  <NavLink to="/login" variant="body2">
                    {"Login into your account"}
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}
