/*
  Warnings:

  - You are about to drop the column `maxPrice` on the `ShoppingListItem` table. All the data in the column will be lost.
  - You are about to drop the column `minPrice` on the `ShoppingListItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ShoppingListItem" DROP COLUMN "maxPrice",
DROP COLUMN "minPrice",
ADD COLUMN     "purchasePrice" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");
