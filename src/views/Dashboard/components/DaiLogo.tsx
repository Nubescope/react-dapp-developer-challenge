import { CheckCircleIcon } from '@chakra-ui/icons'
import { Avatar, Box, Tooltip } from '@chakra-ui/react'
import React from 'react'

/**
 * DaiLogo
 */

const DaiLogo: React.FC<{ isApproved: boolean }> = ({ isApproved }) => {
  return (
    <Box pos="relative">
      <Avatar name="DAI logo" src="/dai.svg" />
      {isApproved && (
        <Tooltip label="Market enabled">
          <CheckCircleIcon fontSize="md" color="green.500" pos="absolute" bottom={0} right={-2} />
        </Tooltip>
      )}
    </Box>
  )
}

/**
 * Exports
 */

export default DaiLogo
