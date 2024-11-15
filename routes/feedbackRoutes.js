import { createAdmin, createAlumni, createStudent, getAllUsers } from "../controllers/userController.js";
import { createCompany, getCompanies } from "../controllers/companyController.js";
import { createReview, getAllReviews } from "../controllers/reviewController.js";
import { likeReviews } from "../controllers/likeController.js";
import { isAdmin } from "../middleware/Middleware.js";

import express from "express";
const router = express.Router(); // Corrected initialization

// Routes for user actions
router.post("/admin/create", createAdmin);
router.post("/student/create", createStudent); // Lowercase path
router.post("/alumni/create", createAlumni);

// Routes for company actions
router.post("/company/create", isAdmin, createCompany); // Middleware applied
router.get("/company/get", getCompanies);

// Routes for review actions
router.post("/review/create", createReview);
router.get("/review/get", getAllReviews);

// Route for liking reviews
router.post("/like/add", likeReviews);

// Routes for fetching user data
router.get("/user/get", getAllUsers);

export default router;
