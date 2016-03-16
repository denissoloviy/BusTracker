using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BusTracker.Models
{
    [System.ComponentModel.DataAnnotations.Schema.Table("Seats")]
    public class Seat
    {
        [System.ComponentModel.DataAnnotations.Key]
        public int SeatId { get; set; }
        public int BusModelId { get; set; }
        public int SeatNumber { get; set; }
        public string Left { get; set; }
        public string Top { get; set; }
        public BusModel BusModel { get; set; }
    }
}