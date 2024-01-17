using KanbanMeeting.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KanbanMeeting.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public KanbanEntities entity= new KanbanEntities();
        public ActionResult Index()
        {

            ViewBag.message = null;
            return View();
        }
        [HttpPost]
        public ActionResult Index(string id, string password)
        {
            
            var personel = (from p in entity.mst_user where p.worker_code == id && p.password == password && p.enable_flg == true select p).FirstOrDefault();

            if (personel != null)
            {
                if (personel.enable_flg == true)
                {
                    Session["EmployeeGuid"] = personel.id;
                    Session["EmployeeNameSurname"] = personel.worker_name;
                    Session["EmployeeId"] = personel.worker_code;
                    Session["UserLoggedIn"] = true;
                    return RedirectToAction("Index", "Home"); // Başka bir işlemi yönlendiriyoruz.
                }
                else
                {

                    return RedirectToAction("Index");
                }
            }
            else
            {

                ViewBag.message = "Invalid user ID or password.";
                return View();
            }

        }


    }
}
