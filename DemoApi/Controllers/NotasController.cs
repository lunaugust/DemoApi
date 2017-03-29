using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using DemoApi.Models;

namespace DemoApi.Controllers
{
    public class NotasController : ApiController
    {
        private DemoApiContext db = new DemoApiContext();

        // GET: api/Notas
        public IQueryable<Notas> GetNotas()
        {
            return db.Notas;
        }

        // GET: api/Notas/5
        [ResponseType(typeof(Notas))]
        public async Task<IHttpActionResult> GetNotas(int id)
        {
            Notas notas = await db.Notas.FindAsync(id);
            if (notas == null)
            {
                return NotFound();
            }

            return Ok(notas);
        }

        // PUT: api/Notas/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutNotas(int id, Notas notas)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != notas.ID)
            {
                return BadRequest();
            }

            db.Entry(notas).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NotasExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Notas
        [ResponseType(typeof(Notas))]
        public async Task<IHttpActionResult> PostNotas(Notas notas)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Notas.Add(notas);
            await db.SaveChangesAsync();
            
            return CreatedAtRoute("DefaultApi", new { id = notas.ID }, notas);
        }

        // DELETE: api/Notas/5
        [ResponseType(typeof(Notas))]
        public async Task<IHttpActionResult> DeleteNotas(int id)
        {
            Notas notas = await db.Notas.FindAsync(id);
            if (notas == null)
            {
                return NotFound();
            }

            db.Notas.Remove(notas);
            await db.SaveChangesAsync();

            return Ok(notas);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NotasExists(int id)
        {
            return db.Notas.Count(e => e.ID == id) > 0;
        }
    }
}