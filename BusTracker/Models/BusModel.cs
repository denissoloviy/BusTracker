using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BusTracker.Models
{
    [System.ComponentModel.DataAnnotations.Schema.Table("BusModels")]
    public class BusModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int BusModelId { get; set; }
        public string ModelOfBus { get; set; }
        public List<Seat> Seats { get; set; }
    }
}