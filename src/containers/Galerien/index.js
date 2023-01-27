import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Card, List, Spin, Button, Alert } from 'antd';
import { Link } from "react-router-dom";
import "./index.scss";
 
import services from '../../services/index';

const Galerien = () => {
    const { client } = useSelector(state => state.client);
    const [loading,  setLoading] = useState(false);
    const [loadMore, setLoadMore] = useState(false);
    const [showLoadMore, setShowLoadMore] = useState(false);
    const [currentPage, setPage] = useState(1);
    const [galleryImages, setGallery] = useState([]);
     
    useEffect(() => {
         setLoading(true);
        setGallery([])
        setPage(1)
        getGalleryData(currentPage)
    }, [client]);

    const getGalleryData = (currentPage) => {
        services.MainService.getGalleryPageData(currentPage)
            .then(res => res.json())
            .then(res => {
                let localdata = [];
                if (galleryImages.length > 0){
                    localdata = galleryImages;
                }
                if (res.responseData !== undefined) {
                    for (let gallery of res.responseData.data) {
                        localdata.push(gallery);
                    }

                    if (res.responseData.to === null){
                        currentPage = null;
                    } else {
                        currentPage = currentPage + 1;
                    }
                    setPage(currentPage)
                }
                setGallery(localdata)
                 setLoading(false);
                setLoadMore(false);
                setTimeout(() => {
                    setShowLoadMore(true)
                }, 1000);
            });
    }
    
    const load_more = (currentPage) => {
        setLoadMore(true);
        if(currentPage!== null){
            getGalleryData(currentPage)
        } else {
            setLoadMore(false);
        }
    }
    
    const onClose = (e) => {
        console.log(e, 'I was closed.');
    };

    return (
        <>
            {galleryImages.length === 0 && loading == true ? (
                <Spin>
                </Spin>
            ) : (
            <div className="home-wrapper galerien-page">
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
                    dataSource={galleryImages}
                    renderItem={(item) => (
                        <List.Item>
                            <Card>
                                <div className="image-col">
                                    <Link to={'/painting/' + item.id}>
                                        <img src={item.image_file} alt={item.title} />
                                    </Link>
                                </div>
                                <div className="card-title">{item.title}</div>
                            </Card>
                        </List.Item>
                    )}
                />
                <div className="text-center mt-2">
                    {/* {loadMore ? <Spin ></Spin> : ''}
                            {currentPage !== null && showLoadMore == true ? <Button onClick={() => load_more(currentPage)}>Load More</Button> : '' } */}
                    {/* {currentPage === null ?  (
                    <Alert
                        description="Keine Artikel mehr in der Galerie"
                        type="warning"
                        closable
                        onClose={onClose}
                    />) : "" }    */}
                </div>
            </div>
            )}
        </>
    )
}

export default Galerien;