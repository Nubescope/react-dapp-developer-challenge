const ensureEnv = (key: string) => {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Missing key: ${key}`)
  }

  return value
}

export default ensureEnv
