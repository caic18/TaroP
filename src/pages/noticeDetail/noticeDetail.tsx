import { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import './noticeDetail.scss'
import { useLoad } from '@tarojs/taro'
import { getNoticeById } from '@/service/notice'

export default function noticeDetail() {
  const [notice, setNotice] = useState<NoticeItem>({
    pkId: 0,
    title: '',
    content: '',
    adminId: 0,
    isTop: 0,
    createTime: '',
    adminName: '',
  })
  let id = 0
  useLoad(options => {
    id = +options.id
  })
  const getNoticeInfo = async () => {
    const res = await getNoticeById(id)
    if (res.code == 0) {
      setNotice(res.data)
    }
  }
  useEffect(() => {
    getNoticeInfo()
  }, [])
  return (
    <View
      className="noticeLayout"
      style={{
        display: notice ? 'block' : 'none',
      }}
    >
      <View className="title">
        <View className="tag">{notice.isTop === 1 && <Text className="isTop">置顶</Text>}</View>
        <Text className="font">{notice.title}</Text>
      </View>
      <View className="info">
        <Text className="item">{notice.adminName}</Text>
        <Text className="item">{notice.createTime}</Text>
      </View>
      <View className="content">
        <View dangerouslySetInnerHTML={{ __html: notice.content }} />
      </View>
    </View>
  )
}
