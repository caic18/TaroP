import { http } from '@/utils/http'
import exp from 'constants'

export const sendCode = (phone: string) => {
  return http<null>({
    method: 'POST',
    url: '/common/sendSms?phone=' + phone,
  })
}

export const phoneLogin = (phone: string, code: string) => {
  return http<LoginResult>({
    method: 'POST',
    url: `/auth/login?phone=${phone}&code=${code}`,
  })
}

export const myWxLogin = (code: string, encryptedData: string, iv: string) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/auth/weChatLogin',
    data: {
      code,
      encryptedData,
      iv,
    },
  })
}

export const logout = () => {
  return http<null>({
    method: 'POST',
    url: '/auth/logout',
  })
}

export const getUserInfo = () => {
  return http<UserInfo>({
    method: 'GET',
    url: '/user/info',
  })
}

export const updateUserInfo = (data: Partial<UserInfo>) => {
  return http({
    method: 'POST',
    url: '/user/update',
    data,
  })
}

export const userDailyCheck = () => {
  return http({
    method: 'POST',
    url: `/user/dailyCheck`,
  })
}

export const userResourceList = (data: { page: number; limit: number; type: number }) => {
  return http<{
    list: IndexResourceType[]
    total: number
  }>({
    method: 'POST',
    url: '/user/resource',
    data,
  })
}

export const updateUserPhone = (phone: string, code: string) => {
  return http({
    method: 'POST',
    url: `/auth/bindPhone?phone=${phone}&code=${code}`,
  })
}
