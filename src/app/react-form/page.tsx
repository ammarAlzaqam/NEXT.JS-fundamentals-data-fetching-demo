"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
export default function CreateProductForm() {
  const [loading, setLoading] = useState(false);

  const formik = useProductFormik(setLoading);
  return (
    <section className="h-screen flex justify-center items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-gray-800 px-5 py-8 sm:p-14 rounded-lg shadow-lg shadow-[#fffbf25b] space-y-5 w-full mx-3 sm:max-w-xl sm:mx-0"
      >
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            className="block bg-white w-full outline-none p-2 text-gray-800 rounded-md focus:bg-amber-50"
          />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            className="block bg-white w-full outline-none p-2 text-gray-800 rounded-md focus:bg-amber-50"
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            rows={5}
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            className="block bg-white w-full outline-none p-2 text-gray-800 rounded-md focus:bg-amber-50"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`text-center mt-5 w-full bg-blue-500 text-white p-1 cursor-pointer hover:bg-cyan-600 transition rounded-sm ${
            loading && "bg-gray-700 hover:bg-gray-800"
          }`}
        >
          {loading ? <div className="flex justify-center items-center"><i className="animate-spin w-6 h-6 rounded-full border-2 border-t-transparent border-white"></i> </div>: "Submit"} 
        </button>
      </form>
    </section>
  );
}

const useProductFormik = (setLoading: Dispatch<SetStateAction<boolean>>) => {
  const router = useRouter();
  return useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      price: Yup.number()
        .typeError("Price must be a number")
        .positive("Price must be greater than 0")
        .required("Price is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);

        const response = await fetch("http://localhost:3000/react-form/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        if (!response.ok)
          return toast.error(data.message || "Something went wrong");
        toast.success(data.message);
        resetForm();
        router.replace("/products-db");
      } catch (e) {
        if (e instanceof Error) toast.error(e.message);
        console.log(e);
      } finally {
        setLoading(false);
      }
    },
  });
};
