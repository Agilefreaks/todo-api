using JsonApiDotNetCore.Controllers;
using JsonApiDotNetCore.Services;
using Microsoft.AspNetCore.Mvc;

namespace Todo.Controllers
{
    [Route("todos")]
    public class TodosController : JsonApiController<Models.Todo>
    {
        public TodosController(IJsonApiContext jsonApiContext, IResourceService<Models.Todo, int> resourceService) : base(jsonApiContext, resourceService)
        {
        }
    }
}
