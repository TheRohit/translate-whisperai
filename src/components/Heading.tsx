import { FC } from 'react'

interface HeadingProps {
  
}

const Heading: FC<HeadingProps> = ({}) => {
  return <div className='mt-24 '>
    <h1 className='font-mono text-2xl font-bold'>Transcribe Video to Text</h1>
  </div>
}

export default Heading