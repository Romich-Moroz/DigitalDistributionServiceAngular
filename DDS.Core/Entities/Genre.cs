using System.Collections.Generic;

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

        public virtual ICollection<GameGenre> GameGenres { get; set; }
    }
}
