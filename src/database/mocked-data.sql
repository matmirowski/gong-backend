INSERT INTO enum_status (description) VALUES
('Potwierdzony'),
('Odrzucony'),
('Oczekujący');

INSERT INTO enum_category (name) VALUES
('Restauracja'),
('Kino'),
('Teatr'),
('Kręgielnia'),
('Bilard'),
('Kawiarnia'),
('Muzeum'),
('Fitness');


INSERT INTO user (email, login, hashed_password, is_admin) VALUES
('szymon@gmail.com', 'szymon', '47125e61b755006853889b6f7ed0725d9cdc44622ee246fbb2c4e1f745d0a478', TRUE),
('mateusz@gmail.com', 'mateusz', 'd318886e395b925e63a8084e2bf1596a5d99713e4d1559a2913e71e9a7808c70', FALSE),
('kacper@gmail.com', 'kacper', 'a1ee5cc8628b0eb3a1eb8e285095d7e9a07daa5d348924d7133bebba9b018c1e', FALSE);

INSERT INTO branch (owner_id, name, slogan, phone_number, description, status_id, image_base64, price_low, price_high, category_id, opening_time, closing_time) VALUES
(1, 'Java Cafe', 'Twoja codzienna dawka kofeiny', '123-456-7890', 'Popularna kawiarnia z szeroką gamą kaw i ciast.', 1, '', 10, 50, 1, '08:00:00', '22:00:00'),
(2, 'Tech Gadgets', 'Zainnowuj swoje życie', '321-654-0987', 'Sklep z najnowszą techniką i gadżetami.', 1, '', 50, 500, 2, '09:00:00', '21:00:00'),
(3, 'Art Gallery', 'Odkryj piękno sztuki', '555-123-4567', 'Galeria prezentująca dzieła lokalnych i międzynarodowych artystów.', 1, '', 20, 200, 7, '10:00:00', '18:00:00'),
(1, 'Super Gym', 'Twój nowy wymiar fitness', '321-987-6543', 'Nowoczesne centrum fitness z profesjonalnym sprzętem i osobistymi trenerami.', 1, '', 15, 100, 8, '05:00:00', '23:00:00'),
(3, 'The Book Worm', 'Escape in Pages', '777-888-9999', 'Cozy bookstore offering a wide range of titles and genres.', 3, '', 5, 40, 1, '09:00:00', '20:00:00'),
(2, 'Gamer’s Den', 'Live the Game', '888-999-7777', 'Ultimate destination for gamers - latest titles, accessories, and gaming setups.', 1, '', 30, 300, 2, '10:00:00', '00:00:00'),
(1, 'Urban Eats', 'Dine in Style', '999-777-8888', 'Modern restaurant serving urban cuisine with a local twist.', 2, '', 20, 150, 1, '12:00:00', '23:00:00');

INSERT INTO branch_location (branch_id, street, city, building_number, distance_from_university) VALUES
(1, 'Main St', 'Techville', 101, 500),
(2, 'Second St', 'Innovate City', 202, 1500),
(3, 'Third St', 'Artstown', 303, 250),
(4, 'Fitness Blvd', 'Health City', 404, 800),
(5, 'Literature Lane', 'Booktown', 505, 350),
(6, 'Arcade Ave', 'Gameville', 606, 1200),
(7, 'Gourmet Street', 'Foodcity', 707, 550);

INSERT INTO coupon (branch_id, title, description, lifespan) VALUES
(1, 'Wiosenna Promocja', '20% zniżki na wszystkie napoje espresso!', '04:00:00'),
(2, 'Fest Tech', '10% zniżki przy zakupie powyżej $100', '06:00:00'),
(3, 'Art Lovers Discount', '15% zniżki na wszystkie wydruki artystyczne', '07:00:00'),
(4, 'Healthy Start', '25% zniżki na wszystkie karnety miesięczne', '08:00:00');

INSERT INTO coupon_code (coupon_id, code, created_at) VALUES
(1, 'ESP2024', NOW()),
(2, 'TECH10', NOW()),
(3, 'ART2024', NOW()),
(4, 'FIT2024', NOW());