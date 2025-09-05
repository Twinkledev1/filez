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


export async function getFolderByIdIncludingFiles(id) {
    try {
      const sql = `SELECT 
      f.id,
      f.name,
      COALESCE(json_agg(
          json_build_object(
              'id', fi.id,
              'name', fi.name,
              'size', fi.size
          )
      ) FILTER (WHERE fi.id IS NOT NULL), '[]') AS files
  FROM folders f
  LEFT JOIN files fi ON f.id = fi.folder_id
  WHERE f.id = $1
  GROUP BY f.id, f.name; `;
      const res = await db.query(sql, [id]);
      return res.rows[0];
    } catch (error) {
      console.error("Error getting folder by id", error);
      throw error;
    }
  }