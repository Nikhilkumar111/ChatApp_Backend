import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text: {
      type: String,
      trim: true,
      maxlength: 20000, // text can include emojis ✅
    },

    image: {
      type: String,
    },

    pdf: {
      type: String, // ✅ Added PDF URL support
    },

    emoji: {
      type: String,
      default: "", // single emoji (optional)
    },

    reactions: [
      {
        emoji: { type: String, required: true }, // e.g. "😂"
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
      
    ],
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
