import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '@/lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
  const { locationId, brand, openTime, closeTime, address } = req.body
  try {
    if (!locationId || !brand || !openTime || !closeTime || !address) {
      return res
        .status(400)
        .json({ message: 'all attributes are required' })
    }

    const results = await query(
      `
          UPDATE RestaurantLocations
          SET brand = ?, openTime = ?, closeTime = ?, address = ?
          WHERE locationId = ?
      `,
      [brand, openTime, closeTime, address, locationId]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
