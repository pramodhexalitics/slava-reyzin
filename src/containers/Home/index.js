import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

import { Card, List, Spin } from 'antd';
import { SvgIcon } from '../../components/common';
import "./index.scss";

import { Link } from "react-router-dom";
import services from '../../services/index';

const Home = () => {
    const { client } = useSelector(state => state.client);
    const [loading, setLoading] = useState(false);
    const [homeData, setHomeData] = useState([]);

    useEffect(() => {
        setLoading(true);
        services.MainService.getHomePageData()
            .then(res => res.json())
            .then(res => {
                setHomeData([])
                let localdata = [];
                if (res.responseData !== undefined) {
                    for (let gallery of res.responseData.gallery) {
                        gallery.gallery = true;
                        localdata.push(gallery);
                    }
                    localdata.push({
                        title: 'Weitere Galerien',
                        link: '/galerien'
                    })

                    for (let videos of res.responseData.videos) {
                        videos.videos = true;
                        localdata.push(videos);
                    }


                    localdata.push({
                        title: 'Weitere Videokunst',
                        link: '/videokunst'
                    })

                }
                setHomeData(localdata)
                setLoading(false);
            });
    }, [client]);


    return (
        <>

            {homeData.length === 0 && loading == true ? (
                <Spin >
                </Spin>
            ) : (
                <div className="home-wrapper">

                    {homeData ? <List
                        grid={{
                            gutter: 46,
                            xs: 1,
                            sm: 2,
                            md: 3,
                            lg: 3,
                            xl: 3,
                            xxl: 3,
                        }}
                        dataSource={homeData}
                        renderItem={(item) => (
                            <List.Item>
                                {item.gallery ? (
                                    <Card>
                                        <div className="image-col">
                                            <Link to={'/painting/' + item.id}>
                                                <img src={item.image_file} alt={item.title} />
                                            </Link>
                                        </div>
                                        <div className="card-title">{item.title}</div>
                                    </Card>
                                ) : item.videos ?
                                    <Card>
                                        <a href={item.youtube_link} className="title-link" target={'_blank'} rel="noreferrer" >
                                            <div className="image-col video-image-col">
                                                <SvgIcon className='vplay-icon' name="play-icon" viewbox="0 0 65 75" />
                                                <img src={item.thumbnail_image} alt={item.title} />
                                            </div>
                                            <div className="card-title">{item.title}</div>
                                        </a>
                                    </Card>
                                    : (
                                        <Card className="title-card">
                                            <Link to={item.link} className="title-link">
                                                <span>{item.title}</span> <SvgIcon name='arrow-right' viewbox='0 0 13.503 23.616' />
                                            </Link>
                                        </Card>
                                    )
                                }
                            </List.Item>
                        )}
                    /> : ''}

                </div>
            )
            }
        </>
    )
}

export default Home;