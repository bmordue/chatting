import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
import { SteamLibraryResponse, SteamUserResponse, SteamWishlistResponse } from './models.js';

dotenv.config(); // Load environment variables from .env file

const STEAM_API_KEY = process.env.STEAM_API_KEY || '';
const STEAM_USER_ID = process.env.STEAM_USER_ID || '';

// Check if environment variables are provided
if (!STEAM_API_KEY || !STEAM_USER_ID) {
  console.error('Please provide STEAM_API_KEY and STEAM_USER_ID in the .env file.');
  process.exit(1);
}


// Get wishlist and library data
const getWishlistAndLibraryData = async () => {
  try {
    // Get user data
    const userResponse = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${STEAM_USER_ID}`);
    const userJson = await userResponse.json() as SteamUserResponse;
    const userData = userJson.response.players[0];

    if (!userData) {
      console.error('Invalid Steam user ID');
      return;
    }

    // Get wishlist data
    const wishlistResponse = await fetch(`https://store.steampowered.com/wishlist/profiles/${userData.steamid}/wishlistdata/`);
    const wishlistData = await wishlistResponse.json() as SteamWishlistResponse;

    console.log(JSON.stringify(wishlistData, null, 4));


    // Get library data
    const libraryResponse = await fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_USER_ID}`);
    const respJson = await libraryResponse.json() as SteamLibraryResponse;
    const libraryData = respJson.response.games;

    const gamesInLibrary = [];

    // Check if each game in the wishlist is in the library
    for (const appId in wishlistData) {
      const game = wishlistData[appId];
      const isInLibrary = libraryData.some((libraryGame: any) => libraryGame.appid === parseInt(appId));

      if (isInLibrary) {
        gamesInLibrary.push({
          name: game.name,
          appId: parseInt(appId),
        });
      }
    }

    console.log('Games in wishlist that are already in your library:', gamesInLibrary);


    const gamesWithDemos = [];

    // Check if a demo is available for each game in the wishlist
    for (const appId in wishlistData) {
      const game = wishlistData[appId];
      // const hasDemo = game.demos && game.demos.length > 0;

      // if (hasDemo) {
      //   gamesWithDemos.push({
      //     name: game.name,
      //     appId: parseInt(appId),
      //   });
      // }
    }
    console.log('Games in wishlist with demos:', gamesWithDemos);


  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
};

getWishlistAndLibraryData();
