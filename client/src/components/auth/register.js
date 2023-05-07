import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import swal from "sweetalert";
import { ID } from "appwrite";

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

export default function SignUp() {
  const [email, setemail] = useState("");

  const signupUser = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("email") === "" || data.get("password") === "") {
      swal("Oops!", "Please enter valid email and password!", "error");
      return;
    }
    if (data.get("password").length < 8) {
      swal("Oops!", "Password must be at least 8 characters", "warning");
      return;
    }
    const numericRegex = /^[0-9]+$/;
    if (
      data.get("number") === "" ||
      (data.get("number").length < 10) & !numericRegex.test(data.get("number"))
    ) {
      swal("Oops!", "Please enter your contact number correctly", "error");
      return;
    }
    const user = {
      email: data.get("email"),
      password: data.get("password"),
      name: data.get("firstName") + " " + data.get("lastName"),
      number: "+91" + data.get("number"),
    };

    try {
      await account
        .create(ID.unique(), user.email, user.password, user.name, user.number)
        .then(
          (response) => {
            console.log(response);
            swal(
              "Success",
              "Account created successfully & verification mail sent",
              "Success"
            ).then(() => {
              window.location.href = "/login";
            });
          },
          (error) => {
            console.log(error);
            swal("Error", "Account creation failed", "error");
          }
        );
      const datas = {
        email: email,
      };
      fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(datas),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.log(error);
      swal("Error", "Error connecting server", "error");
    }
  };

  return (
    <>
      {" "}
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
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={signupUser}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => setemail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="number"
                    label="Contact Number"
                    name="number"
                    type={"number"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <NavLink to="/login" variant="body2">
                    Already have an account? Sign in
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}
