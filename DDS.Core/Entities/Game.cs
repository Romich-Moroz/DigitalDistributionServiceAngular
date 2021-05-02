using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace DDS.Core.Entities
{
    public partial class Game
    {
        public Game()
        {
            Carts = new HashSet<Cart>();
            GameGenres = new HashSet<GameGenre>();
            Ownerships = new HashSet<Ownership>();
        }

        public int GameId { get; set; }
        public string Developer { get; set; }
        public decimal Price { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Rating { get; set; }
        public int ReviewCount { get; set; }
        public byte[] Image { get; set; }
        public bool IsRemoved { get; set; }

        public virtual ICollection<Cart> Carts { get; set; }
        public virtual ICollection<GameGenre> GameGenres { get; set; }
        [JsonIgnore]
        public virtual ICollection<Ownership> Ownerships { get; set; }
    }
}
