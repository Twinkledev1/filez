import db from "#db/client";

export async function createFolders({ name }) {
  try {
    const sql = `
  insert into folders(name)
  values($1)
  returning * `;
    const values = [name];

    const res = await db.query(sql, values);
    return res.rows;
  } catch (error) {
    console.error("Error creating files", error);
    throw error;
  }
}

export async function getFolders() {
  try {
    const sql = `select * from folders; `;
    const res = await db.query(sql);
    return res.rows;
  } catch (error) {
    console.error("Error getting folders", error);
    throw error;
  }
}
