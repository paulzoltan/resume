/**
 * If the text is a URL, encase it in an "a" HTML tag.
 */
export default function linkify(text: string) {
  const url =
    /^(http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
  return url.test(text) ? <a href={text}>{text}</a> : text
}
