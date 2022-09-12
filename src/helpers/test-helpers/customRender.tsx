import { MockedProvider } from '@apollo/client/testing'
import { render, RenderOptions } from '@testing-library/react'
import * as React from 'react'
import { WagmiConfig, WagmiConfigProps } from 'wagmi'

import { setupClient } from './utils'

/**
 * Constants
 */

const defaultClient = setupClient()

/**
 * Types
 */

type ProvidersProps = {
  children: React.ReactNode
  client?: WagmiConfigProps['client']
}

/**
 * Render
 */

const ProviderWrapper = ({ children, client = defaultClient }: ProvidersProps) => {
  return (
    <MockedProvider mocks={[]}>
      <WagmiConfig client={client}>{children}</WagmiConfig>
    </MockedProvider>
  )
}

const customRender = (ui: React.ReactElement, options?: RenderOptions) => {
  return render(ui, {
    wrapper: ProviderWrapper,
    ...options,
  })
}

/**
 * Exports
 */

export default customRender
