import React from 'react'

interface NowPlayingItem{
    title: string
    artist: string
    album: string
}

interface APIResponse{
    message: string;
    status: boolean;
    data: NowPlayingItem;
    error?: string;
}

async function NowPlaying() {
    // let data = await fetch('http://localhost:8000/now-playing')
    // let response:APIResponse = await data.json()
    // const currentlyPlaying = response.data
    const currentlyPlaying = {
        title: 'The Wall',
        artist: 'Pink Floyd',
        album: 'The Wall'
    }

    return (
        <div>
            <h2>NowPlaying</h2>
            <h3>{currentlyPlaying.title}</h3>
            <p>{currentlyPlaying.artist}</p>
            <p>{currentlyPlaying.album}</p>
        </div>
    )
}

export default NowPlaying