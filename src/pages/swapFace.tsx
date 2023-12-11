import React, { useState } from 'react';
import { Layout, theme, Row, Col, Collapse, Upload, Button, Image, message, Space } from 'antd';
import AdvancedSettings from '../components/model/advanceSetting';
import ModelSelect from '../components/model/modelSelect';
import StyleSelect from '../components/model/styleSelect';
import type { UploadProps } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import {  
    PlusOutlined,  
    DownloadOutlined,
    RotateLeftOutlined,
    RotateRightOutlined,
    SwapOutlined,
    ZoomInOutlined,
    ZoomOutOutlined,
} from '@ant-design/icons';


const SwapFacePage: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string>('https://seopic.699pic.com/photo/40250/3648.jpg_wh1200.jpg');


  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { Content } = Layout;
  const { Panel } = Collapse;


    // Function to handle image upload
    const handleImageUpload = (info: any) => {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
            console.log(info.file.response.url)
            setUploadedImage('https://seopic.699pic.com/photo/40008/5974.jpg_wh1200.jpg');
            //setUploadedImage(info.file.response.url);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
        };

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    listType: "picture-card",
    showUploadList: false,
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    onChange: handleImageUpload,
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    }
  };


  // Function to handle image generation
  const handleImageGeneration = () => {
    // Perform API call for image generation and update the generated image URL
    // Example API call:
    // api.generateImage({ uploadedImage, model: selectedModel, style: selectedStyle, ... })
    const generatedImageUrl = 'https://seopic.699pic.com/photo/40250/3648.jpg_wh1200.jpg';
    setGeneratedImage(generatedImageUrl);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onDownload = () => {
    fetch(generatedImage)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.download = 'image.png';
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
  };

  return (
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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Left image display area */}
            <ImgCrop rotationSlider>
            <Upload {...props} > 
                {uploadedImage ? <img src={uploadedImage} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
            </ImgCrop>

            <Image
                width={800}
                src={generatedImage}
                preview={{
                    toolbarRender: (
                    _,
                    {
                        transform: { scale },
                        actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn },
                    },
                    ) => (
                    <Space size={12} className="toolbar-wrapper">
                        <DownloadOutlined onClick={onDownload} />
                        <SwapOutlined rotate={90} onClick={onFlipY} />
                        <SwapOutlined onClick={onFlipX} />
                        <RotateLeftOutlined onClick={onRotateLeft} />
                        <RotateRightOutlined onClick={onRotateRight} />
                        <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                        <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                    </Space>
                    ),
                }}
                />


            {/* Generate button */}
            <Button type="primary" onClick={handleImageGeneration}>
              Generate
            </Button>
          </div>
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
    </Content>
  );
};

export default SwapFacePage;
