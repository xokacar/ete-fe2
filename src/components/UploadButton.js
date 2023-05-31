import { Button, Flex, useColorModeValue } from '@chakra-ui/react';
import { useRef } from 'react';

const UploadButton = ({ onClick }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = event => {
    onClick(event);
    fileInputRef.current.value = null; // Reset file input value to allow selecting the same file again
  };

  return (
    <>
      <Flex justifyContent="center" alignItems="center">
        <Button
          px={8}
          bg={useColorModeValue('teal.300', 'teal')}
          color={useColorModeValue('black', 'white')}
          rounded={'md'}
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
          variant="contained"
          onClick={handleButtonClick}
        >
          Upload Voice File 🎵
        </Button>
        <input
          type="file"
          accept="audio/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </Flex>
    </>
  );
};

export default UploadButton;
