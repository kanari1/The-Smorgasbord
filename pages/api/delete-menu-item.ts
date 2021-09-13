import { NextApiHandler } from 'next'
import { query } from '@/lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { menuItemId } = req.query
  try {
    if (!menuItemId) {
      return res.status(400).json({ message: '`menuItemId` required' })
    }

    if (typeof parseInt(menuItemId.toString()) !== 'number') {
      return res.status(400).json({ message: '`menuItemId` must be a number' })
    }

    const results = await query(
      `
      DELETE FROM MenuItems
      WHERE menuItemId = ?
  `,
      menuItemId
    )
    res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
