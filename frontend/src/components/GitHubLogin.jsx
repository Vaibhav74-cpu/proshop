import React from "react";
import { Button } from "react-bootstrap";
import { BASE_URL } from "../constant";

function GitHubLogin() {
  return (
    <div>
      <div>
        <Button
          onClick={() => window.open(`${BASE_URL}/api/auth/github`, "_self")} //when user click it goes to backend routr->/api/auth/github
          className="github-login-btn"
          variant="dark"
        >
          <img
            style={{ height: "25px", width: "25px", marginRight: "3px" }}
            src="https://cdn.worldvectorlogo.com/logos/github-icon-2.svg"
            alt="Github"
            variant="outline"
          />
          
        </Button>
      </div>
    </div>
  );
}

export default GitHubLogin;
