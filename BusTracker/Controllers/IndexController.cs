using BusTracker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BusTracker.Controllers
{
    public class IndexController : ApiController
    {
        private DataBaseContext db = new DataBaseContext();
        // GET api/index
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/index/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/index
        [HttpPost]
        public void Post(string busModel, string[] num, string[] top, string[] left)
        {
            int id = db.BusModels.Count() == 0 ? 1 : db.BusModels.ToList().Last().BusModelId + 1;
            db.BusModels.Add(new BusModel() { ModelOfBus = busModel, BusModelId = id });
            for (int i = 0; i < num.Length; i++)
            {
                db.Seats.Add(new Seat() { BusModelId = id, SeatNumber = Convert.ToInt32(num[i]), Top = top[i], Left = left[i] });
            }
            db.SaveChanges();
        }

        // PUT api/index/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/index/5
        public void Delete(int id)
        {
        }
    }
}
