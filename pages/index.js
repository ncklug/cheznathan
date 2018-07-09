import React from 'react'

import { Border, Box, Card as BaseCard, Flex, Heading } from 'rebass/emotion'
import { border, borderColor, borderRadius, width } from 'styled-system'
import { ThemeProvider } from 'emotion-theming'
import styled from 'react-emotion'

import theme from '../theme'

const Card = styled(
  ({ border, borderColor, width, ...props }) =>
    <BaseCard {...props} />)(border, borderColor, width)

export default () => {
  return (
    <ThemeProvider theme={theme}>
    <Flex justifyContent='center'>
        <Card bg='gray.4' border={1} borderColor='gray.3' borderRadius={1} width={[1, 3/4]}>
          <Heading>Chez Nathan</Heading>
        </Card>
    </Flex>
    </ThemeProvider>
  )
}
