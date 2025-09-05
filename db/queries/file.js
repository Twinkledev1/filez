import db from "#db/client";

export async function createFiles({ name, size, folder_id }) {
  try {
    const sql = `
  insert into files(name, size, folder_id)
  values($1,$2,$3)
  returning * `;
    const values = [name, size, folder_id];

    const res = await db.query(sql, values);
    return res.rows;
  } catch (error) {
    console.error("Error creating files", error);
    throw error;
  }
}

export async function getFiles() {
  try {
    const sql = `select id,name, size, (select name from folders where id = folder_id) as folder_name from files f; `;
    const res = await db.query(sql);
    return res.rows;
  } catch (error) {
    console.error("Error getting files", error);
    throw error;
  }
}
