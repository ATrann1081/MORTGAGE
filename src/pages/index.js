import { useForm } from "react-hook-form";
import React, { useState } from "react";
import styles from "@/styles/test.module.scss";

export default function Mortgage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [monthlyPayment, setMonthlyPayment] = useState("");

  const onSubmit = (data) => {
    const personalLoan = parseFloat(data.PersonalLoan); // số tiền vay
    const interestRate = parseFloat(data.InterestRate) / 100; // lãi suất user nhập vào
    const years = parseFloat(data.Years) * 12;
    //parseFloat dùng để chuyển đổi dữ liệu dạng chuỗi sang số thực

    const r = interestRate / 12; //lãi suất mỗi tháng
    const n = years; // thời gian vay

    const numerator = personalLoan * r * Math.pow(1 + r, n); // tử số
    const denominator = Math.pow(1 + r, n) - 1; // mẫu số
    const m = numerator / denominator;

    const result = Math.round(m); //Math.round(m): Làm tròn số
    setMonthlyPayment(result.toLocaleString("en-US"));
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>MORTGAGE</div>
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formContainer}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Loan Amount ($):
                <input
                  className={styles.input}
                  type="number"
                  placeholder="Hãy nhập số tiền muốn vay"
                  {...register("PersonalLoan", {
                    required: "Chưa nhập số tiền vay",
                    min: {
                      value: 100000,
                      message: "Số tiền vay thấp nhất là 100000$",
                    },
                  })}
                />
                <span
                  className={`${styles.error} ${
                    errors.PersonalLoan ? styles.show : ""
                  }`}
                >
                  {errors.PersonalLoan?.message || ""}
                </span>
              </label>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Annual interest rate (%/years)
                <input
                  className={styles.input}
                  type="number"
                  step="0.01"
                  {...register("InterestRate", {
                    required: "Chưa nhập lãi suất",
                    min: {
                      value: 3,
                      message: "Lãi suất tối thiểu là 3%",
                    },
                  })}
                  placeholder="Lãi suất mong muốn"
                />
                <span
                  className={`${styles.error} ${
                    errors.InterestRate ? styles.show : ""
                  }`}
                >
                  {errors.InterestRate?.message || ""}
                </span>
              </label>
            </div>

            <div className={styles.formGroup}></div>
            <label className={styles.label}>
              Loan term (years)
              <input
                className={styles.input}
                type="number"
                step="0.5"
                {...register("Years", {
                  required: "Chưa nhập thời hạn vay",
                  min: {
                    value: 1,
                    message: "Thời hạn vay ít nhất là 1 năm",
                  },
                })}
                placeholder="Hãy nhập số năm"
              />
              <span
                className={`${styles.error} ${errors.Years ? styles.show : ""}`}
              >
                {errors.Years?.message || ""}
              </span>
            </label>
          </div>

          <button className={styles.button} type="submit">
            CALCULATE PAYMENT
          </button>
        </form>

        <div className={styles.resultCard}>
          <p className={styles.card2}>SỐ TIỀN PHẢI TRẢ HÀNG THÁNG</p>

          {monthlyPayment && (
            <p className={`${styles.card3} ${styles.show}`}>
              <strong>{monthlyPayment} $</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
