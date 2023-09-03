declare module '!!raw-loader!*' {
  const contents: string
  export = contents
}

declare module '*.mp4' {
  const src: string
  export default src
}

type Lang = 'hu' | 'en'
