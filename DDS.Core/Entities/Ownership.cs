using System;
using System.Collections.Generic;

#nullable disable

namespace DDS.Core.Entities
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
        public DateTime OwnershipDate { get; set; }
        public decimal Price { get; set; }

        public virtual Game Game { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
    }
}
