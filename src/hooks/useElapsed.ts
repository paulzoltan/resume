import { useState, useEffect } from 'react'

const useElapsed = (timeInMilliseconds: number): boolean => {
  const [elapsed, setElapsed] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setElapsed(true)
    }, timeInMilliseconds)

    return () => {
      clearTimeout(timer)
    }
  }, [timeInMilliseconds])

  return elapsed
}

export default useElapsed
