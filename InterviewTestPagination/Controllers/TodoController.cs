using System.Collections.Generic;
using System.Web.Http;
using InterviewTestPagination.Helpers;
using InterviewTestPagination.Models;
using InterviewTestPagination.Models.Todo;
using Newtonsoft.Json;

namespace InterviewTestPagination.Controllers
{
    /// <summary>
    /// 'Rest' controller for the <see cref="Todo"/>
    /// model.
    /// 
    /// TODO: implement the pagination Action
    /// </summary>
    public class TodoController : ApiController
    {

        // TODO: [low priority] setup DI 
        private readonly IModelService<Todo> _todoService = new TodoService();

        [HttpGet]
        public PaginatedList<Todo> Todos([FromUri] Pager pager)
        {
            var result = _todoService.List(ref pager);
            return result;
        }

    }
}