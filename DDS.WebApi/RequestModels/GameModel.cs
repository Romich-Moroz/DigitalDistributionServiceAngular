using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DDS.WebApi.RequestModels
{
    public class GameModel
    {
        public int GameId { get; set; }
        [Required, MaxLength(64)]
        public string Developer { get; set; }
        [Required,Range(0.01,10000)]
        public decimal Price { get; set; }
        [Required, MaxLength(64)]
        public string Name { get; set; }
        [Required, MaxLength(4000)]
        public string Description { get; set; }
        [Required]
        public IFormFile Image { get; set; }
    }
}
