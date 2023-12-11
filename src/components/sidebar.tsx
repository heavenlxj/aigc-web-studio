// components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;

const AppSidebar: React.FC = () => {
  return (
    <Sider width={200} theme="dark" className='aigc-layout-container'>
      <Menu mode="vertical" theme="dark" style={{ height: '100%', borderRight: 0 }}>
        <Menu.Item key="1">
          <Link to="/">
            <div>首页</div>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/create-video">
            <div>生成视频</div>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/style-transfer">
            <div>风格转换</div>
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/swap-face">
            <div>换脸</div>
          </Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="/my-works">
            <div>我的作品</div>
          </Link>
        </Menu.Item>
        <Menu.Item key="6">
          <Link to="/pricing">
            <div>定价页面</div>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AppSidebar;
