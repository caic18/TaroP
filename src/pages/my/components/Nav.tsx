import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useAppSelector } from '@/store'
import './nav.scss'

const Navbar = () => {
  const userInfo = useAppSelector(state => state.user.userInfo)
  const safeAreaInsets = Taro.getSystemInfoSync().safeArea
  const handleClick = () => {
    if (userInfo.pkId > 0) {
      Taro.navigateTo({
        url: '/pageUser/userInfo/userInfo',
      })
    }
    return
  }
  return (
    <View
      className="navbar"
      style={{
        paddingTop: safeAreaInsets!.top + 10 + 'px',
      }}
    >
      <View className="text" onClick={handleClick}>
        <Text className="logo-text">个人中心</Text>
      </View>
    </View>
  )
}
export default Navbar
