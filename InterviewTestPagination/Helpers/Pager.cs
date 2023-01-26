using System;
using System.Collections.Generic;
using System.Drawing.Printing;
using System.Linq;
using System.Runtime.CompilerServices;

namespace InterviewTestPagination.Helpers {
    public class Pager
    {
        public int CurrentPage { get; set; } = 1;
        public int PageSize { get; set; } = 0;
        public string SortBy { get; set; } = string.Empty;
        public string SortOrder { get; set; } = "asc"; //asc, desc
        public int TotalItens { get; set; } = 0;
        public int TotalPages => PageSize > 0 ? (int)Math.Ceiling(TotalItens / (double)PageSize) : 0;
        public bool HasPrevious => CurrentPage > 1;
        public bool HasNext => CurrentPage < TotalPages;
        public bool AttachToHeader { get; set; } = true; //should pass the pager as a header attribute on response
    }
}
