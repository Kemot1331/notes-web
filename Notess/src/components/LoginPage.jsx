import "./LoginPage.css";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="login-container">
            <div className="logo" style={{fontSize: "16px", textAlign: "left"}}>Notess</div>
            <div className="greetings-login">
                <div className="logo" style={{
                    fontSize: "5vh", textAlign: "left", marginLeft: "10vw",
                     marginBottom: "1vh"
                    }}>Welcome back!</div>
                <div className="logo" style={{
                    fontSize: "3vh", textAlign: "left", marginLeft: "10vw",
                     marginTop: "0", color: "#757171"
                    }}>Sign in to your notes</div>
            </div>
                <div className="login-card-container">
                    <form className="login-card" method="post">
                        <label for="email" className="login-text">Email address</label>
                        <input type="email" name="email" id="123" style={{marginBottom: "3vh"}}
                        placeholder="you@example.com"/>

                        <label for="password" className="login-text">Password</label>
                        <input type="password" name="password" id="123" placeholder="Enter your password"/>

                        <button className="sign-in-button">Sign in</button>
                        <div className="login-text" style={{textAlign: "center", fontSize: "14px", marginTop: "5vh"}}>
                            <span>Don't have an account? </span>
                            <a href="">Create account</a>
                        </div>
                </form>
            </div>
        </div>
    );
}