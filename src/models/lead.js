import pool from "../config/database.js";

export const createLead = async ({ name, mobile, email, city, source }) => {
  const query = `
    INSERT INTO brochure_leads (name, mobile, email, city, source)
    VALUES (?, ?, ?, ?, ?)
  `;

  await pool.execute(query, [name, mobile, email, city, source]);
};
