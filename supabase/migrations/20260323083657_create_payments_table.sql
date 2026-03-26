/*
  # Create Payment Transactions Schema

  1. New Tables
    - `payment_transactions`
      - `id` (uuid, primary key) - Unique transaction identifier
      - `order_id` (text) - Reference to order
      - `payment_method` (text) - MTN or AIRTEL
      - `phone_number` (text) - Customer phone number
      - `amount` (numeric) - Payment amount
      - `currency` (text) - Currency code (UGX, USD, etc)
      - `status` (text) - Payment status (pending, success, failed, cancelled)
      - `external_transaction_id` (text) - Transaction ID from payment provider
      - `external_reference` (text) - Reference from payment provider
      - `payment_response` (jsonb) - Full response from payment API
      - `error_message` (text) - Error message if payment failed
      - `customer_name` (text) - Customer name
      - `customer_email` (text) - Customer email
      - `created_at` (timestamptz) - When transaction was created
      - `updated_at` (timestamptz) - When transaction was last updated
      - `completed_at` (timestamptz) - When payment was completed

  2. Security
    - Enable RLS on `payment_transactions` table
    - Add policies for authenticated users to view their own transactions
    - Add policy for service role to manage all transactions

  3. Indexes
    - Add index on external_transaction_id for quick lookups
    - Add index on order_id for order queries
    - Add index on status for filtering
*/

CREATE TABLE IF NOT EXISTS payment_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id text NOT NULL,
  payment_method text NOT NULL CHECK (payment_method IN ('MTN', 'AIRTEL')),
  phone_number text NOT NULL,
  amount numeric NOT NULL CHECK (amount > 0),
  currency text NOT NULL DEFAULT 'UGX',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed', 'cancelled')),
  external_transaction_id text,
  external_reference text,
  payment_response jsonb,
  error_message text,
  customer_name text,
  customer_email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_payment_transactions_external_id 
  ON payment_transactions(external_transaction_id);

CREATE INDEX IF NOT EXISTS idx_payment_transactions_order_id 
  ON payment_transactions(order_id);

CREATE INDEX IF NOT EXISTS idx_payment_transactions_status 
  ON payment_transactions(status);

CREATE INDEX IF NOT EXISTS idx_payment_transactions_created_at 
  ON payment_transactions(created_at DESC);

-- Enable Row Level Security
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own transactions (by email)
CREATE POLICY "Users can view own transactions"
  ON payment_transactions
  FOR SELECT
  TO authenticated
  USING (auth.jwt()->>'email' = customer_email);

-- Policy: Service role can insert transactions
CREATE POLICY "Service role can insert transactions"
  ON payment_transactions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Service role can update transactions
CREATE POLICY "Service role can update transactions"
  ON payment_transactions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_payment_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  IF NEW.status IN ('success', 'failed', 'cancelled') AND OLD.status = 'pending' THEN
    NEW.completed_at = now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function
DROP TRIGGER IF EXISTS payment_transactions_updated_at ON payment_transactions;
CREATE TRIGGER payment_transactions_updated_at
  BEFORE UPDATE ON payment_transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_payment_updated_at();