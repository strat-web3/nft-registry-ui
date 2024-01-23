export const REGISTRY_CONTRACT_ADDRESS = '0x32a6e4cD44f38D15860E4c24d40a1004E9dCb436'
export const REGISTRY_CONTRACT_ABI = <const>[
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'network',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'contractAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Edited',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'network',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'contractAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Registered',
    type: 'event',
  },
  {
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_network',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_contractAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_mediaFileHash',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_tokenURI',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_AssetType',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: '_tangible',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: '_redeemable',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: '_Status',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_creator',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_registrar',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_info',
        type: 'string',
      },
    ],
    name: 'addEntry',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'assets',
    outputs: [
      {
        internalType: 'uint256',
        name: 'network',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'contractAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'mediaFileHash',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'tokenURI',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'AssetType',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'tangible',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'redeemable',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'Status',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'creator',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'registrar',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'info',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
]
