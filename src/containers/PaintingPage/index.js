import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Spin} from 'antd';
import { Link } from "react-router-dom";
import "./index.scss";

import services from '../../services/index';

 
const PaintingPage = () => {
   
    const { client } = useSelector(state => state.client);
    const [loading, setLoading] = useState(false);
    const [loadMore, setLoadMore] = useState(false);
    const [showLoadMore, setShowLoadMore] = useState(false);
    const [currentPage, setPage] = useState(1);
    const [galleryImages, setGallery] = useState([]);
    const { id } = useParams()

    useEffect(() => {
         setLoading(true);
        setGallery([])
        setPage(1)
        getGalleryData(id, currentPage)
    }, [client]);

    const getGalleryData = (id, currentPage) => {
        services.MainService.getGalleryImages(id, currentPage)
            .then(res => res.json())
            .then(res => {
                let localdata = [];
                if (galleryImages.length > 0) {
                    localdata = galleryImages;
                }
                if (res.responseData !== undefined) {
                    for (let gallery of res.responseData.data) {
                        localdata.push(gallery);
                    }
                    if (res.responseData.to === null) {
                        currentPage = null;
                    } else {
                        currentPage = currentPage + 1;
                    }
                    setPage(currentPage)
                }
                localStorage.setItem('paitingList', JSON.stringify(localdata))
                setGallery(localdata)
                 setLoading(false);
                setLoadMore(false);
                setTimeout(() => {
                    setShowLoadMore(true)
                }, 1000)
            });
    }

    const load_more = (currentPage) => {
        setLoadMore(true);
        if (currentPage !== null) {
            getGalleryData(id, currentPage)
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
                <>
                    <div className="home-wrapper">
                        <div className="painting-list">
                            <article>
                                {galleryImages.map(item => (
                                    <section key={item.key}>
                                        <div className="images">
                                            <Link to={'/painting-details/' + item.id}>
                                                <img src={item.image_file} alt={item.title} />
                                            </Link>
                                        </div>
                                    </section>
                                ))}
                            </article>
                        </div>
                    </div>
                    <div className="text-center mt-3">
                       {/*  {loadMore ? <Spin ></Spin> : ''} */}
                        {/* {currentPage != null && showLoadMore == true ? <Button onClick={() => load_more(currentPage)}>Load More</Button> : ''} */}
                        {/* {currentPage === null ? (
                            <Alert
                                description="Unter dieser Galerie wurde kein Gemälde gefunden"
                                type="warning"
                                closable
                                onClose={onClose}
                            />) : ""} */}
                    </div>
                </>
            )}
        </>
    )
}

export default PaintingPage;