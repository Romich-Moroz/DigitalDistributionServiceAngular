using System.Collections.Generic;

#nullable disable

namespace DDS.WebApi.Models
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
        public virtual ICollection<UserRecovery> UserRecoveries { get; set; }
    }
}
