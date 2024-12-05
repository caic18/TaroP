import { http } from '@/utils/http'

//获取资源标签列表

export const getTagsList = () => {
  return http<Tag[]>({
    method: 'GET',
    url: '/tag/list',
  })
}

//资源分类
export const getCategoryList = () => {
  return http<CategoryType[]>({
    method: 'GET',
    url: '/category/list',
  })
}

//投稿表单数据
export const contributeResource = (data: ContributeForm) => {
  return http<null>({
    method: 'POST',
    url: '/resource/publish',
    data,
  })
}
