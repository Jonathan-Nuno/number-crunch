import DebtForm, { DebtFormData } from "../../components/debtForm";
import { useState } from "react";
import styles from "./index.module.css";

interface PaymentInformation {
  totalPaidInterest: number;
  totalPaidPrincipal: number;
  totalPaymentsMade: number;
  totalPaidBalance: number;
}

interface PaymentScheduleItem {
  principalPaid: number;
  interestPaid: number;
  extraPayment: number;
  balance: number;
}

interface ApiResponse {
  paymentInformation: PaymentInformation;
  paymentSchedule: PaymentScheduleItem[];
}

const CalculatorPage = () => {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInformation | null>(
    null
  );
  const [paymentSchedule, setPaymentSchedule] = useState<PaymentScheduleItem[]>(
    []
  );

  const handleSubmit = async (data: DebtFormData) => {
    const response = await fetch("http://localhost:3050/api/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result: ApiResponse = await response.json();
      console.log(JSON.stringify(result), "this is the result");

      setPaymentInfo(result.paymentInformation);
      setPaymentSchedule(result.paymentSchedule);
    }
  };

  return (
    <section className={styles.calculatorSection}>
      <h1>Debt Repayment Calculator</h1>
      <div className={styles.debtFormContainer}>
        <DebtForm onSubmit={handleSubmit} />
      </div>
      {/* Display Payment Information */}
      {paymentInfo && (
        <div>
          <p>Total Paid Interest: {paymentInfo.totalPaidInterest}</p>
          <p>Total Paid Principal: {paymentInfo.totalPaidPrincipal}</p>
          {/* ... */}
        </div>
      )}

      {/* Display Payment Schedule */}
      {paymentSchedule.length > 0 && (
        <ul>
          {paymentSchedule.map((payment, index) => (
            <li key={index}>
              Month {index + 1} - Principal Paid: {payment.principalPaid},
              Interest Paid: {payment.interestPaid}
              {/* ... */}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default CalculatorPage;
