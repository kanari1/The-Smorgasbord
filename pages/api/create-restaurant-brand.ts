import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '@/lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
  const { name, logo } = req.body
  try {
    if (!name) {
      return res
        .status(400)
        .json({ message: '`name` is required' })
    }

    const results = await query(
      `
      INSERT INTO RestaurantBrands (name, logo)
      VALUES (?, ?)
      `,
      [filter.clean(name), logo]
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
