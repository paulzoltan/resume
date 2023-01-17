import './numbering.css'

export interface NumberingProps {
  data: any
}
const Numbering = ({ data }: NumberingProps) => {
  const countLines = (data: any) => {
    return JSON.stringify(data, null, 2).split(/\n/).length
  }

  return (
    <div className='numbering'>
      {Array.from(Array(countLines(data)).keys()).map((key) => (
        <div key={key}>{key}</div>
      ))}
    </div>
  )
}
export default Numbering
