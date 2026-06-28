/*
  Warnings:

  - You are about to alter the column `password` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(150)` to `VarChar(60)`.

*/
-- AlterTable
ALTER TABLE `usuario` MODIFY `password` VARCHAR(60) NOT NULL;
