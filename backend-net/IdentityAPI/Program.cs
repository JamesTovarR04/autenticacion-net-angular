using IdentityAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.OpenApi.Models;
using Microsoft.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Add services to the container.

builder.Services.AddDbContext<ApplicationDbContext>(
    options => options.UseSqlServer(connectionString));

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(ctx => ctx.AddSecurityDefinition("token", new OpenApiSecurityScheme
{
    Type = SecuritySchemeType.Http,
    In = ParameterLocation.Header,
    Name = HeaderNames.Authorization,
    Scheme = "Bearer"
}));

var corsFrontendAngular = builder.Configuration["CorsConfig:frontend-angular"];
builder.Services.AddCors(o => o.AddPolicy("AllowFrontCors", policy =>
{
    policy.WithOrigins(corsFrontendAngular!)
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
}));

builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

var app = builder.Build();

app.UseCors("AllowFrontCors");

app.MapGroup("/identity").MapIdentityApi<IdentityUser>();

app.MapPost("/identity/logout", async (SignInManager<IdentityUser> signInManager,
        [FromBody] object empty) =>
    {
        if (empty != null)
        {
            await signInManager.SignOutAsync();
            return Results.Ok();
        }
        return Results.Unauthorized();
    })
    .WithOpenApi()
    .RequireAuthorization();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthorization();

app.MapControllers();

app.Run();
