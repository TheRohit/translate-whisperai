import { FC } from 'react'

interface HeadingProps {
  
}

const Heading: FC<HeadingProps> = ({}) => {
  return <div className='mt-24 border-4 border-dashed rounded-md'>
    <h1 className='font-mono text-5xl font-extrabold  m-8'>Transcribe Video to Text</h1>
  </div>
}

export default Heading