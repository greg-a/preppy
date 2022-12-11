-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('Low', 'Medium', 'High');

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "description" VARCHAR(255),
    "note" VARCHAR(255),
    "imageUrl" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShoppingListItem" (
    "id" SERIAL NOT NULL,
    "note" VARCHAR(255),
    "priority" "Priority" DEFAULT 'Low',
    "quantity" INTEGER DEFAULT 1,
    "maxPrice" INTEGER,
    "minPrice" INTEGER,
    "complete" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "itemId" INTEGER NOT NULL,
    "shoppingListId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ShoppingListItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShoppingList" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "description" VARCHAR(255),
    "complete" BOOLEAN DEFAULT false,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShoppingList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShoppingList_userId_key" ON "ShoppingList"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingListItem" ADD CONSTRAINT "ShoppingListItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingListItem" ADD CONSTRAINT "ShoppingListItem_shoppingListId_fkey" FOREIGN KEY ("shoppingListId") REFERENCES "ShoppingList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingListItem" ADD CONSTRAINT "ShoppingListItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingList" ADD CONSTRAINT "ShoppingList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
