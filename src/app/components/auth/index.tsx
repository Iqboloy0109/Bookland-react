import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Fab, Stack, TextField, Typography } from "@mui/material";
import styled, { keyframes } from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import { T } from "../../../lib/types/common";
import { Messages } from "../../../lib/config";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";

// Styled-components animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Material-UI styles without animations
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "16px",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
    padding: 0,
    border: "none",
    overflow: "hidden",
  },
}));

const ModalImg = styled.img`
  width: 45%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const FormContainer = styled.div`
  width: 55%;
  padding: 40px;
  background: white;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.5s ease-out;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, #ff7e5f, #feb47b);
  }
`;

const FormTitle = styled(Typography)`
  && {
    color: #2c3e50;
    font-weight: 700;
    margin-bottom: 30px;
    position: relative;
    animation: ${fadeIn} 0.6s ease-out;

    &::after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 50px;
      height: 4px;
      background: linear-gradient(to right, #ff7e5f, #feb47b);
      border-radius: 2px;
    }
  }
`;

const FormTextField = styled(TextField)`
  && {
    margin: 12px 0;
    animation: ${fadeIn} 0.6s ease-out;

    .MuiOutlinedInput-root {
      border-radius: 8px;
      transition: all 0.3s ease;

      &:hover .MuiOutlinedInput-notchedOutline {
        border-color: #ff7e5f;
      }

      &.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: #ff7e5f;
        box-shadow: 0 0 0 2px rgba(255, 126, 95, 0.2);
      }
    }

    .MuiInputLabel-outlined {
      color: #7f8c8d;

      &.Mui-focused {
        color: #ff7e5f;
      }
    }
  }
`;

const AuthButton = styled(Fab)`
  && {
    background: linear-gradient(45deg, #ff7e5f 0%, #feb47b 100%);
    background-size: 200% 200%;
    color: white;
    font-weight: 600;
    letter-spacing: 0.8px;
    margin-top: 20px;
    width: 150px;
    height: 48px;
    transition: all 0.4s ease;
    animation: ${fadeIn} 0.7s ease-out, ${pulse} 2s infinite 1s;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(255, 126, 95, 0.3);
      animation: ${gradientShift} 3s ease infinite, ${pulse} 2s infinite;
    }
  }
`;

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const classes = useStyles();

  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const { setAuthMember } = useGlobals();

  /** HANDLERS **/
  const handleUsername = (e: T) => {
    setMemberNick(e.target.value);
  };
  const handlePhone = (e: T) => {
    setMemberPhone(e.target.value);
  };
  const handlePassword = (e: T) => {
    setMemberPassword(e.target.value);
  };
  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter" && signupOpen) {
      handleSignupRequest().then();
    } else if (e.key === "Enter" && loginOpen) {
      handleLoginRequest().then();
    }
  };

  const handleSignupRequest = async () => {
    try {
      const isFulfill =
        memberNick !== "" && memberPhone !== "" && memberPassword !== "";
      if (!isFulfill) throw new Error(Messages.error3);

      const signupInput: MemberInput = {
        memberNick: memberNick,
        memberPhone: memberPhone,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.signup(signupInput);

      setAuthMember(result);
      handleSignupClose();
    } catch (err) {
      console.log(err);
      handleSignupClose();
      sweetErrorHandling(err).then();
    }
  };

  const handleLoginRequest = async () => {
    try {
      const isFulfill = memberNick !== "" && memberPassword !== "";
      if (!isFulfill) throw new Error(Messages.error3);

      const loginInput: LoginInput = {
        memberNick: memberNick,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.login(loginInput);

      setAuthMember(result);
      handleLoginClose();
    } catch (err) {
      console.log(err);
      handleLoginClose();
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div>
      {/* Signup Modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={signupOpen}>
          <div className={classes.paper}>
            <Stack direction="row">
              <ModalImg src={"/img/auth.webp"} alt="signup" />
              <FormContainer>
                <FormTitle variant="h4">Join Us</FormTitle>
                <FormTextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  onChange={handleUsername}
                />
                <FormTextField
                  fullWidth
                  label="Phone Number"
                  variant="outlined"
                  onChange={handlePhone}
                />
                <FormTextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  onChange={handlePassword}
                  onKeyDown={handlePasswordKeyDown}
                />
                <AuthButton variant="extended" onClick={handleSignupRequest}>
                  <LoginIcon sx={{ mr: 1 }} />
                  Sign Up
                </AuthButton>
              </FormContainer>
            </Stack>
          </div>
        </Fade>
      </Modal>

      {/* Login Modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={loginOpen}>
          <div className={classes.paper}>
            <Stack direction="row">
              <ModalImg src={"/img/auth.webp"} alt="login" />
              <FormContainer>
                <FormTitle variant="h4">Welcome Back</FormTitle>
                <FormTextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  onChange={handleUsername}
                />
                <FormTextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  onChange={handlePassword}
                  onKeyDown={handlePasswordKeyDown}
                />
                <AuthButton variant="extended" onClick={handleLoginRequest}>
                  <LoginIcon sx={{ mr: 1 }} />
                  Login
                </AuthButton>
              </FormContainer>
            </Stack>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
