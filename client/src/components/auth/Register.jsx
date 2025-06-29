import { useState } from "react";
import { register } from "../managers/authmanager";
import { Link, useNavigate } from "react-router-dom";
import { Button, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import "./auth.css"

export default function Register({ setLoggedInUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userPhotoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordMismatch, setPasswordMismatch] = useState();
  const [registrationFailure, setRegistrationFailure] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
    } else {
      const newUser = {
        name,
        email,
        userDescription,
        userPhotoUrl,
        password
      };
      register(newUser).then((user) => {
        if (user) {
          setLoggedInUser(user);
          navigate("/");
        } else {
          setRegistrationFailure(true);
        }
      });
    }
  };

  return (
    <>
    <h2>Antiques ShowPlace!</h2>
    <div className="container" style={{ maxWidth: "500px" }}>
      
      <h3>Sign Up</h3>
      <div className="login-box">
      
      <FormGroup>
        <Label>Name: </Label>
        <Input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label>Email: </Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <div className="user-description">
        <Label>User Description: </Label>
        <Input
          type="text"
          value={userDescription}
          onChange={(e) => {
            setUserDescription(e.target.value);
          }}
        />
        </div>
      </FormGroup>
      <FormGroup>
        <Label>User Profile Photo (optional): </Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(evt) => {
            const file = evt.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
              setPhotoUrl(reader.result);
            }
            reader.readAsDataURL(file);
          }}
        />
        {userPhotoUrl !== "" ? (
          <div className="register-image">
        <img
        className="register-image"
          src={userPhotoUrl}
          alt="Item"
          style={{ width: "200px", height: "150px", objectFit: "cover", marginRight: "15px" }}
        />
        </div>
        ) : (
          <></>
        ) }

      </FormGroup>
      <FormGroup>
        <div className="user-password">
        <Label>Password: </Label>
        <Input
          invalid={passwordMismatch}
          type="password"
          value={password}
          onChange={(e) => {
            setPasswordMismatch(false);
            setPassword(e.target.value);
          }}
        />
        </div>
      </FormGroup>
      <FormGroup>
        <div className="confirm-password">
        <Label> Confirm Password: </Label>
        <Input
          invalid={passwordMismatch}
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setPasswordMismatch(false);
            setConfirmPassword(e.target.value);
          }}
        />
        </div>
        
      </FormGroup>
      <p style={{ color: "red" }} hidden={!registrationFailure}>
        Registration Failure
      </p>
      <Button
      className="register-btn"
        color="primary"
        onClick={handleSubmit}
        disabled={passwordMismatch}
      >
        Register
      </Button>
      <p>
        Already signed up? Log in <Link to="/login">here</Link>
      </p>
      </div>
    </div>
    </>
  );
}
