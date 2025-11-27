const express = require('express');
const router = express.Router();
const rekamMedisController = require('../controllers/rekamMedisController');

/**
 * @swagger
 * components:
 *   schemas:
 *     RekamMedis:
 *       type: object
 *       required:
 *         - id_pasien
 *         - id_dokter
 *         - id_perawat
 *         - tekanan_darah
 *         - suhu
 *         - berat_badan
 *         - diagnosa
 *       properties:
 *         id_pasien:
 *           type: number
 *           description: ID pasien
 *           example: 12345
 *         id_dokter:
 *           type: string
 *           description: ID dokter (ObjectId)
 *           example: "6747a1b2c3d4e5f6a7b8c9d1"
 *         id_perawat:
 *           type: string
 *           description: ID perawat (ObjectId)
 *           example: "6747a1b2c3d4e5f6a7b8c9d2"
 *         tanggal_periksa:
 *           type: string
 *           format: date-time
 *           description: Tanggal pemeriksaan
 *         tekanan_darah:
 *           type: string
 *           description: Tekanan darah pasien
 *           example: "120/80"
 *         suhu:
 *           type: number
 *           description: Suhu tubuh dalam Celcius
 *           example: 36.5
 *           minimum: 35
 *           maximum: 45
 *         berat_badan:
 *           type: number
 *           description: Berat badan dalam kg
 *           example: 65
 *         diagnosa:
 *           type: string
 *           description: Diagnosa dokter
 *           example: "Flu ringan"
 *         rujukan:
 *           type: string
 *           description: Rujukan ke dokter spesialis (jika ada)
 *           example: null
 *         kontrol_lanjutan:
 *           type: boolean
 *           description: Perlu kontrol lanjutan atau tidak
 *           example: false
 *       example:
 *         id_pasien: 12345
 *         id_dokter: "6747a1b2c3d4e5f6a7b8c9d1"
 *         id_perawat: "6747a1b2c3d4e5f6a7b8c9d2"
 *         tekanan_darah: "120/80"
 *         suhu: 36.5
 *         berat_badan: 65
 *         diagnosa: "Flu ringan"
 *         rujukan: null
 *         kontrol_lanjutan: false
 */

/**
 * @swagger
 * /api/records:
 *   get:
 *     summary: Mendapatkan semua rekam medis
 *     tags: [Medical Records]
 *     responses:
 *       200:
 *         description: Daftar semua rekam medis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: number
 *                   example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RekamMedis'
 *       500:
 *         description: Server error
 */
router.get('/', rekamMedisController.getAllRecords);

/**
 * @swagger
 * /api/records/{id}:
 *   get:
 *     summary: Mendapatkan rekam medis berdasarkan ID
 *     tags: [Medical Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID rekam medis (ObjectId)
 *         example: "6747a1b2c3d4e5f6a7b8c9d0"
 *     responses:
 *       200:
 *         description: Detail rekam medis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/RekamMedis'
 *       404:
 *         description: Rekam medis tidak ditemukan
 *       500:
 *         description: Server error
 */
router.get('/:id', rekamMedisController.getRecordById);

/**
 * @swagger
 * /api/records/patient/{patientId}:
 *   get:
 *     summary: Mendapatkan rekam medis berdasarkan ID pasien
 *     tags: [Medical Records]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: number
 *         description: ID pasien
 *         example: 12345
 *     responses:
 *       200:
 *         description: Daftar rekam medis pasien
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
 *                     $ref: '#/components/schemas/RekamMedis'
 *       500:
 *         description: Server error
 */
router.get('/patient/:patientId', rekamMedisController.getRecordsByPatientId);

/**
 * @swagger
 * /api/records:
 *   post:
 *     summary: Membuat rekam medis baru
 *     tags: [Medical Records]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RekamMedis'
 *     responses:
 *       201:
 *         description: Rekam medis berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/RekamMedis'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/', rekamMedisController.createRecord);

/**
 * @swagger
 * /api/records/{id}:
 *   put:
 *     summary: Update rekam medis
 *     tags: [Medical Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID rekam medis
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RekamMedis'
 *     responses:
 *       200:
 *         description: Rekam medis berhasil diupdate
 *       404:
 *         description: Rekam medis tidak ditemukan
 *       400:
 *         description: Validation error
 */
router.put('/:id', rekamMedisController.updateRecord);

/**
 * @swagger
 * /api/records/{id}:
 *   delete:
 *     summary: Hapus rekam medis
 *     tags: [Medical Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID rekam medis
 *     responses:
 *       200:
 *         description: Rekam medis berhasil dihapus
 *       404:
 *         description: Rekam medis tidak ditemukan
 *       500:
 *         description: Server error
 */
router.delete('/:id', rekamMedisController.deleteRecord);

module.exports = router;
