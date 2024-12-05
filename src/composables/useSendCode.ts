import { sendCode } from '@/service/user'
import { isPhoneAvailable } from '@/utils/validate'
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'

export function useSendCode() {
  const [count, setCount] = useState(60)

  const [timer, setTimer] = useState(false)

  const [phoneForm, setPhoneForm] = useState({
    phone: '',
    code: '',
  })

  useEffect(() => {
    let interval
    if (timer) {
      interval = setInterval(() => {
        setCount(prevCount => {
          if (prevCount === 1) {
            clearInterval(interval)
            setTimer(false)
            return 60
          }
          return prevCount - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timer])

  const sendPhoneCode = async () => {
    if (phoneForm.phone && isPhoneAvailable(phoneForm.phone)) {
      setTimer(true)
      const res = await sendCode(phoneForm.phone)
      if (res.code === 0) {
        Taro.showToast({
          title: '验证码发送成功',
          icon: 'none',
        })
      } else {
        Taro.showToast({
          title: '验证码发送失败',
          icon: 'none',
        })
      }
    } else {
      Taro.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
      })
    }
  }
  return {
    count,
    timer,
    phoneForm,
    setPhoneForm,
    sendPhoneCode,
  }
}
