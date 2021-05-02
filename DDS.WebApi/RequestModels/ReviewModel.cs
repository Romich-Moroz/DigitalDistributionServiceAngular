using System;
using System.ComponentModel.DataAnnotations;

namespace DDS.WebApi.RequestModels
{
    public class ReviewModel
    {
        public int ReviewId { get; set; }
        [Required]
        public int OwnershipId { get; set; }
        [Required, Range(1, 10)]
        public int Rating { get; set; }
        public DateTime Date { get; set; }
        [Required, MaxLength(4000)]
        public string Comment { get; set; }
    }
}
