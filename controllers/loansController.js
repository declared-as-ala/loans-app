const path = require("path");
const fs = require("fs");

// Read loan data from JSON
const loansFilePath = path.join(__dirname, "../data/loans.json");
let loanData = JSON.parse(fs.readFileSync(loansFilePath, "utf-8"));

exports.getAllLoans = (req, res) => {
  const userRole = req.user.role;
  const { status } = req.query; // e.g. ?status=pending or ?status=active

  let results = [...loanData];

  if (status) {
    results = results.filter((loan) => loan.status === status);
  }

  // If role is staff, remove applicant.totalLoan
  if (userRole === "staff") {
    results = results.map((loan) => {
      const { applicant, ...rest } = loan;
      // remove totalLoan from applicant
      const { totalLoan, ...applicantWithoutTotal } = applicant;
      return {
        ...rest,
        applicant: applicantWithoutTotal,
      };
    });
  }

  return res.status(200).json({ loans: results });
};

exports.getUserLoans = (req, res) => {
  const userRole = req.user.role;
  const userEmail = req.params.userEmail;

  let userLoans = loanData.filter((loan) => loan.applicant.email === userEmail);

  if (userRole === "staff") {
    userLoans = userLoans.map((loan) => {
      const { applicant, ...rest } = loan;
      const { totalLoan, ...applicantWithoutTotal } = applicant;
      return {
        ...rest,
        applicant: applicantWithoutTotal,
      };
    });
  }

  return res.status(200).json({ loans: userLoans });
};

exports.getExpiredLoans = (req, res) => {
  const now = new Date();

  // Compare "maturityDate" to the current date
  const expiredLoans = loanData.filter((loan) => {
    const maturity = new Date(loan.maturityDate);
    return maturity < now; // maturity date in the past
  });

  // If staff role, hide totalLoan
  if (req.user.role === "staff") {
    const sanitized = expiredLoans.map((loan) => {
      const { applicant, ...rest } = loan;
      const { totalLoan, ...applicantWithoutTotal } = applicant;
      return { ...rest, applicant: applicantWithoutTotal };
    });
    return res.status(200).json({ loans: sanitized });
  }

  return res.status(200).json({ loans: expiredLoans });
};

exports.deleteLoan = (req, res) => {
  const { loanId } = req.params;

  // Remove the loan with the given ID
  const index = loanData.findIndex((loan) => loan.id === loanId);
  if (index === -1) {
    return res.status(404).json({ message: "Loan not found" });
  }

  loanData.splice(index, 1);

  // Overwrite the JSON file with updated data
  fs.writeFileSync(loansFilePath, JSON.stringify(loanData, null, 2), "utf-8");

  return res.status(200).json({ message: "Loan deleted successfully" });
};
