using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;

namespace DDS.WebApi.RequestModels
{
    public class GameModel
    {
        public int GameId { get; set; }
        [Required, MaxLength(64)]
        public string Developer { get; set; }
        [Required, Range(0.01, 10000)]
        public decimal Price { get; set; }
        [Required, MaxLength(64)]
        public string Name { get; set; }
        [Required, MaxLength(4000)]
        public string Description { get; set; }
        [Required]
        public IFormFile Image { get; set; }
    }
}
