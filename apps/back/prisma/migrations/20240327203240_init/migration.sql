-- CreateTable
CREATE TABLE "Player" (
    "username" TEXT NOT NULL PRIMARY KEY,
    "playerTag" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "bestKillStreak" INTEGER,
    "bestDamageInflicted" INTEGER,
    "isJVS" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SessionsPlayers" (
    "playerUsername" TEXT NOT NULL,
    "sessionId" INTEGER NOT NULL,

    PRIMARY KEY ("playerUsername", "sessionId"),
    CONSTRAINT "SessionsPlayers_playerUsername_fkey" FOREIGN KEY ("playerUsername") REFERENCES "Player" ("username") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SessionsPlayers_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SessionGame" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionId" INTEGER NOT NULL,
    "map" TEXT NOT NULL,
    CONSTRAINT "SessionGame_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PlayerSessionGameResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionGameId" INTEGER NOT NULL,
    "playerUsername" TEXT NOT NULL,
    "hasWon" BOOLEAN NOT NULL,
    "kills" INTEGER NOT NULL,
    "deaths" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    CONSTRAINT "PlayerSessionGameResult_sessionGameId_fkey" FOREIGN KEY ("sessionGameId") REFERENCES "SessionGame" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlayerSessionGameResult_playerUsername_fkey" FOREIGN KEY ("playerUsername") REFERENCES "Player" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_playerTag_key" ON "Player"("playerTag");
