import { http } from '@/utils/http'

export const userBonusInfo = (data: PageParams) => {
  return http<UserScoreReturn>({
    method: 'POST',
    url: `/user/bonus/page`,
    data,
  })
}

export const userResourceList = (data: PageParams) => {
  return http<UserResourceReturn>({
    method: 'POST',
    url: `/user/resource`,
    data,
  })
}
