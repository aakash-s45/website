import React from 'react'

interface MostPlayedItem{
    title: string
    artist: string
    album: string
}

interface APIResponse{
    message: string;
    status: boolean;
    data: MostPlayedItem[];
    error?: string;
}

async function MostPlayed() {
    let data = await fetch('http://localhost:8000/favourites')
    let response:APIResponse = await data.json()
    const mostPlayedItem = response.data
    // iteracte over the list list and make ul
    return (
        <div>Last Played
            <ul>
                {mostPlayedItem.map((item, index) => (
                    <li key={index}>
                        <h3>{item.title}</h3>
                        <p>{item.artist}</p>
                        <p>{item.album}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MostPlayed