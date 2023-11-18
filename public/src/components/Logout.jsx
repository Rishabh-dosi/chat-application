import React from "react";
import { useNavigate } from "react-router";
import LogoutIcon from '@mui/icons-material/Logout';

export default function Logout() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        localStorage.clear();
        navigate('/login');
    }
    return (
        <>
            <button onClick={handleLogout}>
                <LogoutIcon />
            </button>
        </>
    )
}