import { Game } from "./game";

export class Cart {
  constructor(
    public cartId?: number,
    public userId?: number,
    public gameId?: number,
    public game?: Game,
    public date?: Date,
  ) {

  }
}
