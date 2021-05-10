import { Genre } from "./genre";

export class GameGenre {
  constructor(
    public genreId?: number,
    public gameId?: number,
    public genre?: Genre,
  ) { }
}
