import React from "react";
import { NavLink } from "react-router-dom";
import "./index.scss"

const Footer = () => {
    return (
        <div className="main-footer">
            <NavLink to='/impressum'>Impressum</NavLink>
            <NavLink to='/datenschutz'>Datenschutz</NavLink>
        </div>
    )
}

export default Footer;
