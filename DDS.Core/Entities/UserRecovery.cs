#nullable disable

namespace DDS.Core.Entities
{
    public partial class UserRecovery
    {
        public int UserRecoveryId { get; set; }
        public int UserId { get; set; }
        public string RecoveryLink { get; set; }

        public virtual User User { get; set; }
    }
}
