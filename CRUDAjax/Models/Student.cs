using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CRUDAjax.Models
{
    public class Student
    {

        [Key]
        public int USN { get; set; }

        [Required]
        public string Name { get; set; }

         [Required]
        public string Course { get; set; }

         [Required]
        public DateTime DOB { get; set; }

         [Required]
        public string Email { get; set; }

        public string Contact { get; set; }
    }
}