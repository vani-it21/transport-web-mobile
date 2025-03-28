import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const clientId = "78627191664-riu4anesdbmb7vg2h0s82363v1vcp6n2.apps.googleusercontent.com";

function Login() {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={(response) => {
          console.log("Login Success", response);

          fetch("http://localhost:5000/api/auth/google", {  
            
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: response.credential }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Backend Response:", data);
              localStorage.setItem("user", JSON.stringify(data)); // Store user info
              
              // Redirect based on role
              if (data.role === "admin") {
              
                navigate("/admin");
              } else {
                navigate("/user");
              }
            })
            .catch((err) => console.error("Error:", err));
        }}
        onError={() => console.log("Login Failed")}
      />
    </GoogleOAuthProvider>
  );
}

export default Login;
