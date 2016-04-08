using BusTracker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace BusTracker.Controllers
{
    public class ModelsController : ApiController
    {
        private DataBaseContext db = new DataBaseContext();

        [HttpGet]
        [Authorize(Roles = "Hauler")]
        public IEnumerable<object> Models()
        {
            var models = (from c in db.BusModels where c.BusModelId != null select new { Model = c.ModelOfBus, Id = c.BusModelId }).ToList();
            return models;
        }
        [HttpPost]
        [ActionName("ModelReturn")]
        public object ModelReturn(string Id)
        {
            if (Id != null && Id != String.Empty)
            {
                int n = Convert.ToInt32(Id);
                BusModel bm = db.BusModels.Find(n);
                var res = new { Azone = bm.Azone, Bzone = bm.Bzone, Wigth = bm.Wigth, Height = bm.Height };
                return res;
            }
            else
            {
                return "";
            }
        }
        [HttpPost]
        public object SeatsReturn(string Id)
        {
            if (Id != null && Id != String.Empty)
            {
                int n = Convert.ToInt32(Id);
                BusModel bm = db.BusModels.Find(n);
                List<object> res = new List<object>();
                bm.Seats = (from c in db.Seats where c.BusModelId == n select c).ToList();
                foreach (var c in bm.Seats)
                {
                    res.Add(new { Left = c.Left, Top = c.Top });
                }
                return res;
            }
            else
            {
                return "";
            }
        }
        [HttpDelete]
        public void DeleteModel(int Id)
        {
            var q = (from c in db.BusModels where c.BusModelId == Id select c).FirstOrDefault();
            if (q != null)
            {
                var a = (from c in db.Seats where c.BusModelId == q.BusModelId select c).ToList();
                foreach (var n in a)
                {
                    db.Seats.Remove(n);
                }
                db.BusModels.Remove(q);
                db.SaveChanges();
            }
        }
    }
}