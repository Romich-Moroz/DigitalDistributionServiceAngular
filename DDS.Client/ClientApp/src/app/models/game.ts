import { GameGenre } from "./gameGenre";

export class Game {
  get genresString(): string {
    var result = this.gameGenres.map(a => a.genre.name).join();
    console.log(result);
    return result;
  }

  constructor(
    public gameId?: number,
    public name?: string,
    public developer?: string,
    public description?: string,
    public rating?: number,
    public reviewCount?: number,
    public price?: number,
    public gameGenres?: GameGenre[],
    public image?: string,
  ) {
    
  }
}
