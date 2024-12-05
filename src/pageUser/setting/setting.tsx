import { useAppSelector, useAppDispatch } from '@/store'
import { clearUserInfo } from '@/store/modules/user'
import { Button, View } from '@tarojs/components'
import { logout } from '@/service/user'
import Taro from '@tarojs/taro'
import './setting.scss'

export default function Setting() {
  const userInfo = useAppSelector(state => state.user.userInfo)
  const dispatch = useAppDispatch()
  const handleOpen = () => {}

  const handleQuitClick = () => {
    Taro.showModal({
      title: '你确定要退出吗?',
      success: async res => {
        if (res.confirm) {
          const resData = await logout()
          if (resData.code === 0) {
            dispatch(clearUserInfo({}))
            Taro.removeStorageSync('token')
            Taro.showToast({
              title: '退出登录成功',
            })
            Taro.reLaunch({
              url: '/pages/login/index',
            })
          }
        }
      },
    })
  }
  return (
    <>
      <View className="setting">
        {userInfo && (
          <View className="list">
            <Button
              className="item arrow"
              onClick={() => Taro.navigateTo({ url: '/pageUser/userInfo/userInfo' })}
            >
              个人资料
            </Button>
            <Button className="item arrow" onClick={handleOpen}>
              绑定手机号
            </Button>
          </View>
        )}

        <View className="list">
          <Button className="item arrow" openType="openSetting">
            隐私管理
          </Button>
          <Button className="item arrow" openType="contact">
            联系我们
          </Button>
          <Button className="item arrow" openType="feedback">
            问题反馈
          </Button>
        </View>

        <View className="list">
          <Button className="item arrow">关于我们</Button>
        </View>
        {userInfo.pkId > 0 && (
          <View className="action">
            <Button className="button" onClick={handleQuitClick}>
              退出登录
            </Button>
          </View>
        )}
      </View>
    </>
  )
}
