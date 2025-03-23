import React from 'react'
import { promises as fs } from 'fs';
import ProjectCard from './ProjectCard';

interface ProjectCardProps {
    title: string
    imagePath: string
    description?: string
}


async function Projects() {
    const file = await fs.readFile(process.cwd() + '/public/projects.json', 'utf8');
    const exprienceItems:ProjectCardProps[] = JSON.parse(file);
    // all card should display horizontally, use tailwind classes
    return (
        <div className='flex justify-center items-center'>
            {exprienceItems.map((item, index) => (
                <ProjectCard key={index} {...item} />
            ))}
        </div>
    )
}

export default Projects