using System.ComponentModel.DataAnnotations;

namespace DDS.WebApi.RequestModels
{
    public class CredentialsModel
    {
        [Required, EmailAddress, MaxLength(320)]
        public string Email { get; set; }
        [Required, MaxLength(128)]
        public string Password { get; set; }
    }
}
