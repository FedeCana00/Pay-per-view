import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { type } from "../../../constants/typeSearch";

export default function AdminHome() {
    // used to change programmatically page
    const navigate = useNavigate();

    // execute one time
    useEffect(() => {
        
        navigate('/films/' + type[2].name + '/');

    }, []);

    return (
        <div></div>
    );
}