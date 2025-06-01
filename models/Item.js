import mongoose from "mongoose"

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    contactNumber: {
      type: String,
      required: true,
      validate: {
        validator: (number) => /^[0-9]{10}$/.test(number),
        message: "Contact number must be 10 digits",
      },
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Item || mongoose.model("Item", ItemSchema)
