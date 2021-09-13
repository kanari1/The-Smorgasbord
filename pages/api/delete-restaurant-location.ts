import { NextApiHandler } from 'next'
import { query } from '@/lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { locationId } = req.query
  try {
    if (!locationId) {
      return res.status(400).json({ message: '`locationId` required' })
    }
    if (typeof parseInt(locationId.toString()) !== 'number') {
      return res.status(400).json({ message: '`locationId` must be a number' })
    }

    let results = await query(
        `
            DELETE FROM LineItems
            WHERE LineItems.order IN
            (
                SELECT orderId FROM Orders
                WHERE Orders.location = ?
            )
        `,
        locationId
    )

    results = await query(
        `
            DELETE FROM MenuItems
            WHERE location = ?
        `,
        locationId
    )

    results = await query(
        `
            DELETE FROM Orders
            WHERE location = ?
        `,
        locationId
    )

    results = await query(
      `
      DELETE FROM RestaurantLocations
      WHERE locationId = ?
  `,
      locationId
    )
    res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
