import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
  numeric,
  foreignKey,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  username: text("username").notNull(),
  phoneNumber: text("phone_number"),
  password: text("password").notNull(),
  profilePicture: text("profile_picture"),
  defaultAddress: text("default_address"),
  savedAddresses: text("saved_addresses").array(),
  isPremiumMember: boolean("is_premium_member").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const restaurants = pgTable("restaurants", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  ownerId: text("owner_id").notNull(),
  images: text("images").array(),
  serviceType: text("service_type").array(),
  cuisineTypes: text("cuisine_types").array(),
  ratingAverage: numeric("rating_average"),
  ratingCount: integer("rating_count"),
  minimumOrder: numeric("minimum_order"),
  deliveryFee: numeric("delivery_fee"),
  deliveryTime: integer("delivery_time"),
  operatingHours: jsonb("operating_hours"),
  isVerified: boolean("is_verified").default(false),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const restaurantLocations = pgTable("restaurant_locations", {
  id: text("id").primaryKey(),
  restaurantId: text("restaurant_id")
    .notNull()
    .references(() => restaurants.id),
  addressLine1: text("address_line1").notNull(),
  addressLine2: text("address_line2"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  postalCode: text("postal_code").notNull(),
  country: text("country").notNull(),
  deliveryRadius: numeric("delivery_radius"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const owners = pgTable("owners", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phoneNumber: text("phone_number"),
  restaurantId: text("restaurant_id").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const menuCategories = pgTable("menu_categories", {
  id: text("id").primaryKey(),
  restaurantId: text("restaurant_id")
    .notNull()
    .references(() => restaurants.id),
  name: text("name").notNull(),
  description: text("description"),
  displayOrder: integer("display_order"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const customizationGroups = pgTable("customization_groups", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  minSelections: integer("min_selections"),
  maxSelections: integer("max_selections"),
  isRequired: boolean("is_required").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const menuItems = pgTable("menu_items", {
  id: text("id").primaryKey(),
  restaurantId: text("restaurant_id")
    .notNull()
    .references(() => restaurants.id),
  name: text("name").notNull(),
  description: text("description"),
  price: numeric("price").notNull(),
  category: text("category").references(() => menuCategories.id),
  cuisineType: text("cuisine_type"),
  isVeg: boolean("is_veg").default(false),
  isAvailable: boolean("is_available").default(true),
  preparationTime: integer("preparation_time"),
  images: text("images").array(),
  customizationGroups: text("customization_groups").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const customizationOptions = pgTable("customization_options", {
  id: text("id").primaryKey(),
  groupId: text("group_id")
    .notNull()
    .references(() => customizationGroups.id),
  name: text("name").notNull(),
  priceAddition: numeric("price_addition"),
  isAvailable: boolean("is_available").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  restaurantId: text("restaurant_id")
    .notNull()
    .references(() => restaurants.id),
  items: text("items").array(),
  totalAmount: numeric("total_amount").notNull(),
  deliveryFee: numeric("delivery_fee"),
  taxes: numeric("taxes"),
  discountAmount: numeric("discount_amount"),
  finalAmount: numeric("final_amount").notNull(),
  paymentMethod: text("payment_method"),
  paymentStatus: varchar("payment_status", { length: 50 }),
  orderStatus: varchar("order_status", { length: 50 }),
  deliveryAddress: text("delivery_address"),
  specialInstructions: text("special_instructions"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: text("id").primaryKey(),
  orderId: text("order_id")
    .notNull()
    .references(() => orders.id),
  menuItemId: text("menu_item_id")
    .notNull()
    .references(() => menuItems.id),
  quantity: integer("quantity").notNull(),
  unitPrice: numeric("unit_price").notNull(),
  customizations: jsonb("customizations"),
  itemTotal: numeric("item_total").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const deliveryPersons = pgTable("delivery_persons", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  phoneNumber: text("phone_number"),
  email: text("email"),
  vehicleType: text("vehicle_type"),
  vehicleNumber: text("vehicle_number"),
  isActive: boolean("is_active").default(true),
  currentLocation: jsonb("current_location"),
  averageRating: numeric("average_rating"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const deliveries = pgTable("deliveries", {
  id: text("id").primaryKey(),
  orderId: text("order_id")
    .notNull()
    .references(() => orders.id),
  deliveryPersonsId: text("delivery_persons_id").references(
    () => deliveryPersons.id
  ),
  pickupTime: timestamp("pickup_time"),
  deliveryTime: timestamp("delivery_time"),
  deliveryStatus: varchar("delivery_status", { length: 50 }),
  liveLocation: jsonb("live_location"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  restaurantId: text("restaurant_id")
    .notNull()
    .references(() => restaurants.id),
  orderId: text("order_id").references(() => orders.id),
  rating: numeric("rating").notNull(),
  content: text("content"),
  images: text("images").array(),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const addresses = pgTable("addresses", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  type: varchar("type", { length: 50 }),
  addressLine1: text("address_line1").notNull(),
  addressLine2: text("address_line2"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  postalCode: text("postal_code").notNull(),
  country: text("country").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const coupons = pgTable("coupons", {
  id: text("id").primaryKey(),
  code: text("code").notNull(),
  description: text("description"),
  discountType: varchar("discount_type", { length: 50 }),
  discountAmount: numeric("discount_amount"),
  minimumOrderAmount: numeric("minimum_order_amount"),
  maxDiscount: numeric("max_discount"),
  validFrom: timestamp("valid_from"),
  validUntil: timestamp("valid_until"),
  isActive: boolean("is_active").default(true),
  usageLimit: integer("usage_limit"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const faqs = pgTable("faqs", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
});
