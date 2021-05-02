using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DDS.WebApi.RequestModels
{
    public class ReviewModel
    {
        public int ReviewId { get; set; }
        [Required]
        public int OwnershipId { get; set; }
        [Required,Range(1,10)]
        public int Rating { get; set; }
        public DateTime Date { get; set; }
        [Required, MaxLength(4000)]
        public string Comment { get; set; }
    }
}
