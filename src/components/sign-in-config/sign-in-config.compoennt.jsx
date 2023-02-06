import "./sign-in-config.styles.scss";
import Button, { BUTTON_TYPES } from "../button/button.component";
import { CustomTextField } from "../../mui.styles";
import { useState } from "react";
import {
  createUserDocumentFromAuth,
  createUserWithEmailAndPasswordSignUp,
  signInWithGooglePopup,
  userSignInWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import { muiStyles } from "../../mui.styles";
const INITIAL_FORM_DATA = {
  signInEmail: "",
  signInPassword: "",
  name: "",
  signUpEmail: "",
  signUpPassword: "",
  signUpPassword2: "",
};
const pwRegEx =
  "/^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*s).{8,16}$/";
const emailRegEx =
  "^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$";
const SignInConfig = () => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const displayError = (message) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  };
  const changeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const googleSignIn = async () => {
    await signInWithGooglePopup();
  };
  const signInHandler = (e) => {
    e.preventDefault();
    userSignInWithEmailAndPassword(
      formData.signInEmail,
      formData.signInPassword
    );
  };
  const signUpHandler = async (e) => {
    e.preventDefault();
    if (formData.signUpPassword !== formData.signUpPassword2) {
      displayError("Passwords do not match");
      return;
    } else if (!formData.signUpEmail.match(emailRegEx)) {
      displayError("email is not accepted");
      return;
    } else if (!formData.signUpPassword.match(pwRegEx)) {
      displayError(
        "Password must be between 8-16 and contain special characters, numbers and both small and capital characters"
      );
      return;
    }
    const { user } = await createUserWithEmailAndPasswordSignUp(
      formData.signUpEmail,
      formData.signUpPassword
    );
    createUserDocumentFromAuth(user, formData.name);
  };
  return (
    <div className='sign-in-container'>
      <Button
        onClick={googleSignIn}
        buttonType={BUTTON_TYPES.GOOGLE_SIGN_IN}
      >
        sign in with Google
      </Button>
      <form
        className='center form-container'
        onSubmit={signInHandler}
      >
        <CustomTextField
          sx={muiStyles}
          label='email'
          variant='outlined'
          required
          onChange={changeHandler}
          name='signInEmail'
          value={formData.signInEmail}
        />
        <CustomTextField
          sx={muiStyles}
          label='password'
          variant='outlined'
          required
          type='password'
          name='signInPassword'
          onChange={changeHandler}
          value={formData.signInPassword}
        />
        <Button
          type='submit'
          buttonType={BUTTON_TYPES.MAIN}
        >
          sign in with email
        </Button>
      </form>

      <form
        className='center form-container'
        onSubmit={signUpHandler}
      >
        <CustomTextField
          sx={muiStyles}
          label='name'
          variant='outlined'
          required
          onChange={changeHandler}
          value={formData.name}
          name='name'
        />
        <CustomTextField
          sx={muiStyles}
          label='email'
          variant='outlined'
          required
          onChange={changeHandler}
          value={formData.signUpEmail}
          name='signUpEmail'
        />
        <CustomTextField
          sx={muiStyles}
          label='password'
          variant='outlined'
          required
          name='signUpPassword'
          type='password'
          value={formData.signUpPassword}
          onChange={changeHandler}
        />
        <CustomTextField
          sx={muiStyles}
          label='password'
          variant='outlined'
          required
          name='signUpPassword2'
          type='password'
          value={formData.signUpPassword2}
          onChange={changeHandler}
        />
        <Button
          type='submit'
          buttonType={BUTTON_TYPES.MAIN}
        >
          sign up with email
        </Button>
      </form>
      {error && <span className='error-message'>{error}</span>}
    </div>
  );
};
export default SignInConfig;
