import { NextApiHandler } from 'next'
import { query } from '@/lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { lineItemId, quantity } = req.body
  try {
    if (!lineItemId || !quantity) {
      return res
        .status(400)
        .json({ message: '`lineItemId` and `quantity` are both required' })
    }

    const results = await query(
      `
        UPDATE LineItems
        SET quantity = ?
        WHERE lineItemId = ?
      `,
      [quantity, lineItemId]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
