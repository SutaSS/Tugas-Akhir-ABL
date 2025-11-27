const express = require('express');
const router = express.Router();
const obatController = require('../controllers/obatController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Obat:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - stock
 *         - category
 *       properties:
 *         name:
 *           type: string
 *           description: Nama obat
 *           example: "Paracetamol"
 *         description:
 *           type: string
 *           description: Deskripsi obat
 *           example: "Obat penurun demam dan pereda nyeri"
 *         price:
 *           type: number
 *           description: Harga obat
 *           example: 5000
 *         stock:
 *           type: number
 *           description: Jumlah stok obat
 *           example: 100
 *         category:
 *           type: string
 *           enum: [Tablet, Kapsul, Sirup, Salep, Injeksi, Tetes, Lainnya]
 *           description: Kategori obat
 *           example: "Tablet"
 *         manufacturer:
 *           type: string
 *           description: Nama pabrik pembuat
 *           example: "Kalbe Farma"
 *         expiryDate:
 *           type: string
 *           format: date
 *           description: Tanggal kadaluarsa
 *         isActive:
 *           type: boolean
 *           description: Status aktif obat
 *           example: true
 *       example:
 *         name: "Paracetamol"
 *         description: "Obat penurun demam dan pereda nyeri"
 *         price: 5000
 *         stock: 100
 *         category: "Tablet"
 *         manufacturer: "Kalbe Farma"
 *         isActive: true
 */

/**
 * @swagger
 * /api/medicines:
 *   get:
 *     summary: Mendapatkan semua obat
 *     tags: [Medicines]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter berdasarkan kategori
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Pencarian berdasarkan nama atau deskripsi
 *       - in: query
 *         name: inStock
 *         schema:
 *           type: boolean
 *         description: Filter obat yang tersedia (stok > 0)
 *     responses:
 *       200:
 *         description: Daftar semua obat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: number
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Obat'
 *       500:
 *         description: Server error
 */
router.get('/', obatController.getAllMedicines);

/**
 * @swagger
 * /api/medicines/{id}:
 *   get:
 *     summary: Mendapatkan obat berdasarkan ID
 *     tags: [Medicines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID obat (ObjectId)
 *     responses:
 *       200:
 *         description: Detail obat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Obat'
 *       404:
 *         description: Obat tidak ditemukan
 */
router.get('/:id', obatController.getMedicineById);

/**
 * @swagger
 * /api/medicines/category/{category}:
 *   get:
 *     summary: Mendapatkan obat berdasarkan kategori
 *     tags: [Medicines]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Tablet, Kapsul, Sirup, Salep, Injeksi, Tetes, Lainnya]
 *         description: Kategori obat
 *     responses:
 *       200:
 *         description: Daftar obat berdasarkan kategori
 */
router.get('/category/:category', obatController.getMedicinesByCategory);

/**
 * @swagger
 * /api/medicines/stock/low:
 *   get:
 *     summary: Mendapatkan daftar obat dengan stok rendah
 *     tags: [Medicines]
 *     parameters:
 *       - in: query
 *         name: threshold
 *         schema:
 *           type: number
 *           default: 10
 *         description: Batas stok rendah
 *     responses:
 *       200:
 *         description: Daftar obat dengan stok rendah
 */
router.get('/stock/low', obatController.getLowStockMedicines);

/**
 * @swagger
 * /api/medicines:
 *   post:
 *     summary: Menambahkan obat baru
 *     tags: [Medicines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Obat'
 *     responses:
 *       201:
 *         description: Obat berhasil ditambahkan
 *       400:
 *         description: Validation error
 */
router.post('/', obatController.createMedicine);

/**
 * @swagger
 * /api/medicines/{id}:
 *   put:
 *     summary: Update data obat
 *     tags: [Medicines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Obat'
 *     responses:
 *       200:
 *         description: Obat berhasil diupdate
 *       404:
 *         description: Obat tidak ditemukan
 */
router.put('/:id', obatController.updateMedicine);

/**
 * @swagger
 * /api/medicines/{id}/stock:
 *   patch:
 *     summary: Update stok obat
 *     tags: [Medicines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *               - operation
 *             properties:
 *               quantity:
 *                 type: number
 *                 description: Jumlah stok yang ditambah/dikurangi
 *                 example: 10
 *               operation:
 *                 type: string
 *                 enum: [add, subtract]
 *                 description: Operasi penambahan atau pengurangan stok
 *                 example: "add"
 *     responses:
 *       200:
 *         description: Stok berhasil diupdate
 *       400:
 *         description: Stok tidak mencukupi atau validation error
 */
router.patch('/:id/stock', obatController.updateStock);

/**
 * @swagger
 * /api/medicines/{id}:
 *   delete:
 *     summary: Hapus obat
 *     tags: [Medicines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Obat berhasil dihapus
 *       404:
 *         description: Obat tidak ditemukan
 */
router.delete('/:id', obatController.deleteMedicine);

module.exports = router;
