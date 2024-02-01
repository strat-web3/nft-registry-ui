import React, { useState } from 'react'
import { Flex, useColorModeValue, Spacer, Heading, Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'
import { SITE_NAME } from 'utils/config'
import { LinkComponent } from './LinkComponent'
import { ThemeSwitcher } from './ThemeSwitcher'
import { PassportScore } from './PassportScore'
import { ChevronDownIcon } from '@chakra-ui/icons'

interface Props {
  className?: string
}

export function Header(props: Props) {
  const className = props.className ?? ''

  const [selectedPage, setSelectedPage] = useState('Créer un NFT')

  const switchToCreate = async () => {
    setSelectedPage('Créer un NFT')
  }

  const switchToRegister = async () => {
    setSelectedPage('Enregistrer un NFT')
  }

  const switchToUpdate = async () => {
    setSelectedPage("Actualiser le statut d'un NFT")
  }

  return (
    <Flex as="header" className={className} bg={useColorModeValue('gray.100', 'gray.900')} px={4} py={5} mb={8} alignItems="center">
      <LinkComponent href="/">
        <Heading as="h1" size="md">
          {SITE_NAME}
        </Heading>
      </LinkComponent>

      <Spacer />

      <Flex alignItems="center" gap={4}>
        {/* <PassportScore /> */}
        {/* <w3m-button /> */}
        <Menu>
          <MenuButton
            ml={3}
            as={Button}
            size={16}
            rightIcon={<ChevronDownIcon />}
            px={2}
            py={1}
            transition="all 0.5s"
            borderRadius="lg"
            borderWidth="0px"
            _hover={{ bg: 'purple.700' }}
            _expanded={{ bg: 'blue.400' }}
            _focus={{ boxShadow: 'outline' }}>
            {selectedPage}
          </MenuButton>
          <MenuList>
            <LinkComponent href="/create">
              <MenuItem onClick={switchToCreate}>Créer un NFT</MenuItem>
            </LinkComponent>
            <LinkComponent href="/register">
              <MenuItem onClick={switchToRegister}>Enregistrer un NFT</MenuItem>
            </LinkComponent>
            <LinkComponent href="/delegate">
              <MenuItem onClick={switchToUpdate}>Actualiser le statut d&apos;un NFT</MenuItem>
            </LinkComponent>
          </MenuList>
        </Menu>
        <ThemeSwitcher />
      </Flex>
    </Flex>
  )
}
