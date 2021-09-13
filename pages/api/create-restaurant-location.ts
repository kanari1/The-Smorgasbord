import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '@/lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
  const { brand, openTime, closeTime, address } = req.body
  try {
    if (!brand || !openTime || !closeTime || !address) {
      return res
        .status(400)
        .json({ message: '`brand`, `openTime`, `closeTime`, and `address` are all required' })
    }

    const results = await query(
      `
      INSERT INTO RestaurantLocations (brand, openTime, closeTime, address)
      VALUES (?, ?, ?, ?)
      `,
      [brand, openTime, closeTime, filter.clean(address)]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

const handlerSample: NextApiHandler = async (req, res) => {
    return res.json(true)
}

export default handler
