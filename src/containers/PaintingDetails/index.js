import React, { useState, useEffect, useCallback } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Button, Spin } from 'antd';
import services from '../../services/index';
import MediaQuery from 'react-responsive';
import { SvgIcon } from '../../components/common'; 
import "./index.scss";
 import ArrowKeysReact from 'arrow-keys-react';
const PaintingDetails = () => {
    const navigate = useNavigate();
    const { client } = useSelector(state => state.client);
    const [loading, setLoading] = useState(false);
    const [ImageDetail, setImage] = useState({});
    const [paintings, setPaintings] = useState([]);
    var { id } = useParams()
    var inputElement;
    useEffect(() => {
        console.log('painting_id ', id )
        console.log('localdata ', JSON.parse(localStorage.paitingList) )
        setLoading(true); 
        if (localStorage.paitingList != undefined && localStorage.paitingList != ''){
            setPaintings(JSON.parse(localStorage.paitingList));
            setTimeout(() => {
                services.MainService.getGalleryImageDetail(id)
                    .then(res => res.json())
                    .then(res => {
                        if (res.responseData != undefined && res.responseData != null) {
                            setImage(res.responseData)

                        }
                        setLoading(false);
                    }); 
                setLoading(false);
            }, 500);
        }
        
       /*  ArrowKeysReact.config({
            left: () => {
                console.log('left key detected. ', id);
                onPreviousNextClick('previous')
            },
            right: () => {
                console.log('right key detected. ', id);
                onPreviousNextClick('next')
            },
            up: () => {
                console.log('up key detected. ', id);
            },
            down: () => {
                console.log('down key detected. ', id);
            }
        }); */
        
        window.addEventListener('keydown', UpHandler);
        return () => document.removeEventListener("keydown", UpHandler); 
        
    }, [client]);
    
    const UpHandler = ({ key }) => {
        if (key == 'ArrowRight') {

            let btn = document.getElementById('next_button');
            if (btn!= null){
                btn.click();
            }
        }
        
        if (key == 'ArrowLeft') {
            let btn = document.getElementById('previous_button')
            if(btn!= null){
                btn.click();
            }
        }
    };

    const onPreviousNextClick = (type) =>{
        let paintings_new  = JSON.parse(localStorage.paitingList);
        let index = paintings_new .findIndex(obj => {
            return parseInt(obj.id) == parseInt(id)
        });
        if (index !== -1) {
            let newIndex = 0;
            if (type == 'previous') {
                newIndex = parseInt(index) - 1;
            }
            else if (type == 'next') {
                newIndex = parseInt(index) + 1;
            }
       
            if (paintings_new[newIndex] != undefined) {
                setLoading(true);
                navigate("/painting-details/" + paintings_new[newIndex]['id']);
                setImage(paintings_new[newIndex])
                setTimeout(() => {
                    setLoading(false);
                }, 300);
            } 
        }
        
        
    }

    return (
        <>
            {loading == true ? (
                <Spin>
                </Spin>
            ) : (
                    <div   >
                        <div className="home-wrapper text-center" > {/* onKeyDown={() => handleKeyDown()} */}
                        <div className="painting-details">
                            <div className="painting-details-inner">
                                <Button className="left-arrow-btn" id="previous_button" onClick={() => onPreviousNextClick('previous')}>
                                    <SvgIcon name='arrow-left' viewbox='0 0 42.12 24' />
                                </Button>
                                <Button className="right-arrow-btn" id="next_button" onClick={() => onPreviousNextClick('next')}>
                                    <SvgIcon name='arrow-left' viewbox='0 0 42.12 24' />
                                </Button>
                                <img src={ImageDetail.image_file} alt={ImageDetail.image_file} />
                            </div>
                            <div className="bottom-action">
                                <Button className="left-arrow-btn" id="previous_button" onClick={() => onPreviousNextClick('previous')}>
                                    <SvgIcon name='arrow-left' viewbox='0 0 42.12 24' />
                                </Button>
                                <Button className="right-arrow-btn" id="next_button" onClick={() => onPreviousNextClick('next')}>
                                    <SvgIcon name='arrow-left' viewbox='0 0 42.12 24' />
                                </Button>
                            </div>
                            <MediaQuery maxWidth={991}>
                                <div className="painting-left-info">
                                    <div className="tag"> {ImageDetail.gallery_title}</div> 
                                    <div className="title">{ImageDetail.title}</div>
                                    <p>{ImageDetail.size}</p>
                                    <p>{ImageDetail.used_materials}</p>
                                    <p>{ImageDetail.year}</p>
                                </div>
                            </MediaQuery>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}


export default PaintingDetails;