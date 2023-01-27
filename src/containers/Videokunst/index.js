import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Card, List, Spin } from 'antd';

import { SvgIcon } from '../../components/common';

import "./index.scss";

import services from '../../services/index';
 
const Videokunst = () => {
    const { client } = useSelector(state => state.client);
    const [loading, setLoading] = useState(false);
    /* const [loadMore, setLoadMore] = useState(false); */
    const [currentPage, setPage] = useState(1);
    const [galleryVideos, setVideos] = useState([]);

    useEffect(() => {
        setLoading(true);
        setVideos([])
        getVideoData(currentPage)
    }, [client]);

    const getVideoData = (currentPage) => {
        services.MainService.getVideos(currentPage)
            .then(res => res.json())
            .then(res => {
                setVideos([])
                let localdata = [];
                /* if (galleryVideos.length > 0) {
                    localdata = galleryVideos;
                } */
                if (res.responseData.length > 0) {
                    for (let videos of res.responseData) {
                        localdata.push(videos);
                    }
                    setPage(res.responseData.to)
                    if (res.responseData.to === null) { }
                }
                setVideos(localdata)
                setLoading(false);
             //   setLoadMore(false);
            });
    }

    /* const load_more = (currentPage) => {
        setLoadMore(true);
        if (currentPage !== null) {
            getVideoData(currentPage)
        } else {
            setLoadMore(false);
        }
    }

    const onClose = (e) => {
        console.log(e, 'I was closed.');
    }; */

    return (
        <>
            {galleryVideos.length === 0 && loading == true ? (
                <Spin>
                </Spin>
            ) : (
                <div className="home-wrapper">
                    <List
                        grid={{
                            gutter: 46,
                            xs: 1,
                            sm: 2,
                            md: 3,
                            lg: 3,
                            xl: 3,
                            xxl: 3,
                        }}
                        dataSource={galleryVideos}
                        renderItem={(item) => (
                            <List.Item>
                                <Card>
                                    <a href={item.youtube_link} className="title-link" target={'_blank'} rel="noreferrer" >
                                        <div className="image-col video-image-col">
                                            <SvgIcon className='vplay-icon' name="play-icon" viewbox="0 0 65 75" />
                                            <img src={item.thumbnail_image} alt={item.title} />
                                        </div>
                                        <div className="card-title">{item.title}</div>
                                    </a>
                                </Card>
                            </List.Item>
                        )}
                    />
                </div>
            )
        }
        </>
    )
}

export default Videokunst;