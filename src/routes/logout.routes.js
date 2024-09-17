// routes/api/logout.js
import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
    res.clearCookie('jwt_ttimer'); // Ajusta según el nombre de tu cookie
    res.status(200).json({ message: 'Logged out successfully' });
});

export default router;
