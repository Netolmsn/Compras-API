-- CreateTable
CREATE TABLE "itens" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "qtd_atual" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "compras" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "comprador_github_login" TEXT NOT NULL,
    "item_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "compras_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "itens" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
