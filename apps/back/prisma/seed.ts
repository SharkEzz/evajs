import { PrismaClient } from '@prisma/client';
import { generatePlayers } from './seeds/players.seed.js';
import { generatePlayersSessionsGamesResults } from './seeds/players-sessions-games-results.seed.js';

const prisma = new PrismaClient();

async function main() {
  const session = await prisma.session.create({
    data: { date: '2024-03-06T19:20:00.000Z' },
    include: { players: true, sessionGames: true },
  }); // Create session

  for (const game of [{ map: 'Polaris' }, { map: 'Artefact' }, { map: 'Atlantis' }, { map: 'Helios' }]) {
    await prisma.sessionGame.create({
      data: {
        map: game.map,
        sessionId: session.id,
      },
    });
  }

  for (const player of generatePlayers()) {
    const dbPlayer = await prisma.player.create({ data: player });
    await prisma.sessionsPlayers.create({ data: { sessionId: session.id, playerUsername: dbPlayer.username } });
  }

  for (const gameResult of generatePlayersSessionsGamesResults()) {
    await prisma.playerSessionGameResult.create({ data: gameResult });
  }
}

try {
  await main();
} catch (error) {
  console.error(error);
} finally {
  await prisma.$disconnect();
}
