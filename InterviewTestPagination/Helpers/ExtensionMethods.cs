using InterviewTestPagination.Helpers;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Drawing.Drawing2D;
using System.Drawing.Printing;
using System.Linq;

namespace InterviewTestPagination.Helpers
{
    public static class ExtensionMethods
    {
        public static IEnumerable<T> Paginate<T>(this IEnumerable<T> data, ref Pager pager)
        {
            //sorts the list first
            if (!string.IsNullOrEmpty(pager.SortBy))
            {
                var propertyInfo = typeof(T).GetProperty(pager.SortBy);
                
                //if the sorting property is found, sorts the list
                if(propertyInfo != null)
                {
                    //ascending order is default
                    if (string.IsNullOrEmpty(pager.SortOrder) || pager.SortOrder.ToLower() == "asc")
                        data = data.OrderBy(x => propertyInfo.GetValue(x, null));
                    else
                        data = data.OrderByDescending(x => propertyInfo.GetValue(x, null));
                }                
            }

            //paginates the sorted results
            if(pager.PageSize > 0)
            {
                pager.TotalItens = data.Count();
                data = data.Skip((pager.CurrentPage - 1) * pager.PageSize).Take(pager.PageSize).ToList();
            }

            if(pager.AttachToHeader)
                System.Web.HttpContext.Current.Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(pager));

            return data;
        }
    }
}