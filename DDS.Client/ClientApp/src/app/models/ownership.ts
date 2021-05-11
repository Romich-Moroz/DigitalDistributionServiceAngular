import { Game } from "./game";
import { User } from "./user";

export class Ownership {

  constructor(
    public ownershipId?: number,
    public userId?: number,
    public gameId?: number,
    public date?: Date,
    public price?: number,
    public game?: Game,
    public user?: User
  ) {

  }
}
