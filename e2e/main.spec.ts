import { expect, test } from '@playwright/test'

test('homepage has correct title and successfully connects to wallet', async ({ page }) => {
  await page.goto(process.env.PLAYWRIGHT_URL)

  await expect(page).toHaveTitle(/Exactly Challenge/)

  const connectButton = await page.locator('button', { hasText: 'Mock' })
  await expect(connectButton).toHaveText('Mock')
  await expect(connectButton).toBeEnabled()

  await connectButton.click()

  await expect(page).toHaveURL(/.*dashboard/)
})
