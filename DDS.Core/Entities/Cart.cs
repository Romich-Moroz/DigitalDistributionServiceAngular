using System;

#nullable disable

namespace DDS.Core.Entities
{
    public partial class Cart
    {
        public int CartId { get; set; }
        public int UserId { get; set; }
        public int GameId { get; set; }
        public DateTime AdditionDate { get; set; }

        public virtual Game Game { get; set; }
        public virtual User User { get; set; }
    }
}
