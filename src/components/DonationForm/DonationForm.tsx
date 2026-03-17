import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './DonationForm.css';

export interface DonationFormData {
  amount: number;
  isCustomAmount: boolean;
  paymentMethod: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface DonationFormProps {
  onSubmit: (data: DonationFormData) => void | Promise<void>;
  presetAmounts?: number[];
  defaultAmount?: number;
  minAmount?: number;
}

export const DonationForm = ({
  onSubmit,
  presetAmounts = [10, 20, 30, 40, 50],
  defaultAmount = 10,
  minAmount = 1,
}: DonationFormProps) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(defaultAmount);
  const [isCustom, setIsCustom] = useState(false);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [customAmountError, setCustomAmountError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DonationFormData>({
    defaultValues: {
      amount: defaultAmount,
      isCustomAmount: false,
      paymentMethod: 'test',
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustom(false);
    setCustomAmount('');
    setCustomAmountError('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setCustomAmountError('');
    
    if (value === '') {
      setIsCustom(false);
      return;
    }
    
    const numValue = parseFloat(value);
    
    if (isNaN(numValue)) {
      setCustomAmountError('Please enter a valid number');
      return;
    }
    
    if (numValue < minAmount) {
      setCustomAmountError(`Minimum donation amount is $${minAmount}`);
      return;
    }
    
    if (numValue > 1000000) {
      setCustomAmountError('Maximum donation amount is $1,000,000');
      return;
    }
    
    setSelectedAmount(numValue);
    setIsCustom(true);
  };

  const onFormSubmit = async (data: DonationFormData) => {
    // Validate custom amount if selected
    if (isCustom && customAmount) {
      const numValue = parseFloat(customAmount);
      if (isNaN(numValue) || numValue < minAmount) {
        setCustomAmountError(`Please enter a valid amount (minimum $${minAmount})`);
        return;
      }
    }
    
    setIsSubmitting(true);
    
    try {
      const finalData: DonationFormData = {
        ...data,
        amount: selectedAmount,
        isCustomAmount: isCustom,
      };
      await onSubmit(finalData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="ul-donation-details-form">
      {/* Amount Selection */}
      <div className="ul-donation-details-donate-form-wrapper">
        <div className="selected-amount">
          <span className="currency">$</span>{' '}
          <span className="number">{selectedAmount.toFixed(2)}</span>
        </div>
        <div className="ul-donate-form">
          {presetAmounts.map((amount) => (
            <div key={amount}>
              <input
                type="radio"
                name="donate-amount"
                id={`donate-amount-${amount}`}
                checked={!isCustom && selectedAmount === amount}
                onChange={() => handleAmountSelect(amount)}
                hidden
              />
              <label
                htmlFor={`donate-amount-${amount}`}
                className="ul-donate-form-label"
              >
                ${amount}
              </label>
            </div>
          ))}

          <div className="custom-amount-wrapper">
            <input
              type="radio"
              name="donate-amount"
              id="custom-amount"
              checked={isCustom}
              onChange={() => setIsCustom(true)}
              hidden
            />
            <label htmlFor="donate-amount-custom" className="ul-donate-form-label">
              <input
                type="number"
                name="custom-amount"
                id="donate-amount-custom"
                placeholder="Custom Amount"
                className={`ul-donate-form-custom-input ${customAmountError ? 'error' : ''}`}
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                min={minAmount}
                step="0.01"
                aria-invalid={!!customAmountError}
                aria-describedby={customAmountError ? 'custom-amount-error' : undefined}
              />
            </label>
            {customAmountError && (
              <span id="custom-amount-error" className="error-message custom-amount-error">
                {customAmountError}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="ul-donation-details-payment-methods">
        <h3 className="ul-donation-details-payment-methods-title">
          Select Payment Method
        </h3>
        <div className="ul-donation-details-payment-methods-form">
          <div className="ul-radio">
            <label htmlFor="method-1">
              <input
                type="radio"
                {...register('paymentMethod')}
                id="method-1"
                value="test"
              />
              <span className="checkmark"></span>
              <span>Test donation</span>
            </label>
          </div>
          <div className="ul-radio">
            <label htmlFor="method-2">
              <input
                type="radio"
                {...register('paymentMethod')}
                id="method-2"
                value="offline"
              />
              <span className="checkmark"></span>
              <span>Offline Donation</span>
            </label>
          </div>
          <div className="ul-radio">
            <label htmlFor="method-3">
              <input
                type="radio"
                {...register('paymentMethod')}
                id="method-3"
                value="credit-card"
              />
              <span className="checkmark"></span>
              <span>Credit Card</span>
            </label>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="ul-donation-details-personal-info">
        <h3 className="ul-donation-details-personal-info-title">Personal Info</h3>
        <p className="ul-donation-details-personal-info-sub-title">
          Your email address will not be published. Required fields are marked *
        </p>
        <div className="ul-donation-details-personal-info-form">
          <div className="row row-cols-2 row-cols-xxs-1 ul-bs-row">
            <div className="col">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="First Name"
                  {...register('firstName', {
                    required: 'First name is required',
                    minLength: {
                      value: 2,
                      message: 'First name must be at least 2 characters',
                    },
                  })}
                />
                {errors.firstName && (
                  <span className="error-message">{errors.firstName.message}</span>
                )}
              </div>
            </div>

            <div className="col">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Last Name"
                  {...register('lastName', {
                    required: 'Last name is required',
                    minLength: {
                      value: 2,
                      message: 'Last name must be at least 2 characters',
                    },
                  })}
                />
                {errors.lastName && (
                  <span className="error-message">{errors.lastName.message}</span>
                )}
              </div>
            </div>

            <div className="col-12">
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />
                {errors.email && (
                  <span className="error-message">{errors.email.message}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="ul-donation-details-form-bottom">
          <button type="submit" className="ul-btn" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="spinner"></span> Processing...
              </>
            ) : (
              <>
                <i className="flaticon-fast-forward-double-right-arrows-symbol"></i>{' '}
                Donate Now
              </>
            )}
          </button>
          <span className="donation-total">
            Donation Total: <span className="number">${selectedAmount.toFixed(2)}</span>
          </span>
        </div>
      </div>
    </form>
  );
};
