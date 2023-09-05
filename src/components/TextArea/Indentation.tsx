export class Indentation {
  value: number
  constructor(value: number) {
    this.value = value
  }
  increase() {
    this.value++
    return ''
  }
  decrease() {
    this.value--
    return ''
  }
  render() {
    return (
      <>
        {Array(this.value)
          .fill(null)
          .map((_, index) => (
            <span className='indentation' key={index}>
              &nbsp;&nbsp;
            </span>
          ))}
      </>
    )
  }
}
