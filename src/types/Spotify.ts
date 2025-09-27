export namespace Spotify {
  export type Player = any;
  export type Track = {
    name: string,
    album: {
      images: {
        url: string
      }[],
    },
    artists: {
      name: string
    }[],
  };
}