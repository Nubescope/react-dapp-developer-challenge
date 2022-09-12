import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Stack, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'

import AddressButton from './AddressButton'

const Nav: React.FC<{ hideConnectButton?: boolean }> = ({ hideConnectButton = false }) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Box px={4} bg={useColorModeValue('gray.100', 'gray.900')} role="navigation">
        <Flex align="center" justify="space-between" h={16}>
          <Box fontSize={['sm', 'md', '2xl']}>
            <Text as="span" fontWeight="bold">
              Exactly
            </Text>
            Challenge
          </Box>

          <Flex align="center">
            <Stack direction="row" spacing={3}>
              {!hideConnectButton && <AddressButton />}
              <Button onClick={toggleColorMode}>{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}</Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default Nav
