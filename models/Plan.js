const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema(

    {
        name:{
            type: String,
            required: [true, "Plan name required"],
            trim: true,
        },
        rate: {
            type: Object,
            required: [true, "Plan rate  required"],
         
        },       
       listing: {
            type: Boolean,
            required: [true, "Listing status required"],
         
        },   
        properties: {
            type: Number,
            required: [true, "Number of properties required"],
         
        },   
        spaces: {
            type: Number,
            required: [true, "Number of space required"],
         
        }, 
        uploadImages: {
            type: Boolean,
            required: [true, "Upload images status required"],
         
        },  
        emailAlerts: {
            type: Boolean,
            required: [true, "email sending status required"],
         
        }, 
        trackViews: {
            type: Boolean,
            required: [true, "Track Views status required"],
         
        },
        receiveBooking: {
            type: Boolean,
            required: [true, "Receive booking status required"],
         
        },   
        idVerification: {
            type: Boolean,
            required: [true, "ID verification status required"],
         
        },    
        processPayments: {
            type: Boolean,
            required: [true, "Payment process status required"],
         
        }, 
        uniqueLinkForExistingTenants: {
            type: Boolean,
            required: [true, "Unique link status required"],
         
        }, 
        uniqueDataInsights: {
            type: Boolean,
            required: [true, "Unique data status required"],
         
        },                           
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }

);

module.exports = mongoose.model('plan', PlanSchema,'plan');