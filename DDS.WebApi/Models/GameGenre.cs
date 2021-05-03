#nullable disable

using System.Text.Json.Serialization;

namespace DDS.WebApi.Models
{
    public partial class GameGenre
    {
        public int GameId { get; set; }
        public int GenreId { get; set; }

        [JsonIgnore]
        public virtual Game Game { get; set; }
        public virtual Genre Genre { get; set; }
    }
}
