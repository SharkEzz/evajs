import type { Prisma } from '@prisma/client';

const results: Prisma.PlayerSessionGameResultCreateInput[] = [
  {
    sessionGame: {
      connect: { id: 1 },
    },
    player: {
      connect: {
        playerTag: 'DIDOU#63166',
      },
    },
    kills: 8,
    deaths: 6,
    assists: 0,
    hasWon: false,
  },
  {
    sessionGame: {
      connect: { id: 2 },
    },
    player: {
      connect: {
        playerTag: 'DIDOU#63166',
      },
    },
    kills: 9,
    deaths: 12,
    assists: 1,
    hasWon: false,
  },
  {
    sessionGame: {
      connect: { id: 3 },
    },
    player: {
      connect: {
        playerTag: 'DIDOU#63166',
      },
    },
    kills: 11,
    deaths: 7,
    assists: 4,
    hasWon: true,
  },
  {
    sessionGame: {
      connect: { id: 4 },
    },
    player: {
      connect: {
        playerTag: 'DIDOU#63166',
      },
    },
    kills: 9,
    deaths: 6,
    assists: 1,
    hasWon: false,
  },
  {
    sessionGame: {
      connect: { id: 1 },
    },
    player: {
      connect: {
        playerTag: 'KERO#32085',
      },
    },
    kills: 11,
    deaths: 6,
    assists: 2,
    hasWon: true,
  },
  {
    sessionGame: {
      connect: { id: 2 },
    },
    player: {
      connect: {
        playerTag: 'KERO#32085',
      },
    },
    kills: 8,
    deaths: 6,
    assists: 0,
    hasWon: true,
  },
  {
    sessionGame: {
      connect: { id: 3 },
    },
    player: {
      connect: {
        playerTag: 'KERO#32085',
      },
    },
    kills: 8,
    deaths: 6,
    assists: 0,
    hasWon: false,
  },
  {
    sessionGame: {
      connect: { id: 4 },
    },
    player: {
      connect: {
        playerTag: 'KERO#32085',
      },
    },
    kills: 8,
    deaths: 6,
    assists: 0,
    hasWon: true,
  },
];

export function generatePlayersSessionsGamesResults() {
  return results;
}
