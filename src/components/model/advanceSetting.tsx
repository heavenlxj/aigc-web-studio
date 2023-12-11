import React from 'react';
import { Collapse, Slider } from 'antd';

const { Panel } = Collapse;

const AdvancedSettings: React.FC = () => {
  // Implement advanced settings logic here
  return (
    <div>
        <Collapse defaultActiveKey={['2']} ghost>
        <Panel header="高级设置" key="2">
            <div>
            <label>步数:</label>
            <Slider />
            </div>
            {/* Add more advanced settings as needed */}
        </Panel>
        </Collapse>
    </div>
  );
};

export default AdvancedSettings;