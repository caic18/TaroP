import { createSlice } from '@reduxjs/toolkit'
import Taro from '@tarojs/taro'

//定义用户类型
type UserInfo = {
  avatar: string
  birthday: string
  bonus: number
  gender: number
  nickname: string
  pkId: number
  phone: string
  isDailyCheck: boolean
  wxOpenId?: string
}

//初始化用户值
const userInfo: UserInfo = {
  avatar: '',
  birthday: '',
  bonus: 0,
  gender: 0,
  nickname: '',
  pkId: 0,
  phone: '',
  isDailyCheck: false,
  wxOpenId: '',
}

export const userSlice = createSlice({
  // name相当于命名空间
  name: 'user',
  // 初始值
  initialState: {
    // 赋值的时候先读取本地缓存 如果没有再赋初始值
    userInfo: Taro.getStorageSync('userInfo') || userInfo,
  },
  reducers: {
    // 保存登录用户信息
    setUserInfo: (state, action) => {
      // 下面新加这行代码
      Taro.setStorageSync('userInfo', action.payload)
    },
    // 清除登录用户信息
    clearUserInfo: (state, _) => {
      // 下面新加这行代码
      Taro.removeStorageSync('userInfo')
    },
  },
})

export const { setUserInfo, clearUserInfo } = userSlice.actions

export default userSlice.reducer
