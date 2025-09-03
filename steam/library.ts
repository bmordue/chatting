import fetch from 'node-fetch';
import { appConfig } from '../common/config.js';
import { SteamLibraryResponse } from './models.js';

// Check if Steam configuration is available
if (!appConfig.steam) {
  console.error('Please provide STEAM_API_KEY and STEAM_USER_ID in the .env file.');
  process.exit(1);
}

const STEAM_API_KEY = appConfig.steam.apiKey;
const STEAM_USER_ID = appConfig.steam.userId;


// Get wishlist and library data
const getWishlistAndLibraryData = async () => {
  try {
    // Get user data
    // const userResponse = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${STEAM_USER_ID}`);
    // const userJson = await userResponse.json() as SteamUserResponse;

    // console.log('Player summary response:\n\n' + JSON.stringify(userJson.response, null, 4));
    // const userData = userJson.response.players[0];

    // if (!userData) {
    //   console.error('Invalid Steam user ID');
    //   return;
    // }

    // Get wishlist data
    const wishlistResponse = await fetch(`https://store.steampowered.com/wishlist/profiles/${STEAM_USER_ID}/wishlistdata/`);
    const wishlistData = await wishlistResponse.json();

    console.log('Wishlist:\n\n' + JSON.stringify(wishlistData, null, 4));


    // Get library data
    const libraryResponse = await fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_USER_ID}`);
    const respJson = await libraryResponse.json() as SteamLibraryResponse;
    const libraryData = respJson.response.games;

    const gamesInLibrary = [];

    // Check if each game in the wishlist is in the library
    for (const appId in []) {//wishlistData) {
      // const game = wishlistData[appId];
      const isInLibrary = libraryData.some((libraryGame) => libraryGame.appid === parseInt(appId));

      if (isInLibrary) {
        gamesInLibrary.push({
          name: wishlistData[appId].name,
          appId: parseInt(appId),
        });
      }
    }

    console.log('Games in wishlist that are already in your library:', gamesInLibrary);


    const gamesWithDemos = [];

    // Check if a demo is available for each game in the wishlist
    // for (const appId in wishlistData) {
    //   const game = wishlistData[appId];
    //   const hasDemo = game.demos && game.demos.length > 0;

    //   if (hasDemo) {
    //     gamesWithDemos.push({
    //       name: game.name,
    //       appId: parseInt(appId),
    //     });
    //   }
    // }
    console.log('Games in wishlist with demos:', gamesWithDemos);


  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
};

getWishlistAndLibraryData();
