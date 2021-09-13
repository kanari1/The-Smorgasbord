import { NextApiHandler } from 'next'
import { query } from '@/lib/db'

const handler: NextApiHandler = async (req, res) => {
    const { location } = req.query
    try {
        if (!location) {
            const results = await query(
                `
                    SELECT *
                    FROM MenuItems
                    ORDER BY menuItemId DESC
                `
            )
            return res.json(results)
        } else {
            if (typeof parseInt(location.toString()) !== 'number') {
                return res.status(400).json({ message: '`location` must be a number' })
            }
            const results = await query(
            `
                SELECT *
                FROM MenuItems
                WHERE location = ?
                ORDER BY menuItemId DESC
            `,
            location
            )
            return res.json(results)
        }
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const handlerSample: NextApiHandler = async (req, res) => {
    const results= [
        {
            menuItemId: 43,
            name: "Beef Taco",
            description: "A taco filled with beef",
            price: 14.20,
            location: 34
        },
    ]
    const error = false

    return res.json({
        menuItems: results,
        isLoading: !error && !results,
        isError: error,
    })
}

export default handler
