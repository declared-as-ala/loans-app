const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");
const {
  getAllLoans,
  getUserLoans,
  getExpiredLoans,
  deleteLoan,
} = require("../controllers/loansController");

// Protect all /loans endpoints with auth middleware
router.use("/loans", authMiddleware);

// GET /api/loans => fetch all loans, can be filtered by ?status=pending or ?status=active
router.get("/loans", getAllLoans);

// GET /api/loans/:userEmail/get => fetch user’s loans by email
router.get("/loans/:userEmail/get", getUserLoans);

// GET /api/loans/expired => fetch all loans that have a maturityDate in the past
router.get("/loans/expired", getExpiredLoans);

// DELETE /api/loan/:loanId/delete => only superAdmin can delete
router.delete("/loan/:loanId/delete", allowRoles("superAdmin"), deleteLoan);

module.exports = router;
