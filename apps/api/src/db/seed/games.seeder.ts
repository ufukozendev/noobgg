import { db } from "../index"; // adjust if your db export path differs
import { gamesTable } from "../schemas/games.drizzle";
import { generateSnowflakeId } from "../../utils/id-generator";

/*
 Simple seeder script for the `games` table.
 Usage (bun):
   bun run ts-node src/db/seed/games.seeder.ts
 or wire it in package.json scripts.
*/

async function seedGames() {
  // check if table already has data
  const existing = await db.select().from(gamesTable).limit(1);
  if (existing.length > 0) {
    console.log("Games already exist. Skipping seeder.");
    return;
  }

  const rows = [
    {
      id: generateSnowflakeId(),
      name: "League of Legends",
      description: "5v5 MOBA by Riot Games",
      logo: "https://example.com/logos/lol.png",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: generateSnowflakeId(),
      name: "Valorant",
      description: "Tactical FPS by Riot Games",
      logo: "https://example.com/logos/valorant.png",
      createdAt: new Date(Date.now() - 60_000), // 1 min earlier
      updatedAt: new Date(Date.now() - 60_000),
    },
  ];

  await db.insert(gamesTable).values(rows);

  console.log(`Seeded ${rows.length} games.`);
}

seedGames()
  .then(() => {
    console.log("Games seeding complete.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error seeding games:", err);
    process.exit(1);
  });
