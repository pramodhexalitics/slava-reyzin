import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation, useParams, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { SvgIcon } from '../../../components/common';
import MediaQuery from 'react-responsive';
import "./index.scss";
import services from '../../../services/index';

const SideBar = () => {
    const location = useLocation();
    const history = useNavigate();
    const { client } = useSelector(state => state.client);
    const [youtubeLink, setYoutube] = useState('');
    const [facebookLink, setFacebook] = useState('');
    const { id } = useParams()
    const [ImageDetail, setImage] = useState({});
    useEffect(() => {
        if(youtubeLink == '' || facebookLink == ''){
            services.MainService.getSocialLinks()
                .then(res => res.json())
                .then(res => {
                    if (res.responseData.youtube_link != null && res.responseData.youtube_link != "") {
                        setYoutube(res.responseData.youtube_link)
                    }
    
                    if (res.responseData.facebook_link != null && res.responseData.facebook_link != "") {
                        setFacebook(res.responseData.facebook_link)
                    }
                });
        }

        var link = "/painting-details/" + id;
        if (location.pathname == link ) {
            services.MainService.getGalleryImageDetail(id)
                .then(res => res.json())
                .then(res => {
                    if (res.responseData != undefined && res.responseData != null) {
                        setImage(res.responseData)
                    }
                });
        }  
    }, [location]);



    return (
        <React.Fragment>
            <div className="leftbar-inner">
                <div className="upper-logo">
                    <Link to="/">
                        SLAVA <br />
                        REYZIN
                    </Link>
                    <h4>Künstler</h4>
                </div>
                <div className="menu-list">
                    <ul className="">
                        <li key='1'>
                            <NavLink to="/home" className={location.pathname === "/home" ? "selected" : ""}>Home</NavLink>
                        </li>
                        <li key='2'>
                            <NavLink to="/Galerien" className={location.pathname === "/Galerien" ? "selected" : ""}>Galerien</NavLink>
                        </li>
                        <li key='3'>
                            <NavLink to="/Videokunst" className={location.pathname === "/Videokunst" ? "selected" : ""}>Videokunst</NavLink>
                        </li>
                        <li key='4' className="bottom-menu">
                            <NavLink to="/about">Über mich</NavLink>
                        </li>
                        <li key='5'>
                            <NavLink to="/Kontakt">Kontakt</NavLink>
                        </li>
                    </ul>
                    <div className="social-btn">
                        <a href={facebookLink} target={'_blank'}> <Button> <SvgIcon name='facebook-icon' viewbox='0 0 34.875 34.664' /></Button></a>
                        <a href={youtubeLink} target={'_blank'}> <Button><SvgIcon name='youtube-icon' viewbox='0 0 38.4 27' /></Button></a>
                    </div>
                </div>
                <MediaQuery minWidth={992}>
                    {location.pathname === "/painting-details/" + id ?
                        <div className="painting-left-info">
                            <div className="tag"> {ImageDetail.gallery_title}</div> 
                            <div className="title">{ImageDetail.title}</div>
                            <p>{ImageDetail.size}</p>
                            <p>{ImageDetail.used_materials}</p>
                            <p>{ImageDetail.year}</p>
                        </div>
                        :
                        null
                    }
                </MediaQuery>
            </div>
        </React.Fragment>
    )
}

export default SideBar;