import React from 'react';

const ModelSelect: React.FC = () => {
  // Implement model selection logic here
  return (
    <div>
      <label>模型选择:</label>
      <select>
        <option value="model1">Model 1</option>
        <option value="model2">Model 2</option>
        <option value="model3">Model 3</option>
      </select>
    </div>
  );
};

export default ModelSelect;