import React, { useState } from 'react';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Row, Col, Collapse, theme } from 'antd';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import '../styles/layout/side.less';
import SwapFacePage from '../pages/swapFace';
import Image2VideoPage from '../pages/image2Video';
import Text2ImagePage from '../pages/text2Image';


const { Content, Sider } = Layout;


const LayoutComp: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);


  return (
    <Layout className='aigc-layout'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/swap-face">AI换脸</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <Link to="/image-to-video">图片转视频</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            <Link to="/text-to-image">文生成图</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Routes>
            <Route path="/swap-face" Component={SwapFacePage} />
            <Route path="/image-to-video" Component={Image2VideoPage} />
            <Route path="/text-to-image" Component={Text2ImagePage} />
        </Routes>
      </Layout>
    </Layout>
  );
};

export default LayoutComp;
