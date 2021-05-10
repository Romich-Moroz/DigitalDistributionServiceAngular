export class Page<T> {
  constructor(
    public items?: T[],
    public total?: number,
    public page?: number,
    public perPage?: number,
    public totalPages?: number,
    public canNext?: boolean,
    public canPrevious?: boolean
  ) { }
}
