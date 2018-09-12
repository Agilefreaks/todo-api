using JsonApiDotNetCore.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Todo
{
    public class Startup
    {
        private const string ToDoDatabase = "TodoDB";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString(ToDoDatabase));
            }, ServiceLifetime.Transient);

            services.AddScoped<AppDbContext>();
            services.AddJsonApi<AppDbContext>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, AppDbContext context)
        {
            context.Database.EnsureCreated();
            if (context.Todos.Any() == false)
            {
                context.Todos.Add(new Models.Todo()
                { 
                    Content = "First Todo",
                    IsDone = true

                });
                context.Todos.Add(new Models.Todo()
                {
                    Content = "This is something to do.",
                    IsDone = false

                });
                context.SaveChanges();
            }
            app.UseJsonApi();
        }
    }
}
