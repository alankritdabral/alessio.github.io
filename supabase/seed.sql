-- Comprehensive Seed data for Alessio's Cafe Products
-- This file contains all items from alessios_cafe_menu.md

-- Clear existing products to avoid duplicates if re-running
TRUNCATE TABLE public.products CASCADE;

INSERT INTO public.products (name, description, price, category, image_url, in_stock, discount_percentage, is_active)
VALUES
-- Pizza (Vegetarian)
('Margherita (Medium)', 'Traditional Italian thin-crust pizza with our well-balanced tomato sauce, premium mozzarella, and fresh basil.', 200, 'Pizza', '/images/menu/margherita.jpg', true, 0, true),
('Margherita (Large)', 'Traditional Italian thin-crust pizza with our well-balanced tomato sauce, premium mozzarella, and fresh basil.', 250, 'Pizza', '/images/menu/margherita.jpg', true, 0, true),
('Corn O Mania (Medium)', 'Sweet corn kernels paired with a rich layer of melted mozzarella cheese on our signature thin crust.', 220, 'Pizza', '/images/menu/corn-pizza.jpg', true, 0, true),
('Corn O Mania (Large)', 'Sweet corn kernels paired with a rich layer of melted mozzarella cheese on our signature thin crust.', 270, 'Pizza', '/images/menu/corn-pizza.jpg', true, 0, true),
('Full Call Veg (Medium)', 'A vibrant medley of bell peppers, onions, tomatoes, and mushrooms on our traditional Italian base.', 260, 'Pizza', '/images/menu/veg-pizza.jpg', true, 0, true),
('Full Call Veg (Large)', 'A vibrant medley of bell peppers, onions, tomatoes, and mushrooms on our traditional Italian base.', 320, 'Pizza', '/images/menu/veg-pizza.jpg', true, 0, true),
('Veg Calzone (Medium)', 'Artisanal golden-brown folded pizza crust stuffed with savory seasonal vegetables.', 280, 'Pizza', '/images/menu/calzone.jpg', true, 0, true),
('Veg Calzone (Large)', 'Artisanal golden-brown folded pizza crust stuffed with savory seasonal vegetables.', 360, 'Pizza', '/images/menu/calzone.jpg', true, 0, true),
('Hot Mexicana (Medium)', 'Spicy peppers, onions, and jalapeños for a zesty Mexican-inspired flavor on an Italian thin crust.', 240, 'Pizza', '/images/menu/mexican-pizza.jpg', true, 0, true),
('Hot Mexicana (Large)', 'Spicy peppers, onions, and jalapeños for a zesty Mexican-inspired flavor on an Italian thin crust.', 300, 'Pizza', '/images/menu/mexican-pizza.jpg', true, 0, true),
('Paneer Delight (Medium)', 'Creamy marinated paneer chunks topped with crisp onions and capsicum on our artisan dough.', 260, 'Pizza', '/images/menu/paneer-pizza.jpg', true, 0, true),
('Paneer Delight (Large)', 'Creamy marinated paneer chunks topped with crisp onions and capsicum on our artisan dough.', 320, 'Pizza', '/images/menu/paneer-pizza.jpg', true, 0, true),
('Puttanesca (Medium)', 'Gourmet thin-crust pizza with rich pesto sauce, olives, and premium mozzarella.', 270, 'Pizza', '/images/menu/calzone.jpg', true, 0, true),
('Puttanesca (Large)', 'Gourmet thin-crust pizza with rich pesto sauce, olives, and premium mozzarella.', 330, 'Pizza', '/images/menu/calzone.jpg', true, 0, true),
('Tandoori Paneer (Medium)', 'Spiced tandoori paneer with red onions and a hint of smoky flavor on our signature base.', 270, 'Pizza', '/images/menu/paneer-pizza.jpg', true, 0, true),
('Tandoori Paneer (Large)', 'Spiced tandoori paneer with red onions and a hint of smoky flavor on our signature base.', 330, 'Pizza', '/images/menu/paneer-pizza.jpg', true, 0, true),

-- Pizza (Non-Veg)
('Chicken Fungi (Medium)', 'Tender chicken and earthy mushrooms on our traditional Italian thin-crust base.', 250, 'Pizza', '/images/menu/margherita.jpg', true, 0, true),
('Chicken Fungi (Large)', 'Tender chicken and earthy mushrooms on our traditional Italian thin-crust base.', 300, 'Pizza', '/images/menu/margherita.jpg', true, 0, true),
('BBQ Chicken (Medium)', 'Smoky BBQ sauce drizzled over juicy chicken and crunchy onions on an artisan base.', 250, 'Pizza', '/images/menu/mexican-pizza.jpg', true, 0, true),
('BBQ Chicken (Large)', 'Smoky BBQ sauce drizzled over juicy chicken and crunchy onions on an artisan base.', 300, 'Pizza', '/images/menu/mexican-pizza.jpg', true, 0, true),
('Chicken Calzone (Medium)', 'An artisanal folded pizza delight filled with spicy chicken and melted cheese.', 300, 'Pizza', '/images/menu/calzone.jpg', true, 0, true),
('Chicken Calzone (Large)', 'An artisanal folded pizza delight filled with spicy chicken and melted cheese.', 400, 'Pizza', '/images/menu/calzone.jpg', true, 0, true),
('Hot Shot Chicken (Medium)', 'Extra spicy chicken chunks with jalapeños for a fiery kick on our signature thin crust.', 270, 'Pizza', '/images/menu/margherita.jpg', true, 0, true),
('Hot Shot Chicken (Large)', 'Extra spicy chicken chunks with jalapeños for a fiery kick on our signature thin crust.', 330, 'Pizza', '/images/menu/margherita.jpg', true, 0, true),
('Tandoori Chicken (Medium)', 'Tandoori marinated chicken with Indian spices and red onions on artisan dough.', 260, 'Pizza', '/images/menu/paneer-pizza.jpg', true, 0, true),
('Tandoori Chicken (Large)', 'Tandoori marinated chicken with Indian spices and red onions on artisan dough.', 320, 'Pizza', '/images/menu/paneer-pizza.jpg', true, 0, true),
('Chicken Mexicana (Medium)', 'Spiced chicken with corn and peppers on a traditional style Italian base.', 250, 'Pizza', '/images/menu/mexican-pizza.jpg', true, 0, true),
('Chicken Mexicana (Large)', 'Spiced chicken with corn and peppers on a traditional style Italian base.', 300, 'Pizza', '/images/menu/mexican-pizza.jpg', true, 0, true),

-- Pizza (Regular Pan)
('Corn & Cheese (Regular)', 'Classic pan pizza with extra corn and melted cheese.', 170, 'Pizza', '/images/menu/veg-pizza.jpg', true, 0, true),
('Onion Capsicum (Regular)', 'Fresh onions and crunchy capsicum on a crispy pan crust.', 190, 'Pizza', '/images/menu/corn-pizza.jpg', true, 0, true),
('Garlic Onion Chilli (Regular)', 'A spicy and aromatic blend of garlic, onions, and red chillies.', 190, 'Pizza', '/images/menu/margherita.jpg', true, 0, true),
('Onion & Tomato (Regular)', 'Simple yet delicious combination of onions and tomatoes.', 180, 'Pizza', '/images/menu/margherita.jpg', true, 0, true),
('Paneer & Onion (Regular)', 'Soft paneer cubes and onions on a classic pan base.', 210, 'Pizza', '/images/menu/paneer-pizza.jpg', true, 0, true),
('Chicken & Onion (Regular)', 'Savory chicken pieces and fresh onions for a satisfying bite.', 230, 'Pizza', '/images/menu/margherita.jpg', true, 0, true),

-- Burgers (Free Fries Included)
('Veg Pattie & Cheese Burger', 'Crispy veg patty with cheese and fresh veggies on our in-house handmade bread. Free fries included.', 120, 'Burgers & Wraps', '/images/menu/burger.jpg', true, 0, true),
('Peri Peri Paneer Cheese Burger', 'Spicy peri-peri paneer with cheese and veggies on our in-house handmade bread. Free fries included.', 150, 'Burgers & Wraps', '/images/menu/burger.jpg', true, 0, true),
('Crispy Paneer Cheese Burger', 'Breaded crispy paneer with cheese on our artisanal handmade bread. Free fries included.', 170, 'Burgers & Wraps', '/images/menu/burger.jpg', true, 0, true),
('Chicken BBQ Burger', 'Grilled chicken with smoky BBQ sauce and cheese on our in-house handmade bread. Free fries included.', 180, 'Burgers & Wraps', '/images/menu/burger-alt.jpg', true, 0, true),
('Crispy Chicken Burger', 'Golden fried chicken breast with special mayo on our artisanal handmade bread. Free fries included.', 200, 'Burgers & Wraps', '/images/menu/burger-alt.jpg', true, 0, true),
('Peri Peri Chicken Burger', 'Spicy peri-peri chicken with cheese on our in-house handmade bread. Free fries included.', 180, 'Burgers & Wraps', '/images/menu/burger-alt.jpg', true, 0, true),
('Chicken Pattie Burger', 'Juicy chicken patty with cheese and lettuce on our in-house handmade bread. Free fries included.', 150, 'Burgers & Wraps', '/images/menu/burger-alt.jpg', true, 0, true),
('Egg and Cheese Burger', 'Fluffy egg and melted cheese on our artisanal handmade bread. Free fries included.', 140, 'Burgers & Wraps', '/images/menu/burger-alt.jpg', true, 0, true),

-- Sandwiches (Free Fries Included)
('Freestyle Sandwich', 'Customize your sandwich on our in-house handmade bread. Free fries included.', 140, 'Sandwiches', '/images/menu/sandwich.jpg', true, 0, true),
('Grill Paneer Sandwich', 'Perfectly grilled paneer with spices on our artisanal handmade bread. Free fries included.', 180, 'Sandwiches', '/images/menu/sandwich.jpg', true, 0, true),
('Corn & Cheese Sandwich', 'Sweet corn and gooey cheese between our toasted in-house bread. Free fries included.', 140, 'Sandwiches', '/images/menu/sandwich.jpg', true, 0, true),
('Chicken & Cheese Sandwich', 'Savory chicken and melted cheese on our artisanal handmade bread. Free fries included.', 200, 'Sandwiches', '/images/menu/sandwich.jpg', true, 0, true),
('Egg & Cheese Sandwich', 'Wholesome egg and cheese sandwich on our in-house handmade bread. Free fries included.', 150, 'Sandwiches', '/images/menu/sandwich.jpg', true, 0, true),

-- Pasta (Add Chicken ₹50)
('Aglio e Olio', 'Classic Italian pasta with garlic, extra virgin olive oil, and chili flakes.', 300, 'Pasta & Salads', '/images/menu/pasta.jpg', true, 0, true),
('White Sauce Pasta', 'Rich and creamy bechamel sauce pasta with Italian herbs.', 250, 'Pasta & Salads', '/images/menu/pasta.jpg', true, 0, true),
('Red Sauce Pasta', 'Our well-balanced tangy tomato-based Italian pasta.', 200, 'Pasta & Salads', '/images/menu/pasta.jpg', true, 0, true),
('Mix Sauce Pasta', 'The best of both worlds: red and white sauce combined.', 300, 'Pasta & Salads', '/images/menu/pasta.jpg', true, 0, true),
('Spaghetti Al Polo', 'Spaghetti served with savory chicken pieces and Italian spices.', 330, 'Pasta & Salads', '/images/menu/pasta.jpg', true, 0, true),
('Spaghetti Pesto', 'Fresh basil pesto spaghetti with nuts and parmesan.', 350, 'Pasta & Salads', '/images/menu/pasta.jpg', true, 0, true),

-- Salad Bowl
('Caesar Salad', 'Fresh romaine lettuce, croutons, and Caesar dressing.', 250, 'Pasta & Salads', '/images/menu/salad.jpg', true, 0, true),

-- Sides
('Fries', 'Crispy golden potato fries.', 110, 'Sides & Snacks', '/images/menu/fries.jpg', true, 0, true),
('Homemade Fries', 'Thick hand-cut artisanal potato fries, made fresh in-house.', 150, 'Sides & Snacks', '/images/menu/fries.jpg', true, 0, true),
('Masala Fries', 'Spiced up with our secret masala dust.', 150, 'Sides & Snacks', '/images/menu/fries.jpg', true, 0, true),
('Honey Chilli Potato', 'Crispy potato wedges in a sweet and spicy glaze.', 220, 'Sides & Snacks', '/images/menu/fries.jpg', true, 0, true),
('Homemade Chilli Fries', 'Spicy hand-cut fries with a fiery kick, made in-house.', 250, 'Sides & Snacks', '/images/menu/fries.jpg', true, 0, true),
('Fried Chicken', 'Juicy chicken with a crispy golden coating.', 200, 'Sides & Snacks', '/images/menu/fried-chicken.jpg', true, 0, true),
('Maggie Cheese', 'Classic maggie noodles with extra cheese.', 100, 'Sides & Snacks', '/images/menu/beverage.jpg', true, 0, true),
('Chilli Chicken', 'Spicy Indo-Chinese style chicken.', 300, 'Sides & Snacks', '/images/menu/fried-chicken.jpg', true, 0, true),
('Chilli Paneer', 'Spicy Indo-Chinese style paneer.', 280, 'Sides & Snacks', '/images/menu/fried-chicken.jpg', true, 0, true),
('Chilli Mushroom', 'Spicy Indo-Chinese style mushrooms.', 280, 'Sides & Snacks', '/images/menu/fried-chicken.jpg', true, 0, true),
('Veg Cheese Nuggets', 'Crispy nuggets filled with vegetables and cheese.', 180, 'Sides & Snacks', '/images/menu/fries.jpg', true, 0, true),
('Macaroni', 'Creamy and cheesy macaroni pasta.', 180, 'Sides & Snacks', '/images/menu/pasta.jpg', true, 0, true),
('Fish & Chips', 'Classic battered fish and crispy fries.', 250, 'Sides & Snacks', '/images/menu/fried-chicken.jpg', true, 0, true),
('Momos Veg (Steamed/Fried)', 'Fresh vegetable dumplings, steamed or fried.', 100, 'Sides & Snacks', '/images/menu/beverage.jpg', true, 0, true),
('Momos Chicken (Steamed/Fried)', 'Savory chicken dumplings, steamed or fried.', 150, 'Sides & Snacks', '/images/menu/beverage.jpg', true, 0, true),

-- Wraps
('Chicken and Cheese Wrap', 'Savory chicken and cheese rolled in a soft wrap.', 180, 'Burgers & Wraps', '/images/menu/wrap.jpg', true, 0, true),
('Spicy Paneer Wrap', 'Our signature spicy marinated paneer—a masterclass in localized flavor.', 170, 'Burgers & Wraps', '/images/menu/wrap.jpg', true, 0, true),
('Crispy Chicken Wrap', 'Golden crispy chicken strips with zesty mayo.', 200, 'Burgers & Wraps', '/images/menu/wrap.jpg', true, 0, true),
('Vegetable Wrap', 'A healthy mix of seasonal veggies and light sauces.', 160, 'Burgers & Wraps', '/images/menu/wrap.jpg', true, 0, true),
('Egg Wrap', 'Scrambled eggs and veggies in a toasted wrap.', 150, 'Burgers & Wraps', '/images/menu/wrap.jpg', true, 0, true),
('Chicken Keema Wrap', 'Spiced minced chicken for a rich and hearty meal.', 200, 'Burgers & Wraps', '/images/menu/wrap.jpg', true, 0, true),

-- Breads
('Garlic Bread', 'Classic toasted bread with garlic butter.', 120, 'Breads', '/images/menu/beverage.jpg', true, 0, true),
('Cheese Garlic Bread', 'Garlic bread topped with melted mozzarella.', 170, 'Breads', '/images/menu/beverage.jpg', true, 0, true),
('Stuffed Garlic Bread', 'Bread stuffed with corn and jalapeños.', 220, 'Breads', '/images/menu/beverage.jpg', true, 0, true),
('Stuffed Chicken Bread', 'Bread stuffed with savory spicy chicken.', 250, 'Breads', '/images/menu/beverage.jpg', true, 0, true),

-- Beverages (Cold Coffee)
('Plain Cold Coffee', 'Classic smooth blended chilled coffee.', 120, 'Beverages', '/images/menu/beverage.jpg', true, 0, true),
('Hazelnut Cold Coffee', 'Blended coffee with rich hazelnut flavor.', 140, 'Beverages', '/images/menu/beverage.jpg', true, 0, true),
('Chocolate Cold Coffee', 'Chilled coffee with a chocolatey twist.', 140, 'Beverages', '/images/menu/beverage.jpg', true, 0, true),
('Tiramisu Cold Coffee', 'Italian dessert inspired cold coffee.', 160, 'Beverages', '/images/menu/beverage.jpg', true, 0, true),
('Irish Cold Coffee', 'Blended coffee with a hint of Irish flavor.', 160, 'Beverages', '/images/menu/beverage.jpg', true, 0, true),
('Vanilla Cold Coffee', 'Smooth coffee with a touch of vanilla.', 140, 'Beverages', '/images/menu/beverage.jpg', true, 0, true),

-- Beverages (Shakes)
('Mixberry Shake', 'A berry blast with fresh milk.', 200, 'Beverages', '/images/menu/shake.jpg', true, 0, true),
('Blueberry Shake', 'Sweet and tangy blueberry milk shake.', 170, 'Beverages', '/images/menu/shake.jpg', true, 0, true),
('Butterscotch Shake', 'Creamy shake with butterscotch crunch.', 160, 'Beverages', '/images/menu/shake.jpg', true, 0, true),
('Choco Hazelnut Shake', 'Rich chocolate and hazelnut blend.', 160, 'Beverages', '/images/menu/shake.jpg', true, 0, true),
('Strawberry Shake', 'Classic refreshing strawberry shake.', 150, 'Beverages', '/images/menu/shake.jpg', true, 0, true),
('Mango Shake', 'Seasonal favorite mango milk shake.', 150, 'Beverages', '/images/menu/shake.jpg', true, 0, true),
('KitKat Shake', 'Crunchy KitKat blended in a shake.', 180, 'Beverages', '/images/menu/shake.jpg', true, 0, true),
('Oreo Shake', 'Delicious cookies and cream shake.', 160, 'Beverages', '/images/menu/shake.jpg', true, 0, true),
('Vanilla Shake', 'Classic sweet vanilla milk shake.', 150, 'Beverages', '/images/menu/shake.jpg', true, 0, true),
('Passion Fruit Shake', 'Exotic passion fruit milk shake.', 160, 'Beverages', '/images/menu/shake.jpg', true, 0, true),

-- Beverages (Iced Drinks)
('Green Apple', 'Tangy and crisp green apple cooler.', 140, 'Beverages', '/images/menu/iced-drink.jpg', true, 0, true),
('Mojito (Mint/Strawberry/Mango)', 'Refreshing mocktail with lime and mint.', 120, 'Beverages', '/images/menu/iced-drink.jpg', true, 0, true),
('Blue Lagoon', 'Chilling blue citrus mocktail.', 150, 'Beverages', '/images/menu/iced-drink.jpg', true, 0, true),
('Watermelon Hit', 'Fresh and fruity watermelon cooler.', 150, 'Beverages', '/images/menu/iced-drink.jpg', true, 0, true),
('Bubblegum Blast', 'Sweet and fun bubblegum flavored drink.', 150, 'Beverages', '/images/menu/iced-drink.jpg', true, 0, true),
('Fruit Beer Malt', 'Non-alcoholic malted fruit beer.', 160, 'Beverages', '/images/menu/iced-drink.jpg', true, 0, true),
('Iced Tea (Peach/Lemon)', 'Refreshing chilled tea with fruit notes.', 140, 'Beverages', '/images/menu/iced-tea.jpg', true, 0, true),
('Lemon Cooler', 'Sweet or salty refreshing lemon cooler.', 80, 'Beverages', '/images/menu/iced-drink.jpg', true, 0, true),
('Passion Fruit Blast', 'Intense passion fruit flavored iced drink.', 160, 'Beverages', '/images/menu/iced-drink.jpg', true, 0, true),

-- Beverages (Coffee & Tea)
('Cappuccino', 'Classic hot coffee with frothed milk.', 130, 'Beverages', '/images/menu/beverage.jpg', true, 0, true),
('Cafe Latte', 'Smooth hot coffee with steamed milk.', 140, 'Beverages', '/images/menu/beverage.jpg', true, 0, true),
('Americano', 'Rich espresso with hot water.', 100, 'Beverages', '/images/menu/beverage.jpg', true, 0, true),
('Cafe Mocha', 'Espresso with chocolate and steamed milk.', 150, 'Beverages', '/images/menu/beverage.jpg', true, 0, true),
('Expresso Shot', 'Pure intense coffee hit.', 70, 'Beverages', '/images/menu/beverage.jpg', true, 0, true),
('Coffee of Day', 'Our special brewed coffee for today.', 60, 'Beverages', '/images/menu/beverage.jpg', true, 0, true),
('Ginger Tea', 'Authentic Indian ginger brew.', 25, 'Beverages', '/images/menu/beverage.jpg', true, 0, true),
('Cardmom Tea', 'Fragrant cardamom infused Indian tea.', 30, 'Beverages', '/images/menu/beverage.jpg', true, 0, true),
('Chocholate Tea', 'Rich chocolate flavored tea.', 50, 'Beverages', '/images/menu/beverage.jpg', true, 0, true),
('Black Tea', 'Classic pure black tea.', 20, 'Beverages', '/images/menu/beverage.jpg', true, 0, true),
('Masala Tea', 'Spiced aromatic Indian tea.', 30, 'Beverages', '/images/menu/beverage.jpg', true, 0, true),
('Green Tea', 'Healthy and refreshing green tea.', 50, 'Beverages', '/images/menu/beverage.jpg', true, 0, true);
