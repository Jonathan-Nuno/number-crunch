import { FormEvent, useState, ChangeEvent, FC } from "react";
import styles from "./index.module.css";

interface DebtFormProps {
  onSubmit: (data: DebtFormData) => void;
}

export interface DebtFormData {
  balance: number;
  interestRate: number;
  minimumPayment: number;
  flatMinimumPayment: boolean;
  extraPayment: number;
}

const DebtForm: FC<DebtFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<DebtFormData>({
    balance: 0,
    interestRate: 0,
    minimumPayment: 0,
    flatMinimumPayment: false,
    extraPayment: 0,
  });

  const handleFlatMinimumPaymentChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      flatMinimumPayment: event.target.value === "true",
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.debtForm}>
      <label className={styles.labelBalance} htmlFor="balance">
        Current Balance:
      </label>
      <input
        className={styles.inputBalance}
        type="text"
        name="balance"
        placeholder="Balance"
        value={formData.balance}
        onChange={(e) =>
          setFormData({ ...formData, balance: Number(e.target.value) })
        }
      />

      <label className={styles.labelInterest} htmlFor="interestRate">
        Interest Rate:{" "}
      </label>
      <input
        className={styles.inputInterest}
        type="text"
        name="interestRate"
        placeholder="Interest Rate"
        value={formData.interestRate}
        onChange={(e) =>
          setFormData({ ...formData, interestRate: Number(e.target.value) })
        }
      />

      <label className={styles.labelMinimum} htmlFor="minimumPayment">
        Minimum Payment:{" "}
      </label>
      {formData.flatMinimumPayment === true ? (
        <input
          className={styles.inputMinimum}
          type="text"
          name="minimumPayment"
          placeholder="Minimum Payment"
          value={formData.minimumPayment}
          onChange={(e) =>
            setFormData({ ...formData, minimumPayment: Number(e.target.value) })
          }
        />
      ) : (
        <input
          className={styles.inputMinimum}
          type="text"
          name="minimumPayment"
          placeholder="Minimum Payment"
          value={Math.max(25, formData.balance * 0.02)}
          disabled
        />
      )}

      <label className={styles.labelFlat}>
        Flat Minimum Payment:
        <input
          type="radio"
          value="true"
          checked={formData.flatMinimumPayment === true}
          onChange={handleFlatMinimumPaymentChange}
        />
        Yes
        <input
          type="radio"
          value="false"
          checked={formData.flatMinimumPayment === false}
          onChange={handleFlatMinimumPaymentChange}
        />
        No
      </label>

      <label className={styles.labelExtra} htmlFor="extraPayment">
        Extra Payment:{" "}
      </label>
      <input
        className={styles.inputExtra}
        type="text"
        name="extraPayment"
        placeholder="Extra Payment"
        value={formData.extraPayment}
        onChange={(e) =>
          setFormData({ ...formData, extraPayment: Number(e.target.value) })
        }
      />
      <button className={styles.buttonSubmit} type="submit">
        Calculate
      </button>
    </form>
  );
};

export default DebtForm;
