using BusTracker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace BusTracker.Controllers
{
    public class EditController : ApiController
    {
        private DataBaseContext db = new DataBaseContext();

        [HttpPost]
        [Route("api/Edit/SavePost/")]
        public void SavePost()
        {
            var httpContext = HttpContext.Current.Request;
            string busModel=httpContext.Form["busModel"];
            string Azone = httpContext.Form["Azone"];
            string Bzone = httpContext.Form["Bzone"];
            string wight = httpContext.Form["wight"];
            string height = httpContext.Form["height"];
            string arr = httpContext.Form["arr"];

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
    }
}
