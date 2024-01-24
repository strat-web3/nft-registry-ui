import { Text, Button, useToast, FormControl, FormLabel, Input, FormHelperText } from '@chakra-ui/react'
import { Head } from 'components/layout/Head'
import { HeadingComponent } from 'components/layout/HeadingComponent'
import { LinkComponent } from 'components/layout/LinkComponent'
import { useState, useEffect } from 'react'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { ethers } from 'ethers'
import { REGISTRY_CONTRACT_ADDRESS, REGISTRY_CONTRACT_ABI } from '../utils/registry'
import { useEthersSigner, useEthersProvider } from '../hooks/ethersAdapter'

export default function Home() {
  const { chains, error, pendingChainId, switchNetwork } = useSwitchNetwork()
  const { isConnected } = useAccount()
  const { chain } = useNetwork()
  const provider = useEthersProvider()
  const signer = useEthersSigner()
  const toast = useToast()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [txLink, setTxLink] = useState<string>()
  const [txHash, setTxHash] = useState<string>()
  const [assets, setAssets] = useState<string>()
  const [selectedID, setSelectedID] = useState('23')

  useEffect(() => {
    const init = async () => {
      if (chain?.id !== 11155111) {
        switchNetwork?.(11155111)
      }
    }
    init()
    console.log('Contract address:', REGISTRY_CONTRACT_ADDRESS)
  }, [signer])

  const check = async () => {
    try {
      if (!signer) {
        toast({
          title: 'No wallet',
          description: 'Please connect your wallet first.',
          status: 'error',
          position: 'bottom',
          variant: 'subtle',
          duration: 9000,
          isClosable: true,
        })
        return
      }
      setIsLoading(true)
      setTxHash('')
      setTxLink('')
      const registry = new ethers.Contract(REGISTRY_CONTRACT_ADDRESS, REGISTRY_CONTRACT_ABI, signer)
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
      setAssets({
        0: 0,
        1: '0x0000000000000000000000000000000000000000',
        2: 0,
        3: '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        4: 'ipfs://00000000000000000000000000000000000000000000000000000000000/metadata.json',
        5: 0,
        6: false,
        7: false,
        8: 0,
        9: '0x0000000000000000000000000000000000000000',
        10: '0x0000000000000000000000000000000000000000',
        11: '0x0000000000000000000000000000000000000000',
        12: 'No info',
      })
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
            <Text pt={10} fontSize="14px" color="#45a2f8">
              {Number(assets[0])}
            </Text>
            <Text pt={2} fontSize="14px" color="#45a2f8">
              {String(assets?.[1])}
            </Text>
            <Text pt={2} fontSize="14px" color="#45a2f8">
              {Number(assets[2])}
            </Text>
            <Text pt={2} fontSize="14px" color="#45a2f8">
              {String(assets[3])}
            </Text>
            <Text pt={2} fontSize="14px" color="#45a2f8">
              {assets[4]}
            </Text>
            <Text pt={2} fontSize="14px" color="#45a2f8">
              {Number(assets[5])}
            </Text>
            <Text pt={2} fontSize="14px" color="#45a2f8">
              {Boolean(assets[6])}
            </Text>
            <Text pt={2} fontSize="14px" color="#45a2f8">
              {Boolean(assets[7])}
            </Text>
            <Text pt={2} fontSize="14px" color="#45a2f8">
              {Number(assets[8])}
            </Text>
            <Text pt={2} fontSize="14px" color="#45a2f8">
              {String(assets[9])}
            </Text>
            <Text pt={2} fontSize="14px" color="#45a2f8">
              {String(assets[10])}
            </Text>
            <Text pt={2} fontSize="14px" color="#45a2f8">
              {String(assets[11])}
            </Text>
            <Text pt={2} fontSize="14px" color="#45a2f8">
              {String(assets[12])}
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
