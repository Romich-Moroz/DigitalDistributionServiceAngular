using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace CMSys.Common.Paging
{
    public class PagedList<T>
    {
        public IReadOnlyList<T> Items { get; }
        public int Total { get; }
        public int Page { get; }
        public int PerPage { get; }

        public int TotalPages => Total % PerPage == 0 ? Total / PerPage : Total / PerPage + 1;
        public bool CanNext => Page < TotalPages;
        public bool CanPrevious => Page > 1;

        public PagedList(IList<T> items, int total, int page = 1, int perPage = int.MaxValue) : this(items, total,
            new PageInfo(page, perPage))
        {
        }

        public PagedList(IList<T> items, int total, PageInfo pageInfo)
        {
            Items = new ReadOnlyCollection<T>(items);
            Total = total;
            Page = pageInfo.Page;
            PerPage = pageInfo.PerPage;
        }

        public PagedList<TResult> Convert<TResult>(Func<T, TResult> func)
        {
            return new PagedList<TResult>(Items.Select(func).ToList(), Total, Page, PerPage);
        }
    }
}