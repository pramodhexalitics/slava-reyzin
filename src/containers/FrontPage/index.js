import React, { useState, useEffect } from "react";
import { Button, Spin } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import Slider from "react-slick";
import "../../assets/scss/plugins/slick-slider/slick.min.scss";
import "../../assets/scss/plugins/slick-slider/slick-theme.min.scss";
import "./index.scss";

import services from '../../services/index';

const FrontPage = () => {
    const { client } = useSelector(state => state.client);
    const [bannerImages, setBanner] = useState([]);
    const [loading, setLoading] = useState(false);

    const settings = {
        dots: true,
        infinite: true,
        speed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        fade: true
    };

    useEffect(() => {
         setLoading(true);
        services.MainService.getFrontPageBanner()
            .then(res => res.json())
            .then(res => {
                if (res.responseData.length > 0) {
                    setBanner(res.responseData)

                }
                 setLoading(false);
            });
    }, [client]);


    return (
        <>
            {bannerImages.length === 0 && loading == true ? (
                <Spin />
            ) : (
                <div className="frontpage-wrapper">
                    <Slider {...settings}>
                        {bannerImages.length > 0 ?
                            bannerImages.map((items) => {

                                return <div>
                                    <div className="bg-image" style={{ backgroundImage: `url(${items.image_file})` }}></div>
                                </div>
                            })
                            : ''}
                    </Slider>
                    <div className="frontpage-inner">
                        <div className="logo">SLAVA REYZIN - KÜNSTLER</div>
                        <div className="start-btn">
                            <Link to='/home'><Button>START</Button></Link>
                        </div>
                        <div lang="bottom"></div>
                    </div>
                </div>)
            }
        </>
    )
}

export default FrontPage;