import { http } from '@/utils/http'

export type IndexResourceReturnType = {
  list: IndexResourceType[]
  total: number
}

export const getIndexResourceList = (data: PageParams) => {
  return http<IndexResourceReturnType>({
    method: 'POST',
    url: '/resource/page',
    data,
  })
}

export const getResourceById = id => {
  return http<IndexResourceType>({
    method: 'GET',
    url: '/resource/detail/' + id,
  })
}

export const userExchangeResource = (id: number) => {
  return http({
    method: 'POST',
    url: '/user/resource/exchange?resourceId=' + id,
  })
}

export const userLikeResource = (id: number) => {
  return http({
    method: 'POST',
    url: '/user/resource/like?resourceId=' + id,
  })
}

export const userCollectResource = (id: number) => {
  return http({
    method: 'POST',
    url: '/user/resource/collect?resourceId=' + id,
  })
}
