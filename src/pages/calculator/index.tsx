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
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: DebtFormData) => {
    setError(null);

    try {
      const apiUrl = (
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3050"
      ).replace(/\/$/, "");
      const response = await fetch(`${apiUrl}/api/calculate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(10_000),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(result?.error ?? "The calculation request failed");
      }

      const result: ApiResponse = await response.json();

      setPaymentInfo(result.paymentInformation);
      setPaymentSchedule(result.paymentSchedule);
    } catch (requestError) {
      setPaymentInfo(null);
      setPaymentSchedule([]);
      setError(
        requestError instanceof Error
          ? requestError.message
          : "The calculation request failed"
      );
    }
  };

  return (
    <section className={styles.calculatorSection}>
      <h1>Debt Repayment Calculator</h1>
      <div className={styles.debtFormContainer}>
        <DebtForm onSubmit={handleSubmit} />
      </div>
      {error && <p role="alert">{error}</p>}
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
