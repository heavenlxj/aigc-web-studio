import React, { useState } from 'react';
import { Layout, theme, Row, Col, Collapse, Upload, Button, Image, message, Spin, Alert } from 'antd';
import AdvancedSettings from '../components/model/advanceSetting';
import ModelSelect from '../components/model/modelSelect';
import StyleSelect from '../components/model/styleSelect';
import type { UploadProps } from 'antd/es/upload/interface';
import '../styles/page/video.less';
import {  
    PlusOutlined, 
    LoadingOutlined, 
    PlaySquareOutlined
} from '@ant-design/icons';
import { generateVideo, getAssetUrl, getVideoStatus } from '../api/video.api';

const Image2VideoPage: React.FC = () => {

    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [generatedVideoId, setGeneratedVideoId] = useState<string | null>(null);
    const [videoStatus, setVideoStatus] = useState<string | null>(null);
    const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string>('');
    const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');

  
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
              setUploadedImage(info.file.originFileObj);
              //setUploadedImage(info.file.response.url);
          } else if (status === 'error') {
              message.error(`${info.file.name} file upload failed.`);
          }
          };
  

    const props: UploadProps = {
      name: 'file',
      multiple: false,
      action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
      showUploadList: false,
      onChange: handleImageUpload,
      onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
      },
      className: 'custom-upload-container', 
    };

    const handleTimeout = () => {
      // Handle the timeout, e.g., show an error message
      console.error('Video generation timeout exceeded');
      return <Alert message="Video generation timeout exceeded" type="error" showIcon />
    };

    const pollVideoStatus = async (videoId: string) => {
        let status: string | null = null;
    

        const timeoutDuration = 10 * 60 * 1000; // 10 minutes in milliseconds
        const intervalTime = 5000;
        let elapsedTime = 0;
        
        // Poll the video status every 5 seconds
        const intervalId = setInterval(async () => {

          elapsedTime += intervalTime;
          if (elapsedTime >= timeoutDuration) {
            // Stop the interval and handle the timeout
            clearInterval(intervalId);
            handleTimeout();
            return;
          }

          const videoData = await getVideoStatus(videoId);
          if (videoData !== null && typeof videoData === 'object') {
          status = videoData.status;
          const imageUrl = videoData.image_url;
          const videoUrl = videoData.url;
    
          if (status === 'Succeeded' || status === 'Failed') {
              // Update the video status and clear the interval
              setVideoStatus(status);
              setGeneratedVideoUrl(videoUrl);
              setGeneratedImageUrl(imageUrl);
              clearInterval(intervalId);
            }
          }
          }, intervalTime);
        };
  
  
    // Function to handle image generation
    const handleImageGeneration = async () => {
      // Perform API call for image generation and update the generated image URL
      // Example API call:
      // api.generateImage({ uploadedImage, model: selectedModel, style: selectedStyle, ... })
      setGeneratedVideoId('');
      setVideoStatus('loading');
  
      const formData = new FormData();
      formData.append('params', '{}');
      formData.append('user_id', 'make_me_rich');
      formData.append('file', uploadedImage as File);
  
      try {
        // Call the API to generate the video
        const taskId = await generateVideo(formData);
        setGeneratedVideoId(taskId);
  
        // Poll the video status
        pollVideoStatus(taskId);
      } catch (error) {
        setVideoStatus('failed');
      }
    };

    const renderVideoContent = () => {
        if (videoStatus === 'loading') {
          return <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />;
        } else if (videoStatus === 'failed') {
          return <p>Video generation failed. Please try again.</p>;
        } else if (videoStatus === 'Succeeded' && generatedVideoId) {
          // Get the complete video URL
          const outputVideo = getAssetUrl(generatedVideoUrl);
          const outputImage = getAssetUrl(generatedImageUrl);
          return (
            <Image
              width={800}
              preview={{
                imageRender: () => (
                  <video muted width="100%" controls src={outputVideo} />
                ),
                toolbarRender: () => null,
              }}
              src={outputImage}
            />
          );
        } else {
          return (
            <div>
                <PlaySquareOutlined />
                <div style={{ marginTop: 8 }}>Play</div>
            </div>
          )
        }
      };
  
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
  
  
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
              
              <Upload {...props} > 
                  {uploadedImage ? <img src={URL.createObjectURL(uploadedImage)} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : uploadButton}
              </Upload>
  
              <div className="custom-upload-container">
                {renderVideoContent()}
              </div>
  
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


export default Image2VideoPage;