import React from "react";
import { Col, Row } from "../../components/common";
import "./index.scss";

import AboutImage from '../../assets/images/about-img.jpg';

const AboutPage = () => {
    const aboutList = [
        { key: 1, info: '1957: Geboren in Yurga (Sibirien), Russland' },
        { key: 2, info: '1974-1979: Architekturstudium in Novosibirsk' },
        { key: 3, info: '1979-1984: Kunst-Hochschullehrer in Tomsk' },
        { key: 4, info: '1983: Weiterbildung in der Kunstakademie Moskau' },
        { key: 5, info: '1984-1989: Teilnahme an Kunstausstellungen in Sibirien' },
        { key: 6, info: '1989: Kunststudium in Torschok' },
        { key: 7, info: '1984-1992: Designer und Architekt in Yurga' },
        { key: 8, info: 'Seit 1993: Gründer und Direktor eines Maschinenbauunternehmens in Yurga' },
        { key: 9, info: '2000: Umzug nach Deutschland' },
        { key: 10, info: 'Seit 2000: Fokus komplett wieder auf der Kunst insbesondere auf das Zeichnen' },
        { key: 11, info: 'Seit 2001: Reisen um die ganze Welt, die meine Kunst inspiriert haben' },
        { key: 12, info: 'Seit 2003: Teilnahme an Ausstellungen in Deutschland und Österreich' },
        { key: 13, info: 'Seit 2019: Angefangen, Kunst mit Video und Musik zu kombinieren' },
    ];
    return (
        <div className="home-wrapper">
            <div className="about-page">
                <Row>
                    <Col md='7' className='about-left'>
                        <h3>Biografie</h3>
                        <ul>
                            {aboutList.map(item => (
                                <li key={item.key}>{item.info}</li>
                            ))
                            }
                        </ul>
                    </Col>
                    <Col md='5' className='about-right'>
                        <img src={AboutImage} alt={AboutImage} />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default AboutPage;