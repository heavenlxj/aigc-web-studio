import React from 'react';
import {  Input, Card,  Row, Col, Grid } from 'antd';
import {
    SearchOutlined,
  } from '@ant-design/icons';

const { Search } = Input;

const StyleSelect: React.FC = () => {
  // Implement style selection logic here
    // Dummy data for style images
    const styleImages = Array.from({ length: 9 }).map((_, index) => ({
        id: index,
        imageUrl: `https://via.placeholder.com/150?text=Style${index + 1}`,
        description: `Style ${index + 1}`,
      }));

      const { useBreakpoint } = Grid;
      const screens = useBreakpoint();


  return (
    <div>
      <label>风格选择:</label>
      <Search prefix={<SearchOutlined />} placeholder="Search styles" />
      {/* Vertical List with 9-grid layout */}
      {/* Use Ant Design List/Grid components here */}
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
  );
};

export default StyleSelect;