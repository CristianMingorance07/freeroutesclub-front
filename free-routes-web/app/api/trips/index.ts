import {NextApiRequest, NextApiResponse} from 'next';
import dbConnect from '@/lib/dbConnect';
import Trip from '@/models/Trip';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            const trips = await Trip.find({});
            res.status(200).json({success: true, data: trips});
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
            res.status(500).json({success: false, error: errorMessage});
        }
    } else {
        res.status(405).json({success: false, message: 'Method not allowed'});
    }
}
