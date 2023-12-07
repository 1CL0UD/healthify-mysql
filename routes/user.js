export async function getUsers() {
  const [rows] = await pool.query('SELECT * FROM user');
  return rows;
}

export async function getUserById(id) {
  const [rows] = await pool.query(
    `
  SELECT * 
  FROM user 
  WHERE ID = ?
  `,
    [id]
  );
  return rows[0];
}

export async function addUser(user_id, google_id, username, email, password) {
  const [result] = await pool.query(
    `
  INSERT INTO user (user_id, google_id, username, email, password) 
  VALUES (?, ?, ?, ?, ?)
  `,
    [user_id, google_id, username, email, password]
  );
  const id = result.insertId;
  return getUserById(id);
}
