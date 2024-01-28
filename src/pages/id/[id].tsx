import { Text } from '@chakra-ui/react'
import { Head } from 'components/layout/Head'
import { HeadingComponent } from 'components/layout/HeadingComponent'
import { LinkComponent } from 'components/layout/LinkComponent'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { REGISTRY_CONTRACT_ADDRESS, REGISTRY_CONTRACT_ABI } from '../../utils/registry'
import { useEthersProvider } from '../../hooks/ethersAdapter'
import { useRouter } from 'next/router'

export default function Id() {
  const provider = useEthersProvider()
  const router = useRouter()

  const id = router.query.id

  // const [isLoading, setIsLoading] = useState<boolean>(false)
  const [txLink, setTxLink] = useState<string>()
  const [txHash, setTxHash] = useState<string>()
  const [assets, setAssets] = useState<any>()

  const defaultURL = './' + id

  useEffect(() => {
    const init = async () => {
      try {
        console.log('id:', id)
        const registry = new ethers.Contract(REGISTRY_CONTRACT_ADDRESS, REGISTRY_CONTRACT_ABI, provider)
        const call = await registry.assets(id)
        console.log('call:', call)
        setAssets(call)
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
      }
    }
    init()

    console.log('Contract address:', REGISTRY_CONTRACT_ADDRESS)
  }, [id])

  return (
    <>
      <Head />

      <main>
        <HeadingComponent as="h4">ID #{id}</HeadingComponent>

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
