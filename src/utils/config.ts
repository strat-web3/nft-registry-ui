import { ThemingProps } from '@chakra-ui/react'
import { Chain, sepolia } from '@wagmi/core'

export const SITE_NAME = 'NFT Registry'
export const SITE_DESCRIPTION = 'Find a registered NFT.' // Your description should be between 55 and 200 characters long, with a maximum of 300.
export const SITE_URL = 'nft-registry.netlify.app'

export const THEME_INITIAL_COLOR = 'system'
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'gray'
export const THEME_CONFIG = {
  initialColorMode: THEME_INITIAL_COLOR,
}

export const SOCIAL_TWITTER = 'julienbrg'
export const SOCIAL_GITHUB = 'strat-web3/nft-registry-ui'

export const ETH_CHAINS = [sepolia]

export const SERVER_SESSION_SETTINGS = {
  cookieName: SITE_NAME,
  password: process.env.SESSION_PASSWORD ?? 'UPDATE_TO_complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}
