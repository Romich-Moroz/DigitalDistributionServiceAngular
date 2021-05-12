using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace DDS.WebApi.Models
{
    public partial class Ownership
    {
        public Ownership()
        {
            Reviews = new HashSet<Review>();
        }

        public int OwnershipId { get; set; }
        public int UserId { get; set; }
        public int GameId { get; set; }
        public DateTime Date { get; set; }
        public decimal Price { get; set; }

        public virtual Game Game { get; set; }
        public virtual User User { get; set; }
        [JsonIgnore]
        public virtual ICollection<Review> Reviews { get; set; }
    }
}
