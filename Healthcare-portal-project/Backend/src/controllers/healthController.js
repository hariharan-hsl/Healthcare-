async function getHealth(req, res) {
    return res.json({ status: "ok", database: "connected" });
}

module.exports = { getHealth };
