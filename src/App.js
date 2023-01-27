import React, { useState } from "react";
import SvgSprite from "./utils/SvgSpriteLoader";
import { Routes, Route, Link, HashRouter } from "react-router-dom";
import { Layout } from "antd";
import SideBar from "./components/layout/SideBar";
import MediaQuery from 'react-responsive';
import { CloseCircleOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { privateRoutes, publicRoutes } from "./routes";
import { useNavigate } from "react-router-dom";
import Footer from "./components/layout/Footer";
import 'antd/dist/reset.css';
import './App.scss';
import ReactGA from "react-ga4";
//Svg Sprite
import svgFile from "./assets/images/svg/svg-sprite.svg";
const { Content, Sider } = Layout;


ReactGA.initialize("G-49SWKYYJRH");

const App = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);
  const onMenuClick = () =>{
    setCollapsed(true);
  }
  return (
    <>
      <SvgSprite url={svgFile} />
      <Layout className="main-wrapper">
        <Routes basename={process.env.REACT_APP_BASENAME || ""}>
          {publicRoutes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                element={
                  <route.component navigate={navigate} />
                }
              />
            );
          })}
          {privateRoutes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                element={
                  <>
                    <Layout className="main-wrapper-inner">
                      <MediaQuery maxWidth={991}>
                        <div className="mobile-header">
                          <div className="logo">
                            <Link to='/'>
                              SLAVA
                              REYZIN
                            </Link>
                          </div>
                          <div className="menu-icon">
                            {React.createElement(collapsed ? MenuUnfoldOutlined : CloseCircleOutlined, {
                              className: 'menu-trigger',
                              onClick: () => setCollapsed(!collapsed),
                            })}
                          </div>
                        </div>
                      </MediaQuery>
                      <MediaQuery maxWidth={991}>
                        <Sider
                          breakpoint="xl"
                          width={180}
                          collapsedWidth="0"
                          collapsed={collapsed}
                          trigger={null}
                          onClick={onMenuClick}
                        >
                          <SideBar navigate={navigate} />
                        </Sider>
                      </MediaQuery>
                      <MediaQuery minWidth={992}>
                        <Sider
                          width={180}
                          collapsedWidth="0"
                        >
                          <SideBar navigate={navigate} />
                        </Sider>
                      </MediaQuery>
                      <Layout>
                        <Content>
                          <route.component navigate={navigate} />
                        </Content>
                      </Layout>
                    </Layout>
                    <Footer />
                  </>
                }
              />
            );
          })}
        </Routes>
      </Layout>
    </>
  );
};

export default App;