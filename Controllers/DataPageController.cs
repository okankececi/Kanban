using KanbanMeeting.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KanbanMeeting.Controllers
{

        public class DataPageController : Controller
    {
        public PCEntities db = new PCEntities();
       KanbanEntities entity = new KanbanEntities();
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Add()
        {
            // Query string'den "date" parametresini al
            string dateParam = Request.QueryString["date"];

            // dateParam'i DateTime tipine çevir (gerekirse uygun formatta)
            DateTime date;
            if (DateTime.TryParse(dateParam, out date))
            {
                // Başarılı bir şekilde çevrildiyse, date'i kullanabilirsiniz.
                var machineSizeInfoList = db.trn_kanban_machine_size_info
                    .Where(item => item.factory_date == date)
                    .ToList();

                var productivityList = db.trn_kanban_productivity
                    .Where(item => item.factory_date == date)
                    .ToList();


                var combinedLossDataList = (from lossSummary in db.trn_kanban_loss_summary
                                            join lossComment in db.trn_kanban_loss_comment
                                            on lossSummary.id equals lossComment.loss_id into commentGroup
                                            from comment in commentGroup.DefaultIfEmpty()
                                            where lossSummary.factory_date == date && (double)(lossSummary.loss_percent ?? 0) > 0.3

                                            orderby lossSummary.loss_percent descending
                                            select new CombinedLossData
                                            {
                                                LossSummary = lossSummary,
                                                LossComment = comment
                                            }).AsEnumerable()
                             .Select(x => new CombinedLossData
                             {
                                 LossSummary = x.LossSummary,
                                 LossComment = x.LossComment ?? new trn_kanban_loss_comment()
                             }).ToList();



                CombinedViewModel viewModel = new CombinedViewModel
                {
                    MachineSizeInfoList = machineSizeInfoList,
                    ProductivityList = productivityList,
                    CombinedLossDataList = combinedLossDataList
                };

                return View(viewModel);
            }
            else
            {
                // Geçerli bir tarih elde edilemediğinde gerekirse bir hata mesajı gösterebilirsiniz.
                ViewData["ErrorMessage"] = "Geçersiz tarih parametresi.";
            }

            // Date parametresi geçerli değilse veya başka bir hata varsa, boş bir model ile view'a git
            return View(new CombinedViewModel());
        }



    }
}