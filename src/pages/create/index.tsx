import {
  Heading,
  Button,
  Badge,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  ListItem,
  UnorderedList,
  Input,
  FormHelperText,
  Checkbox,
} from '@chakra-ui/react'
import { Head } from 'components/layout/Head'
import { HeadingComponent } from 'components/layout/HeadingComponent'
import { LinkComponent } from 'components/layout/LinkComponent'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { REGISTRY_CONTRACT_ADDRESS, REGISTRY_CONTRACT_ABI } from '../../utils/registry'
import { useEthersProvider } from '../../hooks/ethersAdapter'
import { useRouter } from 'next/router'

export default function Create() {
  const provider = useEthersProvider()
  const router = useRouter()

  const id = router.query.id

  const [txLink, setTxLink] = useState<string>()
  const [txHash, setTxHash] = useState<string>()
  const [assets, setAssets] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [result, setResult] = useState(null)

  const [network, setNetwork] = useState<number>(11155111)
  const [recipient, setRecipient] = useState<string>('0xd63ed6E274bedb34D9666B8f62ed32a73C43DD9e')
  const [name, setName] = useState<string>('My NFT')
  const [description, setDescription] = useState('This is a description.')
  const [creatorAddress, setCreatorAddress] = useState<string>('0xd63ed6E274bedb34D9666B8f62ed32a73C43DD9e')
  const [creatorName, setCreatorName] = useState<string>('Julien')
  const [imageUrl, setImageUrl] = useState<string>(
    'https://bafybeigpo5rtggp5nnzw4bcojdcaj6bvqgoe3zm42azlwnfvn5qyvwmpna.ipfs.w3s.link/Screenshot%202024-01-29%20at%2019.36.24.png'
  )
  const [resaleRights, setResaleRights] = useState<number>(400)
  const [symbol, setSymbol] = useState<string>('MYNFT')
  const [redeemable, setRedeemable] = useState<boolean>(false)
  const [tangible, setTangible] = useState<boolean>(false)
  const [assetType, setAssetType] = useState<number>(0)
  const [status, setStatus] = useState<number>(0)
  const [info, setInfo] = useState<string>('From UI!')

  useEffect(() => {
    const init = async () => {
      try {
        // console.log('id:', id)
        const registry = new ethers.Contract(REGISTRY_CONTRACT_ADDRESS, REGISTRY_CONTRACT_ABI, provider)
        const call = await registry.assets(id)
        // console.log('call:', call)
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
    console.log('Registry contract address:', REGISTRY_CONTRACT_ADDRESS)
  }, [id, tangible])

  const handleCreateNFT = async () => {
    setIsLoading(true)

    console.log('start request')
    const url = 'http://poc-nft-pg.public.rd.nic.fr:8080/nft/create'
    const apiKey = process.env.NEXT_PUBLIC_API_KEY ?? ''

    const data = {
      network: network,
      recipient: recipient,
      name: name,
      description: description,
      creatorName: creatorName,
      creatorAddress: creatorAddress,
      imageUrl: imageUrl,
      resaleRights: resaleRights,
      symbol: symbol,
      redeemable: redeemable,
      tangible: tangible,
      assetType: assetType,
      status: status,
      info: info,
    }

    console.log('data:', data)

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const resultData = await response.json()
      setResult(resultData)
      console.log('resultData:', resultData)
      setIsLoading(false)
    } catch (error) {
      console.error('Error:', error)
      setIsLoading(false)
    }
  }
  const handleAssetType = (e: any) => {
    const newValue = parseInt(e.target.value, 10)
    setAssetType(isNaN(newValue) ? 0 : newValue)
  }

  return (
    <>
      <Head />

      <main>
        <HeadingComponent as="h2">Créer et enregistrer un NFT</HeadingComponent>
        <br />
        <FormControl>
          <FormLabel>Nom</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={name} />
          <FormHelperText>Le nom du NFT.</FormHelperText>
          <br />
          <FormLabel>Description</FormLabel>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="" />
          <FormHelperText>Description du NFT</FormHelperText>
          <br />
          <FormLabel>URL du fichier de media associé</FormLabel>
          <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder={imageUrl} />
          <FormHelperText>Lien vers le fichier associé (jpeg, png, mp3, mp4, pdf, ...).</FormHelperText>
          <br />
          <FormLabel>Blockchain</FormLabel>
          <Input value={network} onChange={(e) => setNetwork(Number(e.target.value))} placeholder={'yo'} />
          <FormHelperText>Sur quelle blockchain souhaitez-vous créer le NFT?</FormHelperText>
          <br />

          <FormLabel>Nom de l&apos;auteur</FormLabel>
          <Input value={creatorName} onChange={(e) => setCreatorName(e.target.value)} placeholder={creatorName} />
          {/* <FormHelperText>Nom </FormHelperText> */}
          <br />
          <br />
          <FormLabel>Adresse Ethereum de l&apos;auteur</FormLabel>
          <Input value={creatorAddress} onChange={(e) => setCreatorAddress(e.target.value)} placeholder={creatorAddress} />
          <FormHelperText>Adresse du wallet de l&apos;auteur.</FormHelperText>
          <br />
          <FormLabel>Adresse de réception du NFT</FormLabel>
          <Input value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder={recipient} />
          <FormHelperText>Sur quel wallet doit-on envoyer le NFT?</FormHelperText>
          <br />

          <FormLabel>Droit de suite</FormLabel>
          <NumberInput
            defaultValue={resaleRights}
            keepWithinRange={false}
            clampValueOnBlur={false}
            value={resaleRights}
            onChange={(value) => setResaleRights(Number(value))}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormHelperText>Quel pourcentage doit être versé à l&apos;auteur au moment d&apos;une revente? (400 pour 4%)</FormHelperText>
          <br />
          {/* <FormLabel>Network</FormLabel>
          <Input value={network} onChange={(e) => setNetwork(Number(e.target.value))} placeholder={'yo'} />
          <FormHelperText>How should we refer to your proposal?</FormHelperText>
          <br /> */}
          <FormLabel>Symbol du NFT</FormLabel>
          <Input value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder={symbol} />
          <FormHelperText>Trois à six lettres pour désigner le NFT en tant qu&apos;objet unique.</FormHelperText>
          <br />
          <FormLabel>Type de NFT</FormLabel>
          <Input value={assetType} onChange={(e) => handleAssetType(e.target.value)} />
          <FormHelperText>Art numérique, objet physique, attestation, certificat, ...</FormHelperText>
          <br />
          <Checkbox colorScheme="blue" onChange={(e) => setRedeemable(e.target.checked)}>
            Redeemable
          </Checkbox>

          <br />
          <Checkbox colorScheme="green" onChange={(e) => setTangible(e.target.checked)}>
            Tangible
          </Checkbox>
          <br />
          <br />
          <FormLabel>Statut</FormLabel>

          <NumberInput
            defaultValue={status}
            keepWithinRange={false}
            clampValueOnBlur={false}
            value={status}
            onChange={(value) => setStatus(Number(value))}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormHelperText>Le statut est &quot;actif&quot; par défaut à la création du NFT.</FormHelperText>
          <br />
          <FormLabel>Info</FormLabel>
          <Input value={info} onChange={(e) => setInfo(e.target.value)} placeholder={info} />
          <FormHelperText>Information concernant l&apos;enregistrement.</FormHelperText>
          {/*
          // recipient: '0xd63ed6E274bedb34D9666B8f62ed32a73C43DD9e',
          // name: 'My NFT',
          // description: 'This is description.',
          // creatorName: 'Julien',
          // creatorAddress: '0xd63ed6E274bedb34D9666B8f62ed32a73CNOGOOD',
          // imageUrl: 'https://bafybeiakz6ddls5hrcgrcpse3ofuqxx3octuedtapyxnstktyoadtwjjqi.ipfs.w3s.link/',
          // resaleRights: 400,
          // symbol: 'MYNFT',
          // redeemable: false,
          // tangible: false,
          // assetType: 0,
          // status: 0,
          // info: 'Yo.', */}
          <br />
        </FormControl>
        <Button
          mt={2}
          mb={10}
          colorScheme="blue"
          variant="outline"
          type="submit"
          onClick={handleCreateNFT}
          isLoading={isLoading}
          loadingText="Création en cours..."
          spinnerPlacement="end">
          Créer
        </Button>

        {result && (
          <div>
            <h3>Result:</h3>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </main>
    </>
  )
}
