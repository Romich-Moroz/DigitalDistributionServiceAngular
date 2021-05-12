using CMSys.Common.Paging;
using DDS.WebApi.Database;
using DDS.WebApi.Models;
using DDS.WebApi.RequestModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DDS.WebApi.Controllers
{
    [Authorize]
    [Route("api/store")]
    public class StoreController : Controller
    {
        private readonly ApplicationContext Context;
        public StoreController(ApplicationContext context) => Context = context;


        private async Task<PagedList<Game>> GetPagedList(PageInfo pageInfo, string gameName, decimal minPrice, decimal maxPrice, int genreId, Expression<Func<Game, bool>> predicate = null)
        {
            IQueryable<Game> query = Context.Games.Include(g => g.GameGenres).ThenInclude(gg => gg.Genre).Where(g => !g.IsRemoved).OrderBy(g => g.Name);
            if (predicate != null)
            {
                query = query.Where(predicate);
            }

            query = ApplyFilter(query, gameName, minPrice, maxPrice, genreId);
            List<Game> items = await query.SelectPage(pageInfo).ToListAsync();
            int total = query.Count();

            return new PagedList<Game>(items, total, pageInfo);
        }

        private static IQueryable<Game> ApplyFilter(IQueryable<Game> query, string gameName, decimal minPrice, decimal maxPrice, int genreId)
        {
            if (!string.IsNullOrEmpty(gameName))
                query = query.Where(x => x.Name.ToUpper().Contains(gameName.ToUpper()));
            if (minPrice != 0)
                query = query.Where(x => x.Price > minPrice);
            if (maxPrice != 0)
                query = query.Where(x => x.Price < maxPrice);
            if (genreId != 0)
                query = query.Where(x => x.GameGenres.Any(g => g.GenreId == genreId));

            return query;
        }

        [AllowAnonymous]
        [HttpPost("games")]
        public async Task<IActionResult> GetGames(int page, int pageSize, string gameName, decimal minPrice, decimal maxPrice, int genreId)
        {
            if (page <= 0)
                return UnprocessableEntity(Json("Page size is less or equal to zero"));
            if (pageSize <= 0)
                return UnprocessableEntity(Json("Page size is less or equal to zero"));
            return Ok(await GetPagedList(new PageInfo(page, pageSize), gameName, minPrice, maxPrice, genreId));
        }

        [AllowAnonymous]
        [HttpGet("games/{GameId}/reviews")]
        public async Task<IActionResult> GetGameReviews(int GameId)
        {
            return Ok(await Context.Reviews.Where(r => r.Ownership.GameId == GameId).Include(r => r.Ownership).ThenInclude(o => o.User).OrderByDescending(r => r.Date).ToListAsync());
        }

        [AllowAnonymous]
        [HttpGet("games/{GameId}")]
        public async Task<IActionResult> GetGame(int GameId)
        {
            var game = await Context.Games.Include(g => g.GameGenres).ThenInclude(gg => gg.Genre).FirstOrDefaultAsync(g => g.GameId == GameId);
            if (game == null)
                return UnprocessableEntity(Json("Game does not exist"));
            return Ok(game);
        }

        [AllowAnonymous]
        [HttpGet("genres")]
        public async Task<IActionResult> GetGenres()
        {
            return Ok(await Context.Genres.OrderBy(g => g.Name).ToListAsync());
        }


        [HttpGet("carts")]
        public async Task<IActionResult> GetCart()
        {
            return Ok(await Context.Carts.Include(c => c.Game).Where(c => c.User.Email == User.Identity.Name).OrderBy(c => c.Date).ToListAsync());
        }

        [HttpPost("games/{GameId}/carts")]
        public async Task<IActionResult> AddToCart(int GameId)
        {
            var user = await Context.Users.FirstAsync(u => u.Email == User.Identity.Name);
            if (await Context.Carts.Include(c => c.Game).AnyAsync(c => c.UserId == user.UserId && c.GameId == GameId && c.Game.IsRemoved == false))
                return Conflict(Json("Game is already in cart"));
            if (await Context.Ownerships.AnyAsync(o => o.GameId == GameId && o.UserId == user.UserId))
                return Conflict(Json("Game is already owned"));
            var cart = new Cart { GameId = GameId, UserId = user.UserId };
            Context.Carts.Add(cart);
            await Context.SaveChangesAsync();
            return Ok(cart);
        }

        [HttpDelete("carts/{CartId}")]
        public async Task<IActionResult> DeleteFromCart(int CartId)
        {
            var user = await Context.Users.FirstAsync(u => u.Email == User.Identity.Name);
            var cart = await Context.Carts.FirstOrDefaultAsync(c => c.UserId == user.UserId && c.CartId == CartId);
            if (cart == null)
                return Conflict(Json("Cart item does not exist"));
            Context.Carts.Remove(cart);
            await Context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("carts/checkout")]
        public async Task<IActionResult> Checkout()
        {
            var user = await Context.Users.FirstAsync(u => u.Email == User.Identity.Name);
            var carts = await Context.Carts.Include(c => c.Game).Where(c => c.UserId == user.UserId).ToListAsync();
            if (carts.Count == 0)
                return Conflict(Json("Cart is empty"));
            Context.Ownerships.AddRange(carts.Select(c => new Ownership { GameId = c.GameId, Price = c.Game.Price, UserId = c.UserId }));
            Context.Carts.RemoveRange(carts);
            await Context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("ownerships")]
        public async Task<IActionResult> GetOwnerships()
        {
            var user = await Context.Users.FirstAsync(u => u.Email == User.Identity.Name);
            var tmp = Ok(await Context.Ownerships
                .Include(o => o.Game)
                .ThenInclude(g => g.GameGenres)
                .ThenInclude(g => g.Genre)
                .Where(o => o.UserId == user.UserId)
                .OrderByDescending(o => o.Date)
                .ToListAsync());
            return tmp;
        }


        private async Task<Review> MergeReview(ReviewModel model)
        {
            var review = new Review
            {
                ReviewId = model.ReviewId,
                OwnershipId = model.OwnershipId,
                Comment = model.Comment,
                Rating = model.Rating,
                Date = DateTime.UtcNow
            };
            if (review.ReviewId == 0) Context.Add(review);
            else Context.Update(review);
            await Context.SaveChangesAsync();
            return review;
        }

        [HttpGet("ownerships/{OwnershipId}/reviews")]
        public async Task<IActionResult> GetGameReview(int OwnershipId)
        {
            return Ok(await Context.Reviews.FirstOrDefaultAsync(r => r.OwnershipId == OwnershipId));
        }

        [HttpPost("ownerships/{OwnershipId}/reviews")]
        public async Task<IActionResult> AddGameReview(ReviewModel model)
        {
            if (!ModelState.IsValid)
                return UnprocessableEntity(ModelState);
            if (!await Context.Ownerships.AnyAsync(o => o.OwnershipId == model.OwnershipId))
                return Conflict(Json("You do not own this product"));
            if (await Context.Reviews.AnyAsync(r => r.OwnershipId == model.OwnershipId))
                return Conflict(Json("Review already exists"));
            return Ok(await MergeReview(model));
        }

        [HttpPut("ownerships/{OwnershipId}/reviews/{ReviewId}")]
        public async Task<IActionResult> UpdateGameReview(ReviewModel model)
        {
            if (model.ReviewId == 0)
                return UnprocessableEntity(Json("Invalid review id"));
            if (!ModelState.IsValid)
                return UnprocessableEntity(ModelState);
            if (!await Context.Ownerships.AnyAsync(o => o.OwnershipId == model.OwnershipId))
                return Conflict(Json("You do not own this product"));
            if (!await Context.Reviews.AnyAsync(r => r.OwnershipId == model.OwnershipId))
                return Conflict(Json("Review does not exists"));

            return Ok(await MergeReview(model));
        }

        [HttpDelete("ownerships/{OwnershipId}/reviews/{ReviewId}")]
        public async Task<IActionResult> DeleteGameReview(int OwnershipId, int ReviewId)
        {
            var user = await Context.Users.FirstAsync(u => u.Email == User.Identity.Name);
            var review = await Context.Reviews.FirstOrDefaultAsync(r => r.OwnershipId == OwnershipId && r.ReviewId == ReviewId && r.Ownership.UserId == user.UserId);
            if (review == null)
                return UnprocessableEntity(Json("Invalid review id"));
            Context.Reviews.Remove(review);
            await Context.SaveChangesAsync();
            return Ok();
        }
    }
}
