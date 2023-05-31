import { Button, Flex, useColorModeValue } from '@chakra-ui/react';
export default function RunButton() {
  return (
    <Flex justifyContent="center" alignItems="center">
      <Button
        px={8}
        bg={useColorModeValue('teal.300', 'teal')}
        color={'white'}
        rounded={'md'}
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        }}
      >
        Run 🚀
      </Button>
    </Flex>
  );
}
