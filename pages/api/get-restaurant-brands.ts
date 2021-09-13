import { NextApiHandler } from 'next'
import { query } from '@/lib/db'

const handler: NextApiHandler = async (req, res) => {
    const { name } = req.query
    try {
        if (name) {
            if (typeof name !== 'string') {
                return res.status(400).json({ message: '`name` must be a string' })
            }
            const results = await query(
                `
                    SELECT *
                    FROM RestaurantBrands
                    WHERE name LIKE ?
                    ORDER BY brandId DESC
                `,
                `%${name}%`
            )
            return res.json(results)
        } else {
            const results = await query(
                `
                    SELECT *
                    FROM RestaurantBrands
                    ORDER BY brandId DESC
                `
            )
            return res.json(results)
        }
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
