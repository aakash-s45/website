import React from 'react'

interface LastPlayedItem{
    title: string
    artist: string
    album: string
}

interface APIResponse{
    message: string;
    status: boolean;
    data: LastPlayedItem;
    error?: string;
}

async function LastPlayed() {
    let data = await fetch('http://localhost:8000/last-played')
    let response:APIResponse = await data.json()
    const lastPlayedItem = response.data

    return (
        <div>Last Played
            <h3>{lastPlayedItem.title}</h3>
            <p>{lastPlayedItem.artist}</p>
            <p>{lastPlayedItem.album}</p>
        </div>
    )
}

export default LastPlayed