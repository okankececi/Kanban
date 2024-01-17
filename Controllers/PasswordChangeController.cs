using KanbanMeeting.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KanbanMeeting.Controllers
{
    public class PasswordChangeController : Controller
    {
        // GET: PasswordChange
        KanbanEntities entity = new KanbanEntities();
        public ActionResult Index()
        {
            string personelId = Convert.ToString(Session["EmployeeId"]);

            if (personelId == null)
            {
                return RedirectToAction("Index", "Login");
            }

            var personel = (from p in entity.mst_user where p.worker_code == personelId select p).FirstOrDefault();
            ViewBag.authorization_id = null;
            ViewBag.mesaj = null;
            ViewBag.sitil = null;

            return View(personel);
        }

        [HttpPost]
        public ActionResult Index(Guid id, string password, string newPassword, string newPasswordCheck)
        {
            var personel = (from p in entity.mst_user where p.id == id select p).FirstOrDefault();

            if (password != personel.password)
            {
                ModelState.AddModelError("password", "Eski parolanızı yanlış girdiniz.");
                return View(personel);
            }

            if (newPassword != newPasswordCheck)
            {
                ModelState.AddModelError("newPasswordCheck", "Yeni parola uyuşmuyor.");
                return View(personel);
            }

            personel.password = newPassword;
            personel.new_user_id = false;
            entity.SaveChanges();

            TempData["bilgi"] = personel.worker_name;
            ViewBag.mesaj = "Parolanız başarıyla değiştirildi.";
            ViewBag.sitil = "alert alert-success";
            ViewBag.yetkiTurId = personel.authorization_id;

            return RedirectToAction("Index");
        }
    }
}