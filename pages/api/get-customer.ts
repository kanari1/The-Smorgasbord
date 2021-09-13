import { NextApiHandler } from 'next'
import { query } from '@/lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { customerId } = req.query
  try {
    if (!customerId) {
      return res.status(400).json({ message: '`customerId` required' })
    }
    if (typeof parseInt(customerId.toString()) !== 'number') {
      return res.status(400).json({ message: '`customerId` must be a number' })
    }
    const results = await query(
        `
          SELECT * 
          FROM Customers
          WHERE customerId = ? 
        `,
        customerId
    )
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
