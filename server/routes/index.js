const path = require(`path`);
const router = require(`express`).Router();
const apiRoutes = require(`./api`);

// API routes
router.use(`/api`, apiRoutes);

// Redirect to React app if no API is hit
router.use((req, res) => {
    res.sendFile(path.join(__dirname, `../../build/index.html`));
});

module.exports = router;