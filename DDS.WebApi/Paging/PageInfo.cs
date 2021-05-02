namespace CMSys.Common.Paging
{
    public class PageInfo
    {
        public int Page { get; }
        public int PerPage { get; }

        public PageInfo(int page = 1, int perPage = int.MaxValue)
        {
            Page = page;
            PerPage = perPage;
        }
    }
}