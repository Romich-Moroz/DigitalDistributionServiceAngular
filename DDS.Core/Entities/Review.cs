#nullable disable

namespace DDS.Core.Entities
{
    public partial class Review
    {
        public int ReviewId { get; set; }
        public int OwnershipId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }

        public virtual Ownership Ownership { get; set; }
    }
}
