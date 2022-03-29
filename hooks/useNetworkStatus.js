import {useNetInfo} from '@react-native-community/netinfo'

const useNetworkStatus = () => {
const netInfo=useNetInfo()

return netInfo.isInternetReachable
}

export default useNetworkStatus
