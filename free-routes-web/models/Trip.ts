import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface ITrip extends Document {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    duration: string;
    price: number;
    level: string;
    region: string;
    manager: string;
    images: string[];
    availability: {
        spotsLeft: number;
    };
    departure: {
        date: string;
        time: string;
    };
    dates: { // Nuevo campo
        start: string; // Fecha de inicio del viaje
        end: string;   // Fecha de fin del viaje
    };
    benefits: {
        icon: string;
        title: string;
        description: string;
    }[];
    coordinates: {
        lat: number;
        lng: number;
    };
    itinerary: {
        day: number;
        title: string;
        description: string;
    }[];
    logistics: {
        fuelCost: number;
        tolls: number;
        accommodationOptions: {
            sharedRooms: number;
            privateRooms: number;
        };
        mealsCost: number;
        activities: {
            name: string;
            cost: number;
        }[];
    };
    promotions: {
        isActive: boolean;
        description: string;
        spots: number;
        discount: number;
    };
    reviews: {
        author: string;
        rating: number;
        comment: string;
    }[];
    inclusions: string[];
    checklist: string[];
    faq: {
        question: string;
        answer: string;
    }[];
    testimonials: {
        name: string;
        message: string;
    }[];
    acceptedBikes: string[];
    minEngineCapacity: number;
}

const TripSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        imageUrl: { type: String, required: true },
        duration: { type: String, required: true },
        price: { type: Number, required: true },
        level: { type: String, required: true },
        region: { type: String, required: true },
        manager: { type: String, required: true },
        images: { type: [String], required: true },
        availability: {
            spotsLeft: { type: Number, required: true },
        },
        departure: {
            date: { type: String, required: true },
            time: { type: String, required: true },
        },
        dates: { // Nuevo campo
            start: { type: String, required: true }, // Fecha de inicio
            end: { type: String, required: true },   // Fecha de fin
        },
        benefits: [
            {
                icon: { type: String, required: true },
                title: { type: String, required: true },
                description: { type: String, required: true },
            },
        ],
        coordinates: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
        },
        itinerary: [
            {
                day: { type: Number, required: true },
                title: { type: String, required: true },
                description: { type: String, required: true },
            },
        ],
        logistics: {
            fuelCost: { type: Number, required: true },
            tolls: { type: Number, required: true },
            accommodationOptions: {
                sharedRooms: { type: Number, required: true },
                privateRooms: { type: Number, required: true },
            },
            mealsCost: { type: Number, required: true },
            activities: [
                {
                    name: { type: String, required: true },
                    cost: { type: Number, required: true },
                },
            ],
        },
        promotions: {
            isActive: { type: Boolean, required: true },
            description: { type: String, required: true },
            spots: { type: Number, required: true },
            discount: { type: Number, required: true },
        },
        reviews: [
            {
                author: { type: String, required: true },
                rating: { type: Number, required: true },
                comment: { type: String, required: true },
            },
        ],
        inclusions: { type: [String], required: true },
        checklist: { type: [String], required: true },
        faq: [
            {
                question: { type: String, required: true },
                answer: { type: String, required: true },
            },
        ],
        testimonials: [
            {
                name: { type: String, required: true },
                message: { type: String, required: true },
            },
        ],
        acceptedBikes: { type: [String], required: true },
        minEngineCapacity: { type: Number, required: true },
    },
    { timestamps: true }
);

const Trip = models.Trip || model<ITrip>('Trip', TripSchema);

export default Trip;
