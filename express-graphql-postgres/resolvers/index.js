const jwt = require("jsonwebtoken");
const { getClient } = require("../db");
const { calculateDistance } = require("../shared/utils");

const resolvers = {
  Query: {
    users: async (_, { page, limit }) => {
      const offset = (page - 1) * limit;
      const query = {
        text: `SELECT * FROM public.user LIMIT $1 OFFSET $2`,
        values: [limit, offset],
      };
      const client = await getClient();
      const result = await client.query(query);
      return result.rows.map((row) => ({
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name,
        gender: row.gender,
      }));
    },

    findUsers: async (_, { radius }) => {
      const query = {
        text:
          "SELECT public.user.*, public.user_tracking.lat, public.user_tracking.lng FROM public.user INNER JOIN public.user_tracking ON public.user.id = public.user_tracking.user_id",
      };
      const client = await getClient();
      const result = await client.query(query);
      const usersWithLocation = result.rows.map((row) => {
        const { id, first_name, last_name, gender, lat, lng } = row;
        const location = { lat, lng };
        return {
          firstName: first_name,
          lastName: last_name,
          id,
          gender,
          location,
        };
      });
      return usersWithLocation.filter(
        (user) => calculateDistance(user.location) <= radius
      );
    },
  },

  Mutation: {
    login: (_, { email, password }) => {
      if (email === "admin" && password === "admin") {
        const token = jwt.sign({ email }, "secretkey");
        return token;
      } else {
        throw new Error("Invalid credentials");
      }
    },
  },
};

module.exports = { resolvers };
