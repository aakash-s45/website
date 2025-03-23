import React from 'react'
import { promises as fs } from 'fs';
import ExperienceTile from './ExperienceTile'

interface ExperienceItems{
    title: string
    company: string
    location: string
    duration: string
    description: string
}

async function Experience() {
    const file = await fs.readFile(process.cwd() + '/public/experience.json', 'utf8');
    const exprienceItems:ExperienceItems[] = JSON.parse(file);
    return (
        <div>
            {exprienceItems.map((item, index) => (
                <ExperienceTile key={index} {...item} />
            ))}
        </div>
    )
  
}

export default Experience