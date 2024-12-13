class CarValidator {
  static schema = {
    brand: {
      trim: true,
      isLength: {
        options: {
          min: 3,
          max: 20,
        },
        errorMessage: "Brand must be between 3 and 20 characters long",
      },
      escape: true,
    },
    model: {
      trim: true,
      isLength: {
        options: {
          minLength: 3,
          maxLength: 20,
        },
        errorMessage: "Model must be between 3 and 20 characters long",
      },
      escape: true,
    },
    year_of_production: {
      trim: true,
      isInt: {
        options: {
          min: 1901,
        },
        errorMessage: "Year of production must be minimum 1901",
      },
    },
    plate_number: {
      trim: true,
      isLength: {
        options: {
          minLength: 5,
          maxLength: 20,
        },
        errorMessage: "Plate number must be between 5 and 20 characters long",
      },
      escape: true,
    },
  }
}

export default CarValidator
