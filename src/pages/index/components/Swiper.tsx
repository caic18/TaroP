import { useState } from 'react'
import './swiper.scss'
import { Swiper, SwiperItem, View, Navigator, Image, Text } from '@tarojs/components'
import { on } from 'events'

interface SwiperProps {
  swiperList: SwiperItem[]
}

const Carousel = ({ swiperList }: SwiperProps) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const onChange = ev => {
    setActiveIndex(ev.detail.current)
  }

  return (
    <View className="carousel" style={{ display: swiperList.length !== 0 ? 'flex' : 'none' }}>
      <Swiper autoplay circular interval={3000} onChange={onChange} className="swiper">
        {swiperList.map(item => (
          <SwiperItem key={item.pkId}>
            <Navigator
              url={`/pages/noticeDetail/noticeDetail?id=${item.pkId}`}
              className="navigator"
            >
              <Image mode="aspectFill" className="image" src={item.cover} />
            </Navigator>
          </SwiperItem>
        ))}
      </Swiper>
      <View className="indicator">
        {swiperList.map((item, index) => (
          <Text key={item.pkId} className={`dot ${index === activeIndex ? 'active' : ''}`}></Text>
        ))}
      </View>
    </View>
  )
}

export default Carousel
