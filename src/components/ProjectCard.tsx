import Image from 'next/image'
import React from 'react'

interface ProjectCardProps {
    title: string
    imagePath: string
    description?: string
}

function ProjectCard(props:ProjectCardProps) {
  return (
    <div className='border-4 m-4'>
      <Image src={props.imagePath} alt={props.title} width={400} height={500}/>
      <h3 className='font-semibold'>{props.title}</h3>
      <p>{props.description}</p>
    </div>
  )
}

export default ProjectCard