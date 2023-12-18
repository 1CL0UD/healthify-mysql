import { pool } from '../database.js';
import { format } from 'date-fns'; // Using date-fns for date formatting

// Function to format dates to a specific format
function formatDate(date) {
  return format(date, 'yyyy-MM-dd'); // Adjust the format as per your mobile app's requirements
}

// Handler to fetch diary list
export async function getDiary() {
  try {
    const [rows] = await pool.query('SELECT * FROM diary');
    // Format diary_date before sending the response
    const formattedRows = rows.map((row) => ({
      ...row,
      diary_date: formatDate(row.diary_date),
    }));
    return {
      error: false,
      message: 'Diary fetched successfully',
      diaryList: formattedRows,
    };
  } catch (error) {
    return {
      error: true,
      message: 'Error fetching diary',
      diaryList: [],
    };
  }
}

// Handler to fetch diary details by ID
export async function getDiaryById(id) {
  try {
    const [rows] = await pool.query(
      `
      SELECT * 
      FROM diary
      WHERE diary_id = ?
      `,
      [id]
    );
    if (rows.length === 0) {
      return {
        error: true,
        message: 'Diary not found',
        diaryDetails: null,
      };
    }
    // Format diary_date before sending the response
    const formattedDiary = {
      ...rows[0],
      diary_date: formatDate(rows[0].diary_date),
    };
    return {
      error: false,
      message: 'Diary details fetched successfully',
      diaryDetails: formattedDiary,
    };
  } catch (error) {
    return {
      error: true,
      message: 'Error fetching diary details',
      diaryDetails: null,
    };
  }
}

// Handler to fetch diary details with food names
export async function getDiaryByIdWithName(id) {
  try {
    const [rows] = await pool.query(
      `
      SELECT eat.*, foods.food_name
      FROM eat_time AS eat
      JOIN foods ON eat.food_id = foods.food_id
      WHERE eat.diary_id = ?; 
      `,
      [id]
    );
    // Format diary_date before sending the response
    const formattedRows = rows.map((row) => ({
      ...row,
      diary_date: formatDate(row.diary_date),
    }));
    return {
      error: false,
      message: 'Diary with food names fetched successfully',
      diaryDetailsWithFood: formattedRows,
    };
  } catch (error) {
    return {
      error: true,
      message: 'Error fetching diary details with food names',
      diaryDetailsWithFood: [],
    };
  }
}

// Handler to add a diary entry
export async function addDiary(diary_id, user_id, diary_date, calorie_target) {
  try {
    const [result] = await pool.query(
      `
      INSERT INTO diary (diary_id, user_id, diary_date, calorie_target) 
      VALUES (?, ?, ?, ?)
      `,
      [diary_id, user_id, diary_date, calorie_target]
    );
    return {
      error: false,
      message: 'Added food to user list of foods',
    };
  } catch (error) {
    return {
      error: true,
      message: 'Error adding diary',
    };
  }
}

// Handler to check diary by user_id and diary_date
export async function checkDiary(user_id, diary_date) {
  try {
    const [result] = await pool.query(
      `
      SELECT diary_id FROM diary WHERE user_id = ? AND diary_date = ?
      `,
      [user_id, diary_date]
    );

    if (result.length > 0) {
      const { diary_id } = result[0];
      return {
        error: false,
        message: 'Diary found for the given user and date',
        diary_id: diary_id,
      };
    } else {
      return {
        error: true,
        message: 'Diary not found for the given user and date',
        diaryDetails: null,
      };
    }
  } catch (error) {
    return {
      error: true,
      message: 'Error fetching diary',
      diaryDetails: null,
    };
  }
}
