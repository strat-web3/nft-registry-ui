import { Text, Button, useToast, FormControl, FormLabel, Input, FormHelperText, Badge } from '@chakra-ui/react'
import { Head } from 'components/layout/Head'
import { HeadingComponent } from 'components/layout/HeadingComponent'
import { LinkComponent } from 'components/layout/LinkComponent'
import { useState, useEffect } from 'react'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { ethers } from 'ethers'
import { REGISTRY_CONTRACT_ADDRESS, REGISTRY_CONTRACT_ABI } from '../utils/registry'
import { useEthersSigner, useEthersProvider } from '../hooks/ethersAdapter'
import { useRouter } from 'next/router'
import Image from 'next/image'

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
  const [madeRequest, setMadeRequest] = useState(false)
  const [result, setResult] = useState<
    {
      id: string
      network: number
      contractAddress: string
      tokenId: number
      sourceFileHash: string
      resaleRights: number
      creatorName: string
      creatorAddress: string
      status: number
      assetType: number
      redeemable: boolean
      tangible: boolean
      info: string
      metadata: string
    }[]
  >([])
  const [selectedString, setSelectedString] = useState('Vinci')

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

  const search = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`http://localhost:3000/nft/${selectedString}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      console.log('data:', data)
      setResult(data)
      setIsLoading(false)
      setMadeRequest(true)
    } catch (error) {
      console.error('Error fetching data:', error)
      setIsLoading(false)
    }
  }

  function Item(props: any) {
    return (
      <>
        <div className="">
          <div>
            <strong>
              <LinkComponent href={'https://sepolia.etherscan.io/'}>{props.contractAddress}</LinkComponent>
            </strong>{' '}
          </div>
        </div>
      </>
    )
  }

  function List() {
    return (
      <div>{result ? result.map((p) => <Item key={p.id} network={p.network} contractAddress={p.contractAddress} tokenId={p.tokenId} />) : ''}</div>
    )
  }

  return (
    <>
      <Head />

      <main>
        <HeadingComponent as="h4">Registered NFT search engine</HeadingComponent>

        <FormControl pt={5}>
          <FormLabel>Search by name, contract address or artwork source file hash</FormLabel>
          <Input value={selectedString} onChange={(e) => setSelectedString(e.target.value)} placeholder="One" />
          <FormHelperText>Search for key words.</FormHelperText>
          <br />
        </FormControl>

        <Button
          mt={2}
          mb={10}
          colorScheme="blue"
          variant="outline"
          type="submit"
          onClick={search}
          isLoading={isLoading}
          loadingText="Searching..."
          spinnerPlacement="end">
          Search
        </Button>
        <br />
        {madeRequest ? (
          <>
            <HeadingComponent as="h4">Results</HeadingComponent>
            <List />
          </>
        ) : (
          ''
        )}
      </main>
    </>
  )
}
