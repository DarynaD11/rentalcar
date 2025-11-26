"use client";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import css from "./FormOrder.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    date: yup
      .date()
      .required("Booking date is required")
      .min(new Date(), "Date cannot be in the past")
      .typeError("Invalid date format"),
    comment: yup.string().optional(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function FormOrder() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      comment: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    toast.success("Booking request sent successfully!");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <h3 className={css.title}>Book your car now</h3>
      <p className={css.text}>
        Stay connected! We are always ready to help you.
      </p>
      <div className={css.box}>
        <div>
          <input
            {...register("name")}
            type="text"
            placeholder="Name*"
            className={errors.name ? css.inputError : css.input}
          />
          {errors.name && (
            <span className={css.errorText}>{errors.name.message}</span>
          )}
        </div>

        <div>
          <input
            {...register("email")}
            type="email"
            placeholder="Email*"
            className={errors.email ? css.inputError : css.input}
          />
          {errors.email && (
            <span className={css.errorText}>{errors.email.message}</span>
          )}
        </div>

        <div>
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DatePicker
                placeholderText="Booking date"
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="dd.MM.yyyy"
                minDate={new Date()}
                className={errors.date ? css.inputError : css.input}
                onFocus={(e) => e.target.blur()}
                popperPlacement="bottom"
              />
            )}
          />
          {errors.date && (
            <span className={css.errorText}>{errors.date.message}</span>
          )}
        </div>

        <div>
          <textarea
            {...register("comment")}
            placeholder="Comment"
            className={css.textarea}
            rows={3}
          />
        </div>
      </div>
      <button type="submit" className={css.submitBtn}>
        Send
      </button>
    </form>
  );
}
