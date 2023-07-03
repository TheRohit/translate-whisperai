import { FC } from 'react'
import Heading from "@/components/Heading";
import UserForm from './UserForm';

interface MainAreaProps {
  
}

const MainArea: FC<MainAreaProps> = ({}) => {
  return <div>
    <Heading />
    <UserForm/>
  </div>
}

export default MainArea