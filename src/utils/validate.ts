function isPhoneAvailable(phone: string) {
  const reg = /^1[3-9]\d{9}$/
  return reg.test(phone)
}

function isCodeAvailable(code: string) {
  const reg = /^\d{4}$/
  return reg.test(code)
}

export { isPhoneAvailable, isCodeAvailable }
