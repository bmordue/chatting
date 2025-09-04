// Define types for Steam API responses

// Type for the response from the GetPlayerSummaries API
interface SteamUserResponse {
    response: {
        players: SteamPlayer[];
    };
}

// Type for an individual player in the response
interface SteamPlayer {
    steamid: string;
    personaname: string;
    // Add other relevant fields based on your needs
}

// Type for the response from the GetOwnedGames API
interface SteamLibraryResponse {
    response: {
        games: SteamGame[];
    };
}

// Type for an individual game in the library response
interface SteamGame {
    appid: number;
    name: string;
    // Add other relevant fields based on your needs
}

// Type for the response from the Steam Wishlist API
interface SteamWishlistResponse {
    [key: string]: SteamWishlistGame;
}

// Type for an individual game in the wishlist response
interface SteamWishlistGame {
    name: string;
    // Add other relevant fields based on your needs
}

// Type for the combined data of wishlist and library
interface WishlistAndLibraryData {
    wishlist: SteamWishlistResponse;
    library: SteamLibraryResponse;
}

export type {
    SteamUserResponse,
    SteamPlayer,
    SteamLibraryResponse,
    SteamGame,
    SteamWishlistResponse,
    SteamWishlistGame,
    WishlistAndLibraryData,
};
