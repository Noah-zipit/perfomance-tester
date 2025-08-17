// src/routes/api/games/+server.js
import { json } from '@sveltejs/kit';

// This is a mock endpoint for game data
// In a real implementation, this would fetch from a database
export async function GET() {
  const popularGames = [
    { id: 'cyberpunk2077', title: 'Cyberpunk 2077' },
    { id: 'fortnite', title: 'Fortnite' },
    { id: 'valorant', title: 'Valorant' },
    { id: 'gtav', title: 'Grand Theft Auto V' },
    { id: 'minecraft', title: 'Minecraft' },
    { id: 'apexlegends', title: 'Apex Legends' },
    { id: 'rdr2', title: 'Red Dead Redemption 2' },
    { id: 'warzone', title: 'Call of Duty: Warzone' },
    { id: 'eldenring', title: 'Elden Ring' },
    { id: 'leagueoflegends', title: 'League of Legends' }
  ];
  
  return json(popularGames);
}