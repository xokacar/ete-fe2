// Chakra UI
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Stack,
  Button,
  Input,
  Text,
} from '@chakra-ui/react';

//React
import { useState } from 'react';

//Components
import UploadButton from './UploadButton';
import RunButton from './RunButton';

export default function EteContainer() {
  //useState
  const [emotion, setEmotion] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploadClicked, setIsUploadClicked] = useState(false);

  const handleFileChange = event => {
    setSelectedFile(event.target.files[0]);
    setError(null);
  };

  //handle Functions

  const handleClick = () => {
    console.log('im working laaa');
  };
  const handleUpload = async () => {
    console.log('handleupload worked');
    if (!selectedFile) {
      return;
    }

    setIsUploadClicked(true);
    setError(null);
    setMessage('Uploading file...');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          `Server responded with ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();
      setEmotion(data.emotion);

      setSelectedFile(null);
      setIsUploaded(true);
      setMessage('File uploaded successfully.');

      const videoIds = {
        neutral: '',
        calm: '7gphiFVVtUI',
        happy: 'ZbZSe6N_BXs',
        sad: 'wtOHNhG0EZc',
        angry: 'Oqz2QNV58fw',
        fearful: 'EKLWC93nvAU',
        disgust: 'UfcAVejslrU',
        surprised: '2lCxeWvnMZY',
      };

      const videoId = videoIds[data.emotion];
      setMessage(`Redirecting you to a ${data.emotion} music video...`);

      setTimeout(() => {
        window.location.href = `https://www.youtube.com/watch?v=${videoId}`;
      }, 3000);
    } catch (error) {
      console.error(error);
      setError('Server error');
      setSelectedFile(null);
      setIsUploaded(false); // Added line
      setMessage(null); // Added line
    }
  };

  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        minW={'80.33vw'}
        minH={'33.33vw'}
        w={'full'}
        bg={useColorModeValue('whiteAlpha.900', 'blackAlpha.300')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
      >
        <Heading fontSize={'3xl'} fontFamily={'body'} fontWeight={500}>
          Embrace the Emotions
        </Heading>
        <Input
          id="file-input"
          display="none"
          type="file"
          onChange={handleFileChange}
        />
        <Stack direction={'column'} pt={10} spacing={8} align={'center'}>
          <Button
            px={8}
            minW={'15vw'}
            bg={useColorModeValue('teal.300', 'teal')}
            color={useColorModeValue('black', 'white')}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
            variant="contained"
            as="label"
            htmlFor="file-input"
            onClick={handleUpload}
          >
            Upload Voice File 🎵
          </Button>

          <Button
            px={8}
            maxW={'15vw'}
            bg={useColorModeValue('teal.300', 'teal')}
            color={useColorModeValue('black', 'white')}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
            variant="contained"
            as="label"
            onClick={handleUpload}
          >
            Run 🚀
          </Button>
          {selectedFile && (
            <Text>Your file is uploaded: {selectedFile.name}</Text>
          )}

          {error && <Text>{error}</Text>}
          {emotion && (
            <div
              style={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Heading fontSize={'3xl'} fontFamily={'body'} fontWeight={500} >Predicted emotion </Heading>
              <Heading
              color={'red'}

              fontSize={'3xl'} fontFamily={'body'} fontWeight={500}
              >{emotion}</Heading>
            </div>
          )}
          {message && <Text>{message}</Text>}
        </Stack>
      </Box>
    </Center>
  );
}
