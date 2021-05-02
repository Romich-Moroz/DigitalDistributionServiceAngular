using DDS.Core.Entities;
using DDS.Database;
using DDS.WebApi.RequestModels;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DDS.WebApi.Controllers
{
    [AllowAnonymous]
    [Route("api/auth")]
    public class AuthorizationController : Controller
    {
        private readonly ApplicationContext Context;
        private readonly IConfiguration Config;

        public AuthorizationController(ApplicationContext db, IConfiguration config)
        {
            Context = db;
            Config = config;
        }

        private async void GenerateCookie(User user)
        {
            var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.Email),
                    new Claim(ClaimTypes.Role, user.Role.Name)
                };
            ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(CredentialsModel model)
        {
            if (!ModelState.IsValid)
            {
                return UnprocessableEntity(ModelState);
            }
            else
            {
                if (await Context.Users.AnyAsync(u => u.Email == model.Email))
                    return Conflict("User already exists");
                var user = new User { Email = model.Email, Password = model.Password, RoleId = 2 };
                Context.Users.Add(user);
                await Context.SaveChangesAsync();
                return Ok(user);
            }
        }

        [HttpPost("authorize")]
        public async Task<IActionResult> Authorize(CredentialsModel model)
        {
            if (!ModelState.IsValid)
            {
                return UnprocessableEntity(ModelState);
            }
            else
            {
                User user;
                if ((user = await Context.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Email == model.Email && u.Password == model.Password)) == null)
                    return Conflict("Invalid credentials");
                GenerateCookie(user);
                return Ok(user);
            }
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Authorize()
        {
            await HttpContext.SignOutAsync();
            return Ok();
        }

        [HttpPost("restore")]
        public async Task<IActionResult> RestoreRequest(string email)
        {
            var user = await Context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
                return Conflict("User not found");

            MimeMessage message = new MimeMessage();
            message.From.Add(new MailboxAddress("Support", "support@dds.com"));
            message.To.Add(new MailboxAddress("User", email));
            message.Subject = "Account restore";

            var code = Guid.NewGuid().ToString();
            message.Body = new BodyBuilder
            {
                HtmlBody = $"<h1>Your account restore code: {code}</h1>",
                TextBody = $"Your account restore code: {code}"
            }.ToMessageBody();

            using var client = new SmtpClient();
            await client.ConnectAsync("smtp.gmail.com", 465, true);
            await client.AuthenticateAsync(Config["email"], Config["password"]);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
            Context.UserRecoveries.Add(new UserRecovery { User = user, RecoveryLink = code });
            await Context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("confirm")]
        public async Task<IActionResult> ConfirmIdentity(string code)
        {
            var user = (await Context.UserRecoveries.Include(ur => ur.User).Include(ur => ur.User.Role).FirstOrDefaultAsync(ur => ur.RecoveryLink == code))?.User;
            if (user == null) return Conflict("Recovery code is not valid");
            Context.UserRecoveries.RemoveRange(Context.UserRecoveries.Where(ur => ur.UserId == user.UserId));
            await Context.SaveChangesAsync();
            GenerateCookie(user);
            return Ok(user);
        }
    }
}
