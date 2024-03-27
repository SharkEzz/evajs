import type { Prisma } from '@prisma/client';

const players: Prisma.PlayerCreateInput[] = [
  {
    firstName: 'Tristan',
    lastName: 'DIDA',
    bestDamageInflicted: 2168,
    bestKillStreak: 9,
    username: 'Didou',
    playerTag: 'DIDOU#63166',
  },
  {
    firstName: 'Alexis',
    lastName: 'LOUIS',
    bestDamageInflicted: 1645,
    bestKillStreak: 8,
    username: 'Kero',
    playerTag: 'KERO#32085',
    isJVS: false,
  },
  // {
  //   firstName: 'Mathis',
  //   lastName: 'AIT BRAHAM',
  //   bestDamageInflicted: 1283,
  //   bestKillStreak: 4,
  //   username: 'RaiiDen',
  //   playerTag: 'RaiiDen#32126',
  // },
  // {
  //   firstName: 'Raphaël',
  //   lastName: 'ROUSSEAU',
  //   username: 'Unknoon',
  //   isJVS: false,
  // },
  // {
  //   firstName: 'Steven',
  //   lastName: 'MENUEL',
  //   bestDamageInflicted: 1549,
  //   bestKillStreak: 5,
  //   username: 'MrAngelos6',
  //   playerTag: 'MRANGELOS6#86159',
  // },
] as const;

export function generatePlayers() {
  return players;
}
