import { useForm } from "react-hook-form";
import React, { useState } from "react";
import styles from "@/styles/test.module.scss";

export default function Mortgage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // câu hỏi: tại sao lại cần setMonthlyPayment
  // Trong React, monthlyPayment là một state, và setMonthlyPayment(...) chính là hàm duy nhất để thay đổi giá trị của state đó.
  // Nếu bạn chỉ "in trực tiếp" giá trị kết quả ra ngoài mà không dùng setMonthlyPayment, thì giao diện (UI) sẽ không tự động render lại.
  // Lý do: React quản lý vòng đời component dựa trên state và props.
  // Khi state thay đổi thông qua hàm setter (setMonthlyPayment), React sẽ biết rằng component cần render lại và cập nhật UI

  const [monthlyPayment, setMonthlyPayment] = useState("");

  // cú pháp const [giáTrịHiệnTại, hàmCậpNhật] = useState(giáTrịBanĐầu);
  //monthlyPayment	Biến chứa giá trị kết quả hiện tại
  //setMonthlyPayment(...)	Cập nhật lại kết quả và render lại giao diện
  //useState("")	Tạo state, với giá trị khởi đầu là rỗng

  const onSubmit = (data) => {
    // data là object chứa dữ liệu từ form
    // do react-hook-form thu thập được sau khi người dùg nhấn submit.

    const personalLoan = parseFloat(data.PersonalLoan); // số tiền vay
    const interestRate = parseFloat(data.InterestRate) / 100; // lãi suất user nhập vào
    const years = parseFloat(data.Years) * 12;
    //parseFloat dùng để chuyển đổi dữ liệu dạng chuỗi sang số thực

    const r = interestRate / 12; //lãi suất mỗi tháng
    const n = years; // thời gian vay

    const numerator = personalLoan * r * Math.pow(1 + r, n); // tử số
    const denominator = Math.pow(1 + r, n) - 1; // mẫu số
    const m = numerator / denominator;

    // setMonthlyPayment(formatter.format(result));
    // result được tính xong thì truyền vào setMonthlyPayment(...).
    // setMonthlyPayment sẽ cập nhật state monthlyPayment.
    // Khi state monthlyPayment thay đổi, React sẽ render lại component, lúc này giá trị mới sẽ được hiển thị

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
                    // `${...}` cho phép chèn giá trị JS vào trong chuỗi.
                    errors.InterestRate ? styles.show : ""
                  }`}
                >
                  {errors.InterestRate?.message || ""}

                  {/* Đây là biểu thức JSX (chèn JavaScript vào trong HTML-like JSX).
                  errors.InterestRate?.message dùng optional chaining (?.):
                        Nếu errors.InterestRate tồn tại → lấy thuộc tính message.
                        Nếu không tồn tại (undefined/null) → không báo lỗi, trả về undefined.
                  || "": nếu kết quả là undefined hoặc rỗng → hiển thị "" (chuỗi rỗng). */}
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

        {/* <div className={styles.resultCard}>
          <p className={styles.card2}>SỐ TIỀN PHẢI TRẢ HÀNG THÁNG</p>
          <p className={styles.card3}>
            <strong> {monthlyPayment} $</strong>
          </p>
        </div> */}
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
