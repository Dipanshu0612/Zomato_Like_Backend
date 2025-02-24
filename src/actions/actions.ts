import { db } from "../db";
import { eq, like, and, desc } from "drizzle-orm";
import {
  users,
  restaurants,
  restaurantLocations,
  owners,
  menuCategories,
  menuItems,
  customizationGroups,
  customizationOptions,
  orders,
  orderItems,
  deliveryPersons,
  deliveries,
  reviews,
  addresses,
  coupons,
  faqs,
} from "../db/schema";


export const userFunctions = {
  async createUser(userData: any) {
    return await db.insert(users).values(userData).returning();
  },

  async getAllUsers() {
    return await db.select().from(users);
  },

  async getUserById(id: string) {
    return await db.select().from(users).where(eq(users.id, id));
  },

  async updateUser(id: string, userData: any) {
    return await db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
  },

  async deleteUser(id: string) {
    return await db.delete(users).where(eq(users.id, id)).returning();
  },

  async createUserOrder( data: any) {
    return await db.insert(orders).values(data);
  },

  async cancelUserOrder(id: string) {
    return await db.delete(orders).where(eq(orders.id, id));
  }
};

export const restaurantFunctions = {
  async getAllRestaurants() {
    return await db.select().from(restaurants);
  },

  async getRestaurantById(id: string) {
    return await db.select().from(restaurants).where(eq(restaurants.id, id));
  },

  async getRestaurantsByOwner(ownerId: string) {
    return await db
      .select()
      .from(restaurants)
      .where(eq(restaurants.ownerId, ownerId));
  },

  async searchRestaurants(query: string) {
    return await db
      .select()
      .from(restaurants)
      .where(like(restaurants.name, `%${query}%`));
  },

  async createRestaurant(restaurantData: any) {
    return await db.insert(restaurants).values(restaurantData).returning();
  },

  async updateRestaurant(
    id: string,
    restaurantData: any
  ) {
    return await db
      .update(restaurants)
      .set(restaurantData)
      .where(eq(restaurants.id, id))
      .returning();
  },

  async deleteRestaurant(id: string) {
    return await db
      .delete(restaurants)
      .where(eq(restaurants.id, id))
      .returning();
  },

  async getActiveRestaurants() {
    return await db
      .select()
      .from(restaurants)
      .where(eq(restaurants.isActive, true));
  },
};

export const menuFunctions = {
  async getAllMenuItems(restaurantId: string) {
    return await db
      .select()
      .from(menuItems)
      .where(eq(menuItems.restaurantId, restaurantId));
  },

  async getMenuItem(id: string) {
    return await db.select().from(menuItems).where(eq(menuItems.id, id));
  },

  async createMenuItem(menuItemData: typeof menuItems.$inferInsert) {
    return await db.insert(menuItems).values(menuItemData).returning();
  },

  async updateMenuItem(
    id: string,
    menuItemData: any
  ) {
    return await db
      .update(menuItems)
      .set(menuItemData)
      .where(eq(menuItems.id, id))
      .returning();
  },

  async deleteMenuItem(id: string) {
    return await db.delete(menuItems).where(eq(menuItems.id, id)).returning();
  },

  async getMenuItemsByCategory(categoryId: string) {
    return await db
      .select()
      .from(menuItems)
      .where(eq(menuItems.category, categoryId));
  },
};

export const orderFunctions = {
  async getAllOrders(limit = 10, offset = 0) {
    return await db.select().from(orders).limit(limit).offset(offset);
  },

  async getOrderById(id: string) {
    return await db.select().from(orders).where(eq(orders.id, id));
  },

  async getUserOrders(userId: string) {
    return await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId))
      .orderBy(desc(orders.createdAt));
  },

  async getRestaurantOrders(restaurantId: string) {
    return await db
      .select()
      .from(orders)
      .where(eq(orders.restaurantId, restaurantId))
      .orderBy(desc(orders.createdAt));
  },

  async createOrder(orderData: typeof orders.$inferInsert) {
    return await db.insert(orders).values(orderData).returning();
  },

  async updateOrderStatus(id: string, status: string) {
    return await db
      .update(orders)
      .set({ orderStatus: status })
      .where(eq(orders.id, id))
      .returning();
  },
};

export const deliveryFunctions = {
  async getAllDeliveries(limit = 10, offset = 0) {
    return await db.select().from(deliveries).limit(limit).offset(offset);
  },

  async getDeliveryById(id: string) {
    return await db.select().from(deliveries).where(eq(deliveries.id, id));
  },

  async getDeliveriesByPerson(deliveryPersonId: string) {
    return await db
      .select()
      .from(deliveries)
      .where(eq(deliveries.deliveryPersonsId, deliveryPersonId));
  },

  async createDelivery(deliveryData: typeof deliveries.$inferInsert) {
    return await db.insert(deliveries).values(deliveryData).returning();
  },

  async updateDeliveryStatus(id: string, status: string) {
    return await db
      .update(deliveries)
      .set({ deliveryStatus: status })
      .where(eq(deliveries.id, id))
      .returning();
  },
};

export const reviewFunctions = {
  async getAllReviews(restaurantId: string) {
    return await db
      .select()
      .from(reviews)
      .where(eq(reviews.restaurantId, restaurantId))
      .orderBy(desc(reviews.createdAt));
  },

  async getUserReviews(userId: string) {
    return await db.select().from(reviews).where(eq(reviews.userId, userId));
  },

  async createReview(reviewData: typeof reviews.$inferInsert) {
    return await db.insert(reviews).values(reviewData).returning();
  },

  async updateReview(
    id: string,
    reviewData: Partial<typeof reviews.$inferInsert>
  ) {
    return await db
      .update(reviews)
      .set(reviewData)
      .where(eq(reviews.id, id))
      .returning();
  },

  async deleteReview(id: string) {
    return await db.delete(reviews).where(eq(reviews.id, id)).returning();
  },
};

export const couponFunctions = {
  async getAllCoupons() {
    return await db.select().from(coupons).where(eq(coupons.isActive, true));
  },

  async getCouponByCode(code: string) {
    return await db
      .select()
      .from(coupons)
      .where(and(eq(coupons.code, code), eq(coupons.isActive, true)));
  },

  async createCoupon(couponData: typeof coupons.$inferInsert) {
    return await db.insert(coupons).values(couponData).returning();
  },

  async deactivateCoupon(id: string) {
    return await db
      .update(coupons)
      .set({ isActive: false })
      .where(eq(coupons.id, id))
      .returning();
  },
};

export const faqFunctions = {
  async getAllFaqs() {
    return await db.select().from(faqs);
  },

  async createFaq(faqData: typeof faqs.$inferInsert) {
    return await db.insert(faqs).values(faqData).returning();
  },

  async updateFaq(id: string, faqData: Partial<typeof faqs.$inferInsert>) {
    return await db
      .update(faqs)
      .set(faqData)
      .where(eq(faqs.id, id))
      .returning();
  },

  async deleteFaq(id: string) {
    return await db.delete(faqs).where(eq(faqs.id, id)).returning();
  },
};


export const analyticsFunctions = {
  async getRestaurantStats(restaurantId: string) {
    const [orderCount, averageOrderValue, totalRevenue] = await Promise.all([
      db
        .select()
        .from(orders)
        .where(eq(orders.restaurantId, restaurantId))
        .then((orders) => orders.length),

      db
        .select()
        .from(orders)
        .where(eq(orders.restaurantId, restaurantId))
        .then((orders) => {
          const total = orders.reduce(
            (sum, order) => sum + Number(order.finalAmount),
            0
          );
          return orders.length ? total / orders.length : 0;
        }),

      db
        .select()
        .from(orders)
        .where(eq(orders.restaurantId, restaurantId))
        .then((orders) =>
          orders.reduce((sum, order) => sum + Number(order.finalAmount), 0)
        ),
    ]);

    return {
      orderCount,
      averageOrderValue,
      totalRevenue,
    };
  },

  async getPopularItems(restaurantId: string, limit = 10) {

    return await db
      .select()
      .from(menuItems)
      .where(eq(menuItems.restaurantId, restaurantId))
      .limit(limit);
  },

  async getUserOrderStats(userId: string) {
    const userOrders = await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId));

    return {
      totalOrders: userOrders.length,
      totalSpent: userOrders.reduce(
        (sum, order) => sum + Number(order.finalAmount),
        0
      ),
      averageOrderValue: userOrders.length
        ? userOrders.reduce((sum, order) => sum + Number(order.finalAmount), 0) /
          userOrders.length
        : 0,
    };
  },
};
