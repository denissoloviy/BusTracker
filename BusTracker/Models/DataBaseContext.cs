using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace BusTracker.Models
{
    public class DataBaseContext: DbContext
    {
        public DataBaseContext()
            : base("DataBaseContext")
        {
        }

        public DbSet<BusModel> BusModels { get; set; }
        public DbSet<Seat> Seats { get; set; }
    }
}