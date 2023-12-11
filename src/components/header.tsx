// components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, ShareAltOutlined, UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  return (
    <Header className="header">
      <div className="logo">
        <Link to="/">
          <HomeOutlined />
          DreamStudio
        </Link>
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} className="menu">
        <Menu.Item key="1" icon={<ShareAltOutlined />}>
          <Link to="/share">分享</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link to="/login">登录</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default AppHeader;
