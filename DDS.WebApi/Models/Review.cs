#nullable disable

using System;

namespace DDS.WebApi.Models
{
    public partial class Review
    {
        public int ReviewId { get; set; }
        public int OwnershipId { get; set; }
        public int Rating { get; set; }
        public DateTime Date { get; set; }
        public string Comment { get; set; }

        public virtual Ownership Ownership { get; set; }
    }
}
