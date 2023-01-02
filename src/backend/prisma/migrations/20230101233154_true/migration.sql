/*
  Warnings:

  - Added the required column `name` to the `ShoppingListItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ShoppingListItem" DROP CONSTRAINT "ShoppingListItem_itemId_fkey";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "category" VARCHAR(80);

-- AlterTable
ALTER TABLE "ShoppingListItem" ADD COLUMN     "name" VARCHAR(80) NOT NULL,
ALTER COLUMN "itemId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ShoppingListItem" ADD CONSTRAINT "ShoppingListItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
