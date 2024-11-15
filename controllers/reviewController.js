import ReviewModel from "../models/Review.js";
import Company from '../models/Company.js';

export const createReview = async (req, res) => {
    try {
        const { company, email, reviews } = req.body;

        // Find the company information based on the name
        const companyInfo = await Company.findOne({ name: company });

        if (!companyInfo) {
            return res.status(404).json({ message: "Company not found" });
        }

        // Create the review object
        const reviewObj = new ReviewModel({
            company: companyInfo.id,
            email,
            reviews,
        });

        // Save the review
        const savedReviews = await reviewObj.save();

        // Update the company's reviews array with the new review ID
        const updatedCompany = await Company.findByIdAndUpdate(
            companyInfo.id,
            { $push: { reviews: savedReviews._id } },
            { new: true }
        ).populate("reviews")
          .exec();

        // Send the updated company information as a response
        res.json({ company: updatedCompany });

    } catch (error) {
        res.status(500).json({ message: "Error while adding review" });
    }
};

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await ReviewModel.find();
        res.json({ reviews });
    } catch (error) {
        return res.status(400).json({
            error: "Error while fetching reviews",
        });
    }
};
