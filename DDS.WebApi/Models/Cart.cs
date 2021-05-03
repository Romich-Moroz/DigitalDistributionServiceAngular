using System;
using System.Text.Json.Serialization;

#nullable disable

namespace DDS.WebApi.Models
{
    public partial class Cart
    {
        public int CartId { get; set; }
        public int UserId { get; set; }
        public int GameId { get; set; }
        public DateTime Date { get; set; }

        [JsonIgnore]
        public virtual Game Game { get; set; }
        [JsonIgnore]
        public virtual User User { get; set; }
    }
}
