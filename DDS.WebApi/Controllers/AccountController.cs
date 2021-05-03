
using DDS.WebApi.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace DDS.WebApi.Controllers
{
    [Authorize]
    [Route("api/account")]
    public class AccountController : Controller
    {
        private readonly ApplicationContext Context;
        public AccountController(ApplicationContext context) => Context = context;

        [HttpPost("update")]
        public async Task<IActionResult> UpdateAccount(string newPassword)
        {
            var user = await Context.Users.FirstAsync(u => u.Email == User.Identity.Name);
            user.Password = newPassword;
            await Context.SaveChangesAsync();
            return Ok(user);
        }
    }
}
