import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '@/lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
  const { customer, location, courier, status } = req.body
  try {
    if (!customer || !location || !status) {
      return res
        .status(400)
        .json({ message: '`customer`, `location`, and `status` are all required' })
    }

    const results = await query(
      `
      INSERT INTO Orders (customer, location, courier, status)
      VALUES (?, ?, ?, ?)
      `,
      [customer, location, courier, filter.clean(status)]
    )
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

const handlerSample: NextApiHandler = async (req, res) => {
    // will get first free courier and assign them
    // also, initial status is 'working', then 'in transit', then 'complete'
    return res.json(true)
}

export default handler
