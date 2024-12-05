import { View, Navigator, Image, Text } from '@tarojs/components'
import './resourceltem.scss'
import { AtIcon } from 'taro-ui'

interface ResourceItemProps {
  resource: IndexResourceType
}

const ResourceItem = ({ resource }: ResourceItemProps) => {
  return (
    <View className="scroll">
      <Navigator
        url={`/pages/content/content?id=${resource.pkId}`}
        className="scroll-item"
        key={resource.pkId}
      >
        <View className="top">
          <View className="img">
            <Image src={resource.authorAvatar} mode="aspectFill" />
          </View>
          <Text className="username">{resource.author}</Text>
        </View>
        <View className="title">
          {resource.isTop === 1 && <View className="isTop">置顶</View>}{' '}
          <View className="content-title">{resource.title}</View>
        </View>
        <View className="content">{resource.detail}</View>
        <View className="bottom">
          <View className="tags">
            {resource.tags.map((tag, index) => (
              <View className="tag" key={index}>
                {tag}
              </View>
            ))}
          </View>
          <View className="right">
            <View className="row">
              <AtIcon value="download" size="20" />
              <Text>{resource.downloadNum}</Text>
            </View>
            <View className="row">
              <AtIcon value="heart" size="20" />
              <Text>{resource.likeNum}</Text>
            </View>
            <View className="row">
              <AtIcon value="star" size="20" />
              <Text>{resource.collectNum}</Text>
            </View>
          </View>
        </View>
      </Navigator>
    </View>
  )
}

export default ResourceItem
