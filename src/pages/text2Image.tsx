import React from 'react';
import { Layout, theme, Row, Col, Collapse } from 'antd';
import  AdvancedSettings from '../components/model/advanceSetting';
import  ModelSelect  from '../components/model/modelSelect';
import  StyleSelect  from '../components/model/styleSelect';

const Text2ImagePage: React.FC = () => {

   const { Content } = Layout;
   const { Panel } = Collapse;


   const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Content
    style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
      }}>
        <Row gutter={16}>
            <Col span={18}>
                {/* Main Content */}
                Content
            </Col>
            <Col span={6}>
                <Collapse defaultActiveKey={['1']} ghost>
                    <Panel header="Work Area" key="1">
                    <div>
                        <ModelSelect />
                        <StyleSelect />
                        <AdvancedSettings />
                    </div>
                    </Panel>
                </Collapse>
            </Col>
        </Row>
      {/* Left image upload area */}
      {/* Right blank image display area */}
      {/* Generate button */}
    </Content>
  );
};

export default Text2ImagePage;