import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { email } = req.query
  try {
    if (email) {
        const results = await query(
            `
              SELECT * 
              FROM Customers
              WHERE email = ?
              ORDER BY customerId DESC
            `,
            email
        )
        return res.json(results)
    } else {
        const results = await query(
            `
              SELECT *
              FROM Customers
              ORDER BY customerId DESC
            `
        )
        return res.json(results)
    }
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
