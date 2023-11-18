import React , {useState , useEffect} from "react";
import Logo from "../assets/logo.svg";
import "./register.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";


export default function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",

    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            console.log("in validation", loginRoute)
            const { password, username } = values;
            const { data } = await axios.post(loginRoute, {
                username,
                
                password,
            });
            if (data.status === false) {
                alert(data.msg);

            }
            if (data.status === true) {
                localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                navigate("/")
            }
        }
    }

    const handleValidation = (e) => {
        const { username, email, password, confirm_password } = values;
        if (password==="") {
            alert("password is required");
            return false;
        } 
        else if (username==="") {
            alert("username is required");
            return false;

        }
        
        else return true;
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    }
    useEffect(() => {
        if (localStorage.getItem("chat-app-user")) {
            navigate("/")
        }
    },[])
    
    return (
        <div className="form_container">

            <form onSubmit={handleSubmit}>
                <div className="logo">
                    <img src={Logo} alt="logo" />  <h1>
                        neuron
                    </h1>
                </div>
                <input type="text" name="username" placeholder="Username" onChange={(e) => handleChange(e)} id="" />
                
                <input type="password" name="password" placeholder="Password" onChange={(e) => handleChange(e)} id="" />
                
                <button type="submit"> LOGIN </button>
               
            </form>
        </div>
    )
}