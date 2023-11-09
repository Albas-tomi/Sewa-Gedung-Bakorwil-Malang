import mongoose from "mongoose";

const Payment = new mongoose.Schema({
  name: String,
  bca_va_number: { type: String, require: true },
  fraud_status: { type: String, require: true },
  order_id: { type: String, require: true },
  payment_type: { type: String, require: true },
  status_message: { type: String, require: true },
  payment_id: { type: String, require: true },
  transaction_status: { type: String, require: true },
  transaction_time: { type: Date, require: true },
  gross_amount: Number,
  va_numbers: [Object],
});

export default mongoose.model("Payment", Payment);
