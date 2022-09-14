import { useNetwork } from 'wagmi'

import { DEFAULT_NETWORK_ID, IS_TEST } from '../constants'

const useIsValidNetwork = () => {
  const { chain } = useNetwork()

  if (IS_TEST) {
    return true
  }

  return chain?.id === DEFAULT_NETWORK_ID
}

export default useIsValidNetwork
