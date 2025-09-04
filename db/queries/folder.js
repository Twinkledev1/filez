import db from "#db/client";


export async function createFolders({ name }) {
  try {
    const sql = `
  insert into folders(name)
  values($1)
  returning * `;
    const values = [name];

    const res = await db.query(sql, values);
    return res.rows[0];
  } catch (error) {
    console.error("Error creating files", error);
    throw error;
  }
}