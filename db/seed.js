import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createFiles } from "./queries/file.js";
import { createFolders } from "./queries/folder.js";

async function seed() {
  for (let i = 0; (i < 3); i++) {
    const folderName = faker.lorem.words({ min: 1, max: 4 });
    const createdFolder = await createFolders({ name: folderName });
    const folder_id = createdFolder.id;

    // create a empty array to store the files
    for (let j = 0; (j < 5); j++) {
      const fileName = faker.lorem.words({ min: 1, max: 5 });
      const size = faker.number.int({ min: 1, max: 100 });

      await createFiles({ name: fileName, size, folder_id });
    }
  }
}
await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");
