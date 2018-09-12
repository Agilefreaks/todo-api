using System.Reflection;
using JsonApiDotNetCore.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;

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
        
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString(ToDoDatabase));
            }, ServiceLifetime.Transient);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "Todo API", Version = "v1" });
            });

            services.AddScoped<AppDbContext>()
                .AddJsonApi<AppDbContext>()
                .AddMvc();
        }
        
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, AppDbContext context)
        {
            app.UseSwagger();
            
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Todo API V1");
                c.RoutePrefix = string.Empty;
            });

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
