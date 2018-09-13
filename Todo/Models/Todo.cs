using JsonApiDotNetCore.Models;

namespace Todo.Models
{
    public class Todo : Identifiable
    {
        [Attr("content")]
        public string Content { get; set; }

        [Attr("isDone")]
        public bool IsDone { get; set; }

    }
}
