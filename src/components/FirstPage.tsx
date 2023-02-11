import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

type Nullable<T> = T | null;

interface Istate {
  name: string;
  email: string;
  phoneNumber: Nullable<number>;
}

interface IErrorState {
  name: boolean;
  email: boolean;
  phoneNumber: boolean;
}

let Copyright = (props: any) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "} {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

let FirstPage: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<Istate>({
    name: "",
    email: "",
    phoneNumber: null
  });
  const [error, setError] = useState<IErrorState>({
    name: false,
    email: false,
    phoneNumber: false
  });

  // handle change function
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
    setError({
      ...error,
      [event.target.name]: !event.target.value
    });
  };

  // form handling
  const handleSubmit = (): void => {
    const { name, email, phoneNumber } = user;
    if (!name || !email || !phoneNumber) {
      alert("Please fill the details");
      return;
    }
    localStorage.clear();
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/info");
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
        <Typography component="h1" variant="h5">
          Registration Form
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="firstName"
                error={error.name}
                helperText={error.name ? "Please enter a valid name" : ""}
                value={user.name}
                onChange={handleChange}
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                id="phone-number"
                error={error.phoneNumber}
                helperText={error.phoneNumber ? "Please enter a valid phoneNumber" : ""}
                value={user.phoneNumber}
                type="number"
                onChange={handleChange}
                autoComplete="nphone-number"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                error={error.email}
                helperText={error.email ? "Please enter a valid email" : ""}
                value={user.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 3, mb: 2 }}
            disabled={Object.values(error).some(e => e === true)}
            onClick={handleSubmit}>
            Sign Up
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default FirstPage;
