insert into brands (name)
values
	('QuantumScape'),
	('StellarLuxe'),
	('ZenVista'),
	('NovaBloom'),
	('VelocityVibe'),
	('RadiantPulse'),
	('UrbanHarbor'),
	('InfinitiSync'),
	('ElementalSculpt'),
	('NexusNest');
	
-- Insert statements for 'categories' table
INSERT INTO public.categories ("name") VALUES 
    ('Electronics'),
    ('Home and Kitchen Appliances'),
    ('Fashion'),
    ('Outdoor Gear'),
    ('Health and Wellness'),
    ('Toys and Games'),
    ('Automotive Accessories'),
    ('Beauty and Personal Care'),
    ('Pet Supplies'),
    ('Sports Equipment');

-- Insert statements for 'subcategories' table
INSERT INTO subcategories ("name", category_id) VALUES
    ('Smartphones', 1),
    ('Wearable Devices', 1),
    ('Coffee Makers', 2),
    ('Air Purifiers', 2),
    ('Athletic Shoes', 3),
    ('Sunglasses', 3),
    ('Camping Equipment', 4),
    ('Hiking Backpacks', 4),
    ('Fitness Trackers', 5),
    ('Herbal Supplements', 5),
    ('Board Games', 6),
    ('Remote Control Toys', 6),
    ('Car Floor Mats', 7),
    ('Bike Racks', 7),
    ('Skincare Products', 8),
    ('Hair Styling Tools', 8),
    ('Cat Toys', 9),
    ('Dog Grooming Tools', 9),
    ('Tennis Rackets', 10),
    ('Yoga Mats', 10);

INSERT INTO public.product_status_types ("name", label)
VALUES 
    ('DRAFT', 'Draft'),
    ('PUBLISHED', 'Published'),
    ('ARCHIVED', 'Archived');