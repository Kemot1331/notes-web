import "./LoginPage.css";
import { loginUser } from "../authApi";
import { useState } from "react";

export default function LoginPage( {onLoginSuccess} ) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(null);

    const handleLoginUser = async (e) => {
        e.preventDefault();
        setLoginError(null);
        try{
            const response = await loginUser(email, password);
            localStorage.setItem("token", response.token);
            onLoginSuccess();
        }
        catch (error){
            setLoginError(error.response.data.message);
            console.error(loginError);
        }
    };

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
                    <form className="login-card" onSubmit={handleLoginUser}>
                        <label htmlFor="email" className="login-text">Email address</label>
                        <input type="email" name="email" id="email" style={{marginBottom: "3vh"}}
                        placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)}/>

                        <label htmlFor="password" className="login-text">Password</label>
                        <input type="password" name="password" id="password" placeholder="Enter your password"
                        value={password} onChange={(e) => setPassword(e.target.value)}/>

                        {loginError && (
                            <div className="login-error">
                                <p>{loginError}</p>
                            </div>
                            )
                        }

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