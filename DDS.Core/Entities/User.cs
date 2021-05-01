using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace DDS.Core.Entities
{
    public partial class User
    {
        public User()
        {
            Carts = new HashSet<Cart>();
            Ownerships = new HashSet<Ownership>();
            UserRecoveries = new HashSet<UserRecovery>();
        }

        public int UserId { get; set; }
        public int RoleId { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public virtual Role Role { get; set; }
        public virtual ICollection<Cart> Carts { get; set; }
        public virtual ICollection<Ownership> Ownerships { get; set; }
        [JsonIgnore]
        public virtual ICollection<UserRecovery> UserRecoveries { get; set; }
    }
}
