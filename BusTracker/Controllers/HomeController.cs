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
        public ActionResult Qwerty()
        {
            return PartialView();
        }
        [Authorize]
        public ActionResult Edit()
        {
            return PartialView();
        }

        [HttpPost]
        public void SavePost(string busModel, string Azone, string Bzone, string wight, string height, string arr)
        {
            bool[,] seatsarr = new bool[Convert.ToInt32(wight), Convert.ToInt32(height)];
            int a = 0;
            for (int i = 0; i < Convert.ToInt32(wight); i++)
            {
                for (int j = 0; j < Convert.ToInt32(height); j++)
                {
                    seatsarr[i, j] = Convert.ToBoolean(arr.Split(',')[a]);
                    a++;
                }
            }
            var q = (from c in db.BusModels where c.ModelOfBus == busModel select c).FirstOrDefault();
            if (q == null)
            {
                int id = db.BusModels.Count() == 0 ? 1 : db.BusModels.ToList().Last().BusModelId + 1;
                db.BusModels.Add(new BusModel { BusModelId = id, ModelOfBus = busModel, Wigth = Convert.ToInt32(wight), Height = Convert.ToInt32(height), Azone = Convert.ToInt32(Azone), Bzone = Convert.ToInt32(Bzone) });
                for (int i = 0; i < Convert.ToInt32(wight); i++)
                {
                    for (int j = 0; j < Convert.ToInt32(height); j++)
                    {
                        if (seatsarr[i, j])
                        {
                            db.Seats.Add(new Seat() { BusModelId = id, Left = j.ToString(), Top = i.ToString() });
                        }
                    }
                }
                db.SaveChanges();
            }
        }
        [Authorize(Roles="Hauler")]
        public ActionResult Models()
        {
            ViewBag.ModelOfBus = new SelectList(db.BusModels, "BusModelId", "ModelOfBus");
            return PartialView();
        }

        [HttpPost]
        public void ModelReturn(string Id)
        {
            if (Id != null && Id != String.Empty)
            {
                int n = Convert.ToInt32(Id);
                BusModel bm = db.BusModels.Find(n);
                var res = new {Azone = bm.Azone, Bzone = bm.Bzone, Wigth = bm.Wigth, Height = bm.Height };
                JavaScriptSerializer js = new JavaScriptSerializer();
                string model = js.Serialize(res);
                Response.Write(model);
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
        [HttpPost]
        public void SeatsReturn(string Id)
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
                JavaScriptSerializer js = new JavaScriptSerializer();
                string model = js.Serialize(res);
                Response.Write(model);
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

    //[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    //public class HaulerOnlyAttribute : AuthorizeAttribute
    //{
    //    public HaulerOnlyAttribute()
    //    {
    //        this.Roles = "Hauler";
    //    }
    //    protected override bool AuthorizeCore(HttpContextBase httpContext)
    //    {
    //        Microsoft.AspNet.Identity.UserManager<Microsoft.AspNet.Identity.EntityFramework.IdentityUser> a =
    //            new Microsoft.AspNet.Identity.UserManager<Microsoft.AspNet.Identity.EntityFramework.IdentityUser>(new Microsoft.AspNet.Identity.EntityFramework.UserStore<Microsoft.AspNet.Identity.EntityFramework.IdentityUser>(new AuthContext()));
    //        return true;
    //    }
    //}
}