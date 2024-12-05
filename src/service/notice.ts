import { http } from '@/utils/http'
import { SwiperItem } from '@tarojs/components'

//首页轮播图
export const getNoticeSwiper = () => {
  return http<SwiperItem[]>({
    method: 'GET',
    url: '/notice/swiper',
  })
}

//获取首页公告
export const getIndexNotice = () => {
  return http<SwiperItem[]>({
    method: 'GET',
    url: '/notice/index',
  })
}

//消息列表分页
export const getNoticePage = (data: PageParams) => {
  return http<IndexNotice>({
    method: 'POST',
    url: '/notice/page',
    data,
  })
}

//根据ID获取公告详情

export const getNoticeById = (id: number) => {
  return http<NoticeItem>({
    method: 'GET',
    url: '/notice/detail/' + id,
  })
}
