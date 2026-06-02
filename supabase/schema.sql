-- Database Schema for Alessio's Cafe

-- 1. Create tables

-- Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamptz DEFAULT now(),
    name text NOT NULL,
    description text,
    price numeric NOT NULL,
    image_url text,
    category text NOT NULL,
    in_stock boolean DEFAULT true,
    discount_percentage integer DEFAULT 0,
    is_active boolean DEFAULT true
);

-- Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamptz DEFAULT now(),
    status text DEFAULT 'pending' NOT NULL,
    total_amount numeric NOT NULL,
    customer_details jsonb NOT NULL,
    payment_id text,
    receipt_url text
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamptz DEFAULT now(),
    order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
    quantity integer NOT NULL,
    price_at_time numeric NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies

-- Products: Public read, Authenticated (Admin) write
CREATE POLICY "Products are viewable by everyone" 
ON public.products FOR SELECT 
USING (true);

CREATE POLICY "Products are manageable by admins" 
ON public.products FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Orders: Public insert (for checkout), Authenticated (Admin) read/update
CREATE POLICY "Orders can be created by anyone" 
ON public.orders FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Orders are viewable by admins" 
ON public.orders FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Orders can be updated by admins" 
ON public.orders FOR UPDATE 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Order Items: Public insert, Authenticated (Admin) read
CREATE POLICY "Order items can be created by anyone" 
ON public.order_items FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Order items are viewable by admins" 
ON public.order_items FOR SELECT 
TO authenticated 
USING (true);

-- 4. Enable Realtime for Orders
-- Note: You may need to enable this in the Supabase Dashboard under Database -> Replication -> supabase_realtime
-- Or run this if your publication exists:
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
