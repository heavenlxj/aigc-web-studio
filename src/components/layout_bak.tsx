import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Input, Card, Slider, Collapse, Row, Col, Grid, theme } from 'antd';
import '../styles/layout/side.less';

const { Header, Sider, Content } = Layout;
const { Panel } = Collapse;
const { useBreakpoint } = Grid;

const LayoutComp2: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const screens = useBreakpoint();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Dummy data for style images
  const styleImages = Array.from({ length: 9 }).map((_, index) => ({
    id: index,
    imageUrl: `https://via.placeholder.com/150?text=Style${index + 1}`,
    description: `Style ${index + 1}`,
  }));

  return (
    <Layout className='aigc-layout'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Row gutter={16}>
            <Col span={18}>
              {/* Main Content */}
              Content
            </Col>
            <Col span={6}>
              {/* Right Sidebar */}
              <Collapse defaultActiveKey={['1']} ghost>
                <Panel header="Work Area" key="1">
                  {/* Form components for Work Area */}
                  <div>
                    <label>模型选择:</label>
                    <select>
                      <option value="model1">Model 1</option>
                      <option value="model2">Model 2</option>
                      <option value="model3">Model 3</option>
                    </select>
                  </div>
                  <div>
                    <label>风格选择:</label>
                    <Input prefix={<SearchOutlined />} placeholder="Search styles" />
                    {/* Vertical List with 9-grid layout */}
                    <div style={{ overflowY: 'auto', maxHeight: screens.md ? '400px' : 'unset' }}>
                      <Row gutter={16}>
                        {styleImages.map((item) => (
                          <Col key={item.id} span={8}>
                            <Card style={{ marginBottom: '10px' }}>
                              <img src={item.imageUrl} alt={item.description} style={{ width: '100%' }} />
                              <p>{item.description}</p>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </div>
                  <Collapse defaultActiveKey={['2']} ghost>
                    <Panel header="高级设置" key="2">
                      {/* Advanced settings */}
                      <div>
                        <label>步数:</label>
                        <Slider />
                      </div>
                      {/* Add more advanced settings as needed */}
                    </Panel>
                  </Collapse>
                </Panel>
              </Collapse>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComp2;