using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BusTracker.Models;
using System.Web.Script.Serialization;

namespace BusTracker.Controllers
{
    public class HomeController : Controller
    {
        private DataBaseContext db = new DataBaseContext();

        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public void Post(string busModel, string num, string top, string left)
        {
            var q = (from c in db.BusModels where c.ModelOfBus == busModel select c).FirstOrDefault();
            if (q == null)
            {
                int id = db.BusModels.Count() == 0 ? 1 : db.BusModels.ToList().Last().BusModelId + 1;
                db.BusModels.Add(new BusModel() { ModelOfBus = busModel, BusModelId = id });
                int a = 0;
                for (int i = 0; i < num.Length; i++)
                {
                    if (num[i] == ',')
                        a++;
                }
                for (int i = 0; i <= a; i++)
                {
                    db.Seats.Add(new Seat() { BusModelId = id, SeatNumber = Convert.ToInt32(num.Split(',')[i]), Top = top.Split(',')[i], Left = left.Split(',')[i] });
                }
                db.SaveChanges();
            }
            else
                Put(busModel, num, top, left);
        }
        public void Put(string busModel, string num, string top, string left)
        {
            var q = (from c in db.BusModels where c.ModelOfBus == busModel select c).FirstOrDefault();
            if (q != null)
            {
                q.Seats = (from c in db.Seats where c.BusModelId == q.BusModelId select c).ToList();
                int a = 0;
                for (int i = 0; i < num.Length; i++)
                {
                    if (num[i] == ',')
                        a++;
                }
                for (int i = 0; i <= a; i++)
                {
                    var st = (from c in q.Seats where c.SeatNumber == Convert.ToInt32(num.Split(',')[i]) select c).FirstOrDefault();
                    st.Top = top.Split(',')[i];
                    st.Left = left.Split(',')[i];
                }
                db.SaveChanges();
            }
        }
        [HttpDelete]
        public void Delete(int Id)
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

        public ActionResult Choice()
        {
            ViewBag.ModelOfBus = new SelectList(db.BusModels, "BusModelId", "ModelOfBus");
            return View();
        }
        [HttpPost]
        public void ForChoice(string Id)
        {
            if (Id != null && Id != String.Empty)
            {
                int n = Convert.ToInt32(Id);
                BusModel bm = db.BusModels.Find(n);
                bm.Seats = (from c in db.Seats where c.BusModelId == n select c).ToList();
                List<object> sts = new List<object>();
                foreach (var c in bm.Seats)
                {
                    sts.Add(new { SeatNumber = c.SeatNumber, Top = c.Top, Left = c.Left });
                }
                JavaScriptSerializer js = new JavaScriptSerializer();
                string seats = js.Serialize(sts);
                Response.Write(seats);
                Response.Flush();
                Response.End();
            }
            else
            {
                Response.Write("");
                Response.Flush();
                Response.End();
            }
        }
    }
}