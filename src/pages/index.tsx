import { Text, Button, useToast, FormControl, FormLabel, Input, FormHelperText } from '@chakra-ui/react'
import { Head } from 'components/layout/Head'
import { HeadingComponent } from 'components/layout/HeadingComponent'
import { LinkComponent } from 'components/layout/LinkComponent'
import { useState, useEffect } from 'react'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { ethers } from 'ethers'
import { REGISTRY_CONTRACT_ADDRESS, REGISTRY_CONTRACT_ABI } from '../utils/registry'
import { useEthersSigner, useEthersProvider } from '../hooks/ethersAdapter'
import { useRouter } from 'next/router'

export default function Home() {
  const { chains, error, pendingChainId, switchNetwork } = useSwitchNetwork()
  const { isConnected } = useAccount()
  const { chain } = useNetwork()
  const provider = useEthersProvider()
  const signer = useEthersSigner()
  const toast = useToast()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [txLink, setTxLink] = useState<string>()
  const [txHash, setTxHash] = useState<string>()
  const [assets, setAssets] = useState<any>()
  const [selectedID, setSelectedID] = useState('23')

  const defaultURL = './' + selectedID

  useEffect(() => {
    const init = async () => {
      if (chain?.id !== 11155111) {
        switchNetwork?.(11155111)
      }
    }
    init()
    console.log('Contract address:', REGISTRY_CONTRACT_ADDRESS)
  }, [provider])

  const check = async () => {
    try {
      setIsLoading(true)
      setTxHash('')
      setTxLink('')
      const registry = new ethers.Contract(REGISTRY_CONTRACT_ADDRESS, REGISTRY_CONTRACT_ABI, provider)
      const call = await registry.assets(selectedID)
      setAssets(call)
      setIsLoading(false)
      toast({
        title: 'Success',
        description: 'Thank you for using the NFT Registry!',
        status: 'success',
        position: 'bottom',
        variant: 'subtle',
        duration: 20000,
        isClosable: true,
      })
    } catch (e) {
      setAssets([
        0,
        '0x0000000000000000000000000000000000000000',
        0,
        '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        'ipfs://00000000000000000000000000000000000000000000000000000000000/metadata.json',
        0,
        false,
        false,
        0,
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
        'No info',
      ])
      setIsLoading(false)
      console.log('error:', e)
      toast({
        title: 'Woops',
        description: 'This ID is not in the Registry',
        status: 'error',
        position: 'bottom',
        variant: 'subtle',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Head />

      <main>
        <HeadingComponent as="h4">Registered NFT search engine</HeadingComponent>
        <FormControl pt={10}>
          <FormLabel>Entry ID</FormLabel>
          <Input value={selectedID} onChange={(e) => setSelectedID(e.target.value)} placeholder="1" />
          <FormHelperText>Select the ID of the entry your searching for.</FormHelperText>
          <br />
        </FormControl>

        <Button
          mt={2}
          mb={10}
          colorScheme="blue"
          variant="outline"
          type="submit"
          onClick={check}
          isLoading={isLoading}
          loadingText="Searching..."
          spinnerPlacement="end">
          Search
        </Button>

        {assets ? (
          <>
            <Text fontSize="14px" color="#FFFFFF">
              Network: <LinkComponent href={defaultURL}>{Number(assets[0])}</LinkComponent>
            </Text>
            <Text fontSize="14px" color="#FFFFFF">
              Contract address: <LinkComponent href={defaultURL}>{String(assets?.[1])}</LinkComponent>
            </Text>
            <Text fontSize="14px" color="#FFFFFF">
              TokenId: <LinkComponent href={defaultURL}>{Number(assets[2])}</LinkComponent>
            </Text>
            <Text fontSize="14px" color="#FFFFFF">
              Media file hash: <LinkComponent href={defaultURL}>{assets[3]}</LinkComponent>
            </Text>
            <Text fontSize="14px" color="#FFFFFF">
              Metadata URI: <LinkComponent href={defaultURL}>{assets[4]}</LinkComponent>
            </Text>
            <Text fontSize="14px" color="#FFFFFF">
              Asset type: <LinkComponent href={defaultURL}>{Number(assets[5])}</LinkComponent>
            </Text>
            <Text fontSize="14px" color="#FFFFFF">
              Tangible: <LinkComponent href={defaultURL}>{Boolean(assets[6]) === true ? 'true' : 'false'}</LinkComponent>
            </Text>
            <Text fontSize="14px" color="#FFFFFF">
              Redeemable: <LinkComponent href={defaultURL}>{Boolean(assets[7]) === true ? 'true' : 'false'}</LinkComponent>
            </Text>
            <Text fontSize="14px" color="#FFFFFF">
              Status: <LinkComponent href={defaultURL}>{Number(assets[8])}</LinkComponent>
            </Text>
            <Text fontSize="14px" color="#FFFFFF">
              Creator address: <LinkComponent href={defaultURL}>{String(assets[9])}</LinkComponent>
            </Text>
            <Text fontSize="14px" color="#FFFFFF">
              Registrar address: <LinkComponent href={defaultURL}>{String(assets[10])}</LinkComponent>
            </Text>
            <Text fontSize="14px" color="#FFFFFF">
              Owner address: <LinkComponent href={defaultURL}>{String(assets[11])}</LinkComponent>
            </Text>
            <Text fontSize="14px" color="#FFFFFF">
              Info: <LinkComponent href={defaultURL}>{String(assets[12])}</LinkComponent>
            </Text>
          </>
        ) : (
          ''
        )}
        {txHash && (
          <Text py={4} fontSize="14px" color="#45a2f8">
            <LinkComponent href={txLink ? txLink : ''}>{txHash}</LinkComponent>
          </Text>
        )}
      </main>
    </>
  )
}
