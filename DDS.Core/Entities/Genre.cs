using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace DDS.Core.Entities
{
    public partial class Genre
    {
        public Genre()
        {
            GameGenres = new HashSet<GameGenre>();
        }

        public int GenreId { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public virtual ICollection<GameGenre> GameGenres { get; set; }
    }
}
