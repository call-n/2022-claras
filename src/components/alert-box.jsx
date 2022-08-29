import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'

import React from 'react'

const AlertBox = (status, message) => {
  return (
    <Alert status={status}>
        <AlertIcon />
        <AlertTitle>{status}!</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}

export default AlertBox