CREATE TABLE enum_status (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  description TEXT
);

CREATE TABLE enum_category (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name TEXT
);

CREATE TABLE user (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  email TEXT,
  login TEXT,
  hashed_password TEXT,
  is_admin BOOLEAN
);

CREATE TABLE branch (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  owner_id INTEGER,
  name TEXT,
  slogan TEXT,
  phone_number TEXT,
  description TEXT,
  status_id INTEGER,
  image_base64 MEDIUMTEXT,
  price_low INTEGER,
  price_high INTEGER,
  category_id INTEGER,
  opening_time TIME,
  closing_time TIME,
  FOREIGN KEY (status_id) REFERENCES enum_status(id),
  FOREIGN KEY (category_id) REFERENCES enum_category(id),
  FOREIGN KEY (owner_id) REFERENCES user(id)
);

CREATE TABLE branch_location (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  branch_id INTEGER,
  street TEXT,
  city TEXT,
  building_number INTEGER,
  distance_from_university INTEGER,
  FOREIGN KEY (branch_id) REFERENCES branch(id)
);

CREATE TABLE coupon (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  branch_id INTEGER,
  title TEXT,
  description TEXT,
  lifespan TIME,
  FOREIGN KEY (branch_id) REFERENCES branch(id)
);

CREATE TABLE coupon_code (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  coupon_id INTEGER,
  code TEXT,
  created_at DATETIME,
  FOREIGN KEY (coupon_id) REFERENCES coupon(id)
);
