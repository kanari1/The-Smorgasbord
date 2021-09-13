import { NextApiHandler } from 'next'
import { query } from '@/lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { lineItemId } = req.query
  try {
    if (!lineItemId) {
      return res.status(400).json({ message: '`lineItemId` required' })
    }
    if (typeof parseInt(lineItemId.toString()) !== 'number') {
      return res.status(400).json({ message: '`lineItemId` must be a number' })
    }
    const results = await query(
      `
      DELETE FROM LineItems
      WHERE lineItemId = ?
      `,
      lineItemId
    )
    res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
