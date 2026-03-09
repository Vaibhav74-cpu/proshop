import React from "react";

import { Button } from "react-bootstrap";
import { BASE_URL } from "../constant";

function GoogleLogin() {
  return (
    <div>
      <Button
        onClick={() => window.open(`${BASE_URL}/api/auth/google`, "_self")} //when user click it goes to backend routr->/api/auth/google
        className="google-login-btn"
        variant="dark"
      >
        <img
          style={{ height: "25px", width: "25px", marginRight: "3px" }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/500px-Google_%22G%22_logo.svg.png"
          alt="Google"
          variant="outline"
        />
      
      </Button>
    </div>
  );
}

export default GoogleLogin;

/*
flow of oauth
React (Login with Google button) --> go to the backend route -> /api/auth/google -> rediect to consent screen
        ↓
Backend /auth/google  -> Passport redirects the user to Google’s login/permission page.
        ↓
user clicks Continue --> consent screen with continue button
        ↓
google/callback(run when user click on contine) -->(not visible to user) -> token created and store on cookie 
        ↓
redirect to frontend (auth-succrss screen) -> store token in redux
        ↓
get user data through the token
        ↓
login on ui succrssfully
*/
