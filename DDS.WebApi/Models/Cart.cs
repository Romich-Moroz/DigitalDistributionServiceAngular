using System;

#nullable disable

namespace DDS.WebApi.Models
{
    public partial class Cart
    {
        public int CartId { get; set; }
        public int UserId { get; set; }
        public int GameId { get; set; }
        public DateTime Date { get; set; }

        public virtual Game Game { get; set; }
        public virtual User User { get; set; }
    }
}
