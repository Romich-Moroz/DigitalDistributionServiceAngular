using Microsoft.AspNetCore.Mvc;

namespace DDS.WebApi.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
