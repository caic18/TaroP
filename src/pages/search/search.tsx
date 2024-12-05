import { View } from '@tarojs/components'
import './search.scss'
import { useEffect, useState } from 'react'
import { AtIcon, AtSearchBar } from 'taro-ui'
import { getTagsList } from '@/service/contribute'
import Taro from '@tarojs/taro'
import { validate } from 'webpack'

export default function Search() {
  const addHistory = (value: string) => {
    setHistorySearch([...new Set([...historySearch, value])].slice(0, 10))
    Taro.setStorageSync('historySearch', historySearch)
    console.log(queryParams, 'queryParams')
    Taro.navigateTo({
      url: `/pages/searchResult/searchResult?keyword=${queryParams.keyword}&tagId=${queryParams.tagId}`,
    })
    handleClear()
  }

  const [queryParams, setQueryParams] = useState({
    keyword: '',
    tagId: 0,
  })

  const handleClear = () => {
    console.log('Clearing...')
    setQueryParams({
      keyword: '',
      tagId: 0,
    })
  }

  const handleConfirm = () => {
    if (queryParams.keyword) {
      addHistory(queryParams.keyword)
    }
  }

  const [tagList, setTagList] = useState<Tag[]>([])

  const getTagListFun = async () => {
    const res = await getTagsList()
    const arr = res.data.filter(item => {
      return item.isHot === 1
    })
    setTagList(arr)
  }

  useEffect(() => {
    getTagListFun()
  }, [])

  const clickTag = (item: Tag) => {
    console.log(item, 'item点击标签')
    setQueryParams(prev => ({
      ...prev,
      keyword: item.title,
      tagId: item.pkId,
    }))
  }

  const [historySearch, setHistorySearch] = useState<string[]>(
    Taro.getStorageSync('historySearch') || ['aaa', 'bbb']
  )

  const removeHistory = () => {
    Taro.showModal({
      title: '是否清空历史搜索?',
      success: res => {
        if (res.confirm) {
          Taro.removeStorageSync('histroySearch')
          setHistorySearch([])
        }
      },
    })
  }

  const clickHistoryTab = (tab: string) => {
    console.log(tab, 'tab')
    setQueryParams({
      ...queryParams,
      keyword: tab,
    })
    console.log(queryParams, 'queryParams')
  }

  useEffect(() => {
    console.log(queryParams, 'queryParams')
    if (queryParams.keyword) {
      addHistory(queryParams.keyword)
    }
  }, [queryParams])

  const [searchValue, setSearchValue] = useState<string>('')
  const handleChange = (value: string) => {
    console.log(value, 'value')
    setSearchValue(value)
  }

  const handleBlur = () => {
    const val = searchValue
    if (val) {
      setQueryParams({
        ...queryParams,
        keyword: val,
      })
    }
    setSearchValue('')
  }

  return (
    <View className="searchLayout">
      <View className="search">
        <AtSearchBar
          fixed
          actionName="搜一下"
          placeholder="请输入你想要搜索的资源"
          value={searchValue}
          onConfirm={handleConfirm}
          onActionClick={handleConfirm}
          onClear={handleClear}
          onChange={e => handleChange(e)}
          onBlur={handleBlur}
        />
      </View>
      <View className="history">
        {tagList.length > 0 && (
          <>
            <View className="topTitle">
              <View className="text">热门标签</View>
            </View>
            <View className="tabs">
              {tagList.map(tag => (
                <View key={tag.pkId} className="tab" onClick={() => clickTag(tag)}>
                  {tag.title}
                </View>
              ))}
            </View>
          </>
        )}
      </View>
      <View className="history">
        {historySearch.length > 0 && (
          <>
            <View className="topTitle">
              <View className="text">最近搜索</View>
              <View className="icon" onClick={removeHistory}>
                <AtIcon value="trash" size="25"></AtIcon>
              </View>
            </View>
            <View className="tabs">
              {historySearch.map(tab => (
                <View key={tab} className="tab" onClick={() => clickHistoryTab(tab)}>
                  {tab}
                </View>
              ))}
            </View>
          </>
        )}
      </View>
    </View>
  )
}
