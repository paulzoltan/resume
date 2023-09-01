const randomString = 'zqc2hdKYGy'

export function encodeNumerics(json: string) {
  return json.replace(/"(\d+)"/g, (match, g1) => `"${randomString}${g1}"`)
}

export function decodeNumeric(str: string) {
  return str.slice(0, 10) === randomString ? str.slice(10) : str
}
