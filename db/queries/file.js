import db from "#db/client";


export async function createFiles({ name, size, folder_id }) {
  try {
    const sql = `
  insert into files(name, size, folder_id)
  values($1,$2,$3)
  returning * `;
    const values = [name, size, folder_id];

    const res = await db.query(sql, values);
    return res.rows[0];
  } catch (error) {
    console.error("Error creating files", error);
    throw error;
  }
}