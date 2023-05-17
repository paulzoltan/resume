import './numbering.css'

export interface NumberingProps {
  lineNumber: number
}
const Numbering = ({ lineNumber }: NumberingProps) => {
  return (
    <div className='numbering'>
      {Array.from(Array(lineNumber).keys()).map((key) => (
        <div key={key}>{key}</div>
      ))}
    </div>
  )
}
export default Numbering
