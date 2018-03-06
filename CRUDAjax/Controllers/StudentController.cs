using CRUDAjax.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRUDAjax.Controllers
{
    public class StudentController : Controller
    {
        StudentDB db = new StudentDB();
       

        public JsonResult Add(Student sdt)
        {
            return Json(db.Add(sdt), JsonRequestBehavior.AllowGet);
        }

        public JsonResult List()
        {
            return Json(db.GetAll(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyID(int ID)
        {
            var Student = db.GetAll().Find(x => x.USN.Equals(ID));
            return Json(Student, JsonRequestBehavior.AllowGet);
        }


        public JsonResult Update(Student stu)
        {
            return Json(db.Update(stu), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int Id)
        {
            return Json(db.Delete(Id), JsonRequestBehavior.AllowGet);
        }

    }
}
