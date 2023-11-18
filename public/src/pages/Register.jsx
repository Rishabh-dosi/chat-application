import React , {useState} from "react";
import Logo from "../assets/logo.svg";
import { Link , useNavigate } from "react-router-dom"; 
import './register.css';
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",

    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            console.log("in validation" , registerRoute)
            const { password, confirm_password, username, email } = values;
            const { data } = await axios.post(registerRoute, {
                username,
                email,
                password,
            });
            if (data.status === false) {
                alert(data.msg);

            }
            if (data.status === true) {
                localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                navigate("/setProfile")
            }
        }
    }

    const handleValidation = (e) => {
        const { username, email, password, confirm_password } = values;
        if (password !== confirm_password) {
            alert("password not matching with initial password");
            return false;
        } else if (password.length < 8) {
            alert("password length should be more than 8 characters");
            return false;
        }
        else if (username.length < 3) {
            alert("username should be of more than 3 characters");
            return false;

        }
        else if (email === "") {
            alert("email is required");
            return false;
        }
        else return true;
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [e.target.name]:  e.target.value,
        });
    }
    return (
        <div className="form_container">
            
            <form onSubmit={handleSubmit}>
                <div className="logo">
                    <img src={Logo} alt="logo" />  <h1> 
                        neuron
                    </h1>
                </div>
                <input type="text" name="username" placeholder="Username" onChange={(e) => handleChange(e)} id="" />
                <input type="email" name="email" placeholder="Email" onChange={(e) => handleChange(e)} id="" />
                <input type="password" name="password" placeholder="Password" onChange={(e)=>handleChange(e)} id="" />
                <input type="password" name="confirm_password" placeholder="Confirm Password" onChange={(e) => handleChange(e)} id="" />
                <button type="submit"> ADD USER</button>
                <p>Already a user <span>
                <Link to="/login">Login</Link>
                </span></p>
            </form>
        </div>
    )
}