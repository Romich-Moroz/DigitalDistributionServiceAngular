using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DDS.WebApi.Controllers
{
    [AllowAnonymous]
    [Route("api/service")]
    public class ServiceController : Controller
    {
        [HttpPost("ping")]
        public IActionResult Ping()
        {
            return Ok(Json("Ping success"));
        }
    }
}
