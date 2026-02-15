const mongoose = require("mongoose");

const geoSchema = new mongoose.Schema(
  {
    lat: {
      type: String,
      required: [true, "address.geo.lat is required"],
      trim: true,
    },
    lng: {
      type: String,
      required: [true, "address.geo.lng is required"],
      trim: true,
    },
  },
  { _id: false }
);

const addressSchema = new mongoose.Schema(
  {
    street: {
      type: String,
      required: [true, "address.street is required"],
      trim: true,
    },
    suite: {
      type: String,
      required: [true, "address.suite is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "address.city is required"],
      trim: true,
      match: [/^[A-Za-z ]+$/, "City must contain only alphabets and spaces"],
    },
    zipcode: {
      type: String,
      required: [true, "address.zipcode is required"],
      trim: true,
      match: [/^\d{5}-\d{4}$/, "Zip code must be in the format DDDDD-DDDD"],
    },
    geo: {
      type: geoSchema,
      required: [true, "address.geo is required"],
    },
  },
  { _id: false }
);

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "company.name is required"],
      trim: true,
    },
    catchPhrase: {
      type: String,
      required: [true, "company.catchPhrase is required"],
      trim: true,
    },
    bs: {
      type: String,
      required: [true, "company.bs is required"],
      trim: true,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      minlength: [4, "Username must have at least 4 characters"],
      maxlength: [100, "Username must have at most 100 characters"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Email must be a valid email address",
      ],
    },
    address: {
      type: addressSchema,
      required: [true, "address is required"],
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
      trim: true,
      match: [/^\d-\d{3}-\d{3}-\d{4}$/, "Phone must be D-DDD-DDD-DDDD"],
    },
    website: {
      type: String,
      required: [true, "website is required"],
      trim: true,
      validate: {
        validator: (value) => {
          try {
            const parsed = new URL(value);
            return parsed.protocol === "http:" || parsed.protocol === "https:";
          } catch (_error) {
            return false;
          }
        },
        message: "Website must be a valid URL starting with http or https",
      },
    },
    company: {
      type: companySchema,
      required: [true, "company is required"],
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("User", userSchema);

