import { Router } from "express";

const router = Router();

router.get("/sender", (req, res) => {
  res.send("This is sender");
});

router.get("/receiver", (req, res) => {
  res.send("This is receiver");
});

export default router;
