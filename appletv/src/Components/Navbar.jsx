import React from 'react'
import { Box, Flex, HStack, IconButton, Button, useDisclosure, useColorModeValue, Stack, Image, useColorMode,InputGroup, Input, InputLeftElement, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody, ModalFooter, Spacer, extendTheme, ChakraProvider } from '@chakra-ui/react';
import {  CloseIcon, HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
import { Link, NavLink, } from 'react-router-dom';
import Weblogo from "../Img/mytv.jpg"
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { MdOutlineManageAccounts } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { LOG_OUT_FIREBASE } from '../Redux/Auth/action';
const modaltheme = extendTheme({
  components: {
    Modal: {
      baseStyle: (props) => ({
        dialog: {
          bg: "teal.600"
        }
      })
    }
  }
});
const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useDispatch();
  const HandleLogOut =()=>{
    dispatch(LOG_OUT_FIREBASE())
  }


  return (
    <>
      <div >
        <Box zIndex={"10"} position="sticky" bg={useColorModeValue('black', 'red.900')} px={4} as="header"  >
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'} px={[2, 3, 2]} >
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
            <HStack spacing={8} alignItems={'center'}>
              <Box><NavLink to="/"><Image overflow={"hidden"} h={10} pl={[50,null,null]} w={"auto"} src={Weblogo} alt='LOGO' /></NavLink></Box>
              {onOpen ? (
            <Box pb={9} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
               <Flex justify={"center"} align={"center"}> 
                <Link to="/signup"><Button leftIcon={<MdOutlineManageAccounts />} colorScheme='twitter' size='xs' variant='solid'>Sign in mob</Button></Link></Flex>
              </Stack>
            </Box>
          ) : null}
            </HStack>
            <Flex alignItems={'center'}>
              <HStack
                as={'nav'}
                spacing={2}
                display={{ base: 'none', md: 'flex' }}>

              <InputGroup >
              <InputLeftElement pointerEvents='none' children={<SearchIcon/>} />
              <Input color={"whiteAlpha.900"}  type='text' htmlSize={12} width="auto" placeholder='Search' />
              </InputGroup>
                <Link ><Button onClick={onOpen} leftIcon={<MdOutlineManageAccounts />} colorScheme='twitter' variant='solid'>Sign in</Button></Link>
                <Button  ><RiAdminLine color='black' size={50}/></Button>
                <Button onClick={toggleColorMode}>{colorMode === 'light' ? <MoonIcon /> : <SunIcon />} </Button>
              </HStack>
            </Flex>
            <>
    
  <ChakraProvider theme={modaltheme }>
    <Modal isOpen={isOpen} onClose={onClose} size={["xs","xl","xl"]}  >
      <ModalOverlay  bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)'/>
      <ModalContent>
        <ModalHeader mt={[5,10,20]} textAlign={"center"}>Choose your Dashboard panel</ModalHeader>
        <ModalCloseButton  color={"red.500"} />
        <ModalBody mb={[5,10,20]} >
        <ModalFooter justifyContent={"center"} gap={3} >
          <Link to={"/"}><Button colorScheme='green'  onClick={onClose} >
            User
          </Button></Link>
          <Link to={"/admin"}><Button colorScheme='twitter'  onClick={onClose}>
            Admin
          </Button></Link>
<Button onClick={HandleLogOut}>LOGOUT</Button>
        </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
    </ChakraProvider>
  </>
          </Flex>

          {isOpen ? (
            <Box pb={9} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
                <Flex pl={9} justify={"center"} align={"center"}> <Button onClick={toggleColorMode}>{colorMode === 'light' ? <MoonIcon /> : <SunIcon />} </Button></Flex>
      

              </Stack>
            </Box>
          ) : null}
        </Box>
      </div>


    </>
  )
}

export default Navbar