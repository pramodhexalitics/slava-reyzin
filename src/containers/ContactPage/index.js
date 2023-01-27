import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import services from '../../services/index';
import { Form, Input, Checkbox, Button, Spin, Alert } from 'antd';
import { Link } from "react-router-dom";
import { Col, Row } from "../../components/common";
import "./index.scss";
 
const { TextArea } = Input;

const ContactPage = () => {
    const [form] = Form.useForm();
    const { client } = useSelector(state => state.client);
    const [contactUsData, setContactUs] = useState({});
    const [loading, setLoading] = useState(false);
    const [contactform, setSuccess] = useState(false);
    const [checked, setChecked] = useState(false);
    useEffect(() => {
    }, [client]);

    const handleEdit = (modal) => {
        setLoading(true)
        services.MainService.ContactUs(contactUsData)
            .then(res => res.json())
            .then(res => {
                console.log('res ', res)
                if (res.status == 200) {
                    setSuccess(true)
                } else {
                    setSuccess(false)
                }
                setLoading(false)
            }).catch(e => console.log(e));
    }

    const onClose = (e) => {
        console.log(e, 'I was closed.');
    };
     
    const validation = (rule, value, callback) => {
        if (checked) {
            return callback()
        }
        return callback("Please accept the terms and conditions")
    };
    
    const onCheckboxChange = async (e) => {
        await setChecked(e.target.checked);
        form.validateFields(['checkbox']);
    };

    return (
        <div className="home-wrapper">
            <div className="contact-page">
                <Row>
                    <Col>
                        <h1>Slava Reyzin kontaktieren</h1>
                        <Form form={form}
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: false }}
                        >
                            <Form.Item
                                name="anrede"
                                rules={[{ required: true, message: 'Please input Anrede!' }]}>
                                <Input placeholder="Anrede" value={contactUsData.salutation}
                                    onChange={e => setContactUs({ ...contactUsData, salutation: e.target.value })} />
                            </Form.Item>
                            <Form.Item
                                name="name"
                                rules={[{ required: true, message: 'Please input Vorname und Nachname!' }]}
                            >
                                <Input placeholder="Vorname und Nachname" value={contactUsData.username}
                                    onChange={e => setContactUs({ ...contactUsData, username: e.target.value })} />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Please input E-Mail!' }]}
                            >
                                <Input placeholder="E-Mail" value={contactUsData.email}
                                    onChange={e => setContactUs({ ...contactUsData, email: e.target.value })} />
                            </Form.Item>
                            <Form.Item
                                name="betreff"
                                rules={[{ required: true, message: 'Please input Betreff!' }]}
                            >
                                <Input placeholder="Betreff" value={contactUsData.subject}
                                    onChange={e => setContactUs({ ...contactUsData, subject: e.target.value })} />
                            </Form.Item>
                            <Form.Item
                                name="nachricht"
                                rules={[{ required: true, message: 'Please input Nachricht!' }]}
                            >
                                <TextArea rows={6} placeholder="Nachricht" value={contactUsData.message}
                                    onChange={e => setContactUs({ ...contactUsData, message: e.target.value })} />
                            </Form.Item>
                            <Form.Item name="remember" valuePropName="checked" rules={[{ required: true, message: "Please check", validator: validation }]} >
                                <Checkbox checked={checked} onChange={onCheckboxChange} >Mit dem Absenden des Kontaktformulars erkläre ich mich damit einverstanden, dass meine Daten zur Bearbeitung meines Anliegens verwendet werden (Weitere Informationen und Widerrufshinweise finden Sie in der <Link to='/datenschutz'>Datenschutzerklärung</Link>).</Checkbox>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" onClick={() => handleEdit()} htmlType="submit" className="login-form-button">
                                    Senden
                                </Button>
                                {loading === true ? <Spin></Spin> : ''}
                                {contactform === true ? (
                                    <>
                                       <br/>
                                        <Alert
                                            description="Kontaktformular erfolgreich übermittelt"
                                            type="success"
                                            closable
                                            onClose={onClose}
                                        />
                                    </>
                                ) : ""}
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default ContactPage;