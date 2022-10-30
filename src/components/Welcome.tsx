import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Welcome = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerInformations, setRegisterInformations] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/homepage");
      }
    });
  }, [navigate]);

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/homepage");
      })
      .catch((err) => alert(err.message));
  };

  const handleRegister = (e: any) => {
    if (registerInformations.email !== registerInformations.confirmEmail) {
      alert("Please confirm that email are same");
      return;
    } else if (
      registerInformations.password !== registerInformations.confirmPassword
    ) {
      alert("Please confirm that password are same");
      return;
    }

    createUserWithEmailAndPassword(
      auth,
      registerInformations.email,
      registerInformations.password
    )
      .then(() => {
        navigate("/homepage");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "90vw",
        minHeight: "90vh",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "500px",
          minWidth: "400px",
        }}
      >
        <Typography m={2} component="div" variant="h2">
          Todo List
        </Typography>
        <Stack spacing={2} mt={4} mb={1}>
          {isRegistering ? (
            <>
              <TextField
                placeholder="Email"
                type="email"
                value={registerInformations.email}
                onChange={(e) =>
                  setRegisterInformations({
                    ...registerInformations,
                    email: e.target.value,
                  })
                }
              />
              <TextField
                placeholder="Confirm Email"
                type="email"
                value={registerInformations.confirmEmail}
                onChange={(e) =>
                  setRegisterInformations({
                    ...registerInformations,
                    confirmEmail: e.target.value,
                  })
                }
              />
              <TextField
                placeholder="Password"
                type="password"
                value={registerInformations.password}
                onChange={(e) =>
                  setRegisterInformations({
                    ...registerInformations,
                    password: e.target.value,
                  })
                }
              />
              <TextField
                placeholder="Confirm Password"
                type="password"
                value={registerInformations.confirmPassword}
                onChange={(e) =>
                  setRegisterInformations({
                    ...registerInformations,
                    confirmPassword: e.target.value,
                  })
                }
              />

              <Button variant="contained" onClick={handleRegister}>
                Register
              </Button>
              <Button onClick={() => setIsRegistering(false)}>Go Back</Button>
            </>
          ) : (
            <>
              <TextField
                placeholder="Email"
                type="email"
                onChange={handleEmailChange}
                value={email}
              />
              <TextField
                placeholder="Password"
                type="password"
                onChange={handlePasswordChange}
                value={password}
              />
              <Button variant="contained" onClick={handleSignIn}>
                Sign In
              </Button>
              <Button
                variant="contained"
                onClick={() => setIsRegistering(true)}
              >
                Create an account
              </Button>
            </>
          )}
        </Stack>
      </Paper>
    </Container>
  );
};

export default Welcome;
