import React from 'react'

interface ExperienceItems{
  title: string
  company: string
  location: string
  duration: string
  description: string
}

function ExperienceTile(props: ExperienceItems) {
  return (
    <div className='mx-8 my-4'>
      <div className='flex flex-row justify-between'>
        <h3 className='font-semibold'>{props.title} at {props.company}</h3>
        <p>{props.location} {props.duration}</p>
      </div>
        <p>{props.description}</p>
    </div>
  )
}

export default ExperienceTile