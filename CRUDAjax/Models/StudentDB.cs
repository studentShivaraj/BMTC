using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace CRUDAjax.Models
{
    public class StudentDB
    {
        string cs = ConfigurationManager.ConnectionStrings["CRUDAjax"].ConnectionString;

        //Return list of all Employees
        public List<Student> GetAll()
        {
            List<Student> lst = new List<Student>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("SelectStudent", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new Student
                    {
                        USN = Convert.ToInt16(rdr["USN"]),
                        Name = rdr["Name"].ToString(),
                        Course = rdr["Course"].ToString(),
                        DOB = Convert.ToDateTime(rdr["DOB"]),
                      
                        Email = rdr["Email"].ToString(),
                        Contact = rdr["Contact"].ToString(),
                    });
                }
                return lst;
            }
        }



        //Add students
        public int Add(Student sdt)
          {
            int i;
            using(SqlConnection con=new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("InsertUpdateStudent", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", sdt.USN);
                com.Parameters.AddWithValue("@Name", sdt.Name);
                com.Parameters.AddWithValue("@Course", sdt.Course);
                com.Parameters.AddWithValue("@DOB", sdt.DOB);
                com.Parameters.AddWithValue("@Email", sdt.Email);
                com.Parameters.AddWithValue("@Contact", sdt.Contact);
                com.Parameters.AddWithValue("@Action", "Insert");
                i = com.ExecuteNonQuery();
            }
            return i;
        }


        public int Update(Student sdt)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("InsertUpdateStudent", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", sdt.USN);
                com.Parameters.AddWithValue("@Name", sdt.Name);
                com.Parameters.AddWithValue("@Course", sdt.Course);
                com.Parameters.AddWithValue("@DOB", sdt.DOB);
                com.Parameters.AddWithValue("@Email", sdt.Email);
                com.Parameters.AddWithValue("@Contact", sdt.Contact);
                com.Parameters.AddWithValue("@Action", "Update");
                i = com.ExecuteNonQuery();
            }
            return i;
        }

        //Method for Deleting an Employee
        public int Delete(int Id)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("DeleteStudent", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", Id);
                i = com.ExecuteNonQuery();
            }
            return i;
        }


    }
}