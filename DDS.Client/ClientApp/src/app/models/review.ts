import { Ownership } from "./ownership";
import { User } from "./user";

export class Review {

  constructor(
    public reviewId?: number,
    public ownershipId?: number,
    public rating?: number,
    public date?: Date,
    public comment?: string,
    public ownership?: Ownership
  ) {
  }
}
