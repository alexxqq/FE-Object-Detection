import React, { useState, ChangeEvent, FormEvent } from 'react';
import  DetectionService  from '../services/imageService'; 
import ImageUploader from '../components/ImageUploader';
import ProcessedImage from '../components/ProcessedImage';
import DetectionList from '../components/DetectionList';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Loader from '../components/Loader';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #191e29;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 20px;
`;

const DetectionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 20px 0;
`;


interface DetectedObject {
  name: string;
  confidence: number;
}

const Page: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [detections, setDetections] = useState<DetectedObject[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [processedImage, setProcessedImage] = useState<string | null>(null);
  
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        setImage(files[0]);
      }
    };
  
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!image) return;
  
      const formData = new FormData();
      formData.append('file', image); 
  
      setLoading(true);
      try {
        const detectedObjects = await DetectionService.detectObjectsToJson(formData);
        setDetections(detectedObjects);
  
        const imgBlob = await DetectionService.detectObjectsToImg(formData);
        const imageUrl = URL.createObjectURL(imgBlob);
        setProcessedImage(imageUrl);
  
      } catch (error: any) {
        if (error.response && error.response.status === 413) {
          toast.error('The uploaded file is too large. Please upload a smaller file.');
        } else {
          console.error('Error during detection:', error);
          toast.error('An error occurred during detection. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Container>
        <Navbar />
        <Title>Object Detection</Title>
        <ImageUploader onImageChange={handleImageChange} onSubmit={handleSubmit} loading={loading} />
        {loading && <Loader/>}
        {processedImage && <ProcessedImage imageUrl={processedImage} />}
        {detections.length > 0 && (
          <DetectionSection>
            <DetectionList detections={detections} />
          </DetectionSection>
        )}
      </Container>
    );
};
  
export default Page;
