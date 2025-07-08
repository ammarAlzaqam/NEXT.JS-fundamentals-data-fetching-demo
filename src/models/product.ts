import {
  Schema,
  InferSchemaType,
  Document,
  Model,
  models,
  model,
} from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

type ProductSchemaType = InferSchemaType<typeof productSchema>;
export interface ProductDocument extends Document, ProductSchemaType {}
interface ProductModel extends Model<ProductDocument> {}

const Product =
  (models.Product as ProductModel) ||
  model<ProductDocument, ProductModel>("Product", productSchema);

export default Product;
