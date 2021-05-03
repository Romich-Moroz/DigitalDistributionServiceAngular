using DDS.WebApi.Database;
using DDS.WebApi.Models;
using DDS.WebApi.RequestModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Threading.Tasks;

namespace DDS.WebApi.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/admin")]
    public class AdminController : Controller
    {

        private readonly ApplicationContext Context;
        public AdminController(ApplicationContext context) => Context = context;

        [HttpPost("genres")]
        public async Task<IActionResult> AddGenre(string name)
        {
            if (await Context.Genres.AnyAsync(g => g.Name.ToUpper() == name.ToUpper()))
                return Conflict("Genre with such name already exists");
            var genre = new Genre { Name = name };
            Context.Genres.Add(genre);
            await Context.SaveChangesAsync();
            return Ok(genre);
        }

        [HttpDelete("genres/{GenreId}")]
        public async Task<IActionResult> DeleteGenre(int GenreId)
        {
            var genre = await Context.Genres.FirstOrDefaultAsync(g => g.GenreId == GenreId);
            if (genre == null)
                return Conflict("Genre with such id does not exist");
            Context.Genres.Remove(genre);
            await Context.SaveChangesAsync();
            return Ok();
        }


        private async Task<Game> MergeGame(GameModel game)
        {
            using var ms = new MemoryStream();
            await game.Image.CopyToAsync(ms);

            var tmp = new Game
            {
                GameId = game.GameId,
                Name = game.Name,
                Developer = game.Developer,
                Description = game.Description,
                Price = game.Price,
                Image = ms.ToArray()
            };
            if (tmp.GameId == 0)
                Context.Games.Add(tmp);
            else
                Context.Games.Update(tmp);
            await Context.SaveChangesAsync();
            return tmp;
        }


        [HttpPost("games")]
        public async Task<IActionResult> AddGame(GameModel game)
        {
            if (!ModelState.IsValid)
            {
                return UnprocessableEntity(ModelState);
            }
            return Ok(await MergeGame(game));
        }
        [HttpPut("games/{GameId}")]
        public async Task<IActionResult> UpdateGame(GameModel game)
        {
            if (!ModelState.IsValid)
            {
                return UnprocessableEntity(ModelState);
            }
            return Ok(await MergeGame(game));
        }

        [HttpDelete("games/{GameId}")]
        public async Task<IActionResult> DeleteGame(int GameId)
        {
            var game = await Context.Games.FirstOrDefaultAsync(g => g.GameId == GameId);
            if (game == null)
                return Conflict("Game does not exist");
            Context.Games.Remove(game);
            await Context.SaveChangesAsync();
            return Ok();
        }


        [HttpPost("games/{GameId}/genres/{GenreId}")]
        public async Task<IActionResult> AddGameGenre(int gameId, int genreId)
        {
            var gameGenre = new GameGenre { GameId = gameId, GenreId = genreId };
            try
            {
                Context.GameGenres.Add(gameGenre);
                await Context.SaveChangesAsync();
                return Ok(gameGenre);
            }
            catch
            {
                return Conflict("Game or genre does not exist");
            }
        }

        [HttpDelete("games/{GameId}/genres/{GenreId}")]
        public async Task<IActionResult> DeleteGameGenre(int gameId, int genreId)
        {
            var gameGenre = await Context.GameGenres.FirstOrDefaultAsync(gg => gg.GameId == gameId && gg.GenreId == genreId);
            if (gameGenre == null)
                return Conflict("Game or genre does not exist");
            Context.GameGenres.Remove(gameGenre);
            await Context.SaveChangesAsync();
            return Ok();
        }
    }
}
