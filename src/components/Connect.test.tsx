import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'

import render from '../helpers/test-helpers/customRender'
import { addressRegex } from '../helpers/test-helpers/utils'
import Connect from './Connect'

/**
 * Types
 */

type UserEvent = ReturnType<typeof userEvent.setup>

/**
 * Tests
 */

describe('<Connect />', () => {
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
  })

  it('connects to wallet', async () => {
    render(<Connect />)

    const connectButton = screen.getByRole('button', { name: 'Mock' })
    await user.click(connectButton)
    await waitFor(() => screen.getByText(addressRegex))
    expect(screen.getByText(addressRegex)).toBeInTheDocument()
  })
})
