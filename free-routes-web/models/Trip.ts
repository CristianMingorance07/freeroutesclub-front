import mongoose, { Schema, Document, model, models } from "mongoose";

export interface ITrip extends Document {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
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
  dates: {
    start: string;
    end: string;
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
    included: string[];
    image: string;
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
  sections: {
    id: string;
    title: string;
    content: {
      paragraphs: string[];
      list: string[];
    };
    images: string[];
    subsections: {
      id: string;
      title: string;
      content: {
        paragraphs: string[];
        list: string[];
      };
      images: string[];
    }[];
  }[];
  coordinators: {
    name: string;
    description: string;
    photoUrl: string;
    role: string;
  }[];
  additionalDetails: {
    travelStyle: string;
    routeDynamics: string;
    experienceIndicators: {
      fun: number;
      difficulty: number;
      scenery: number;
      culture: number;
      gastronomy: number;
    };
    equipmentRecommended: {
      mandatory: string[];
      optional: string[];
    };
    detailedCosts: {
      transport: number;
      accommodation: number;
      meals: number;
      activities: number;
      baseCost: number;
      margin: {
        percentage: number;
        total: number;
      }[];
    };
    routeMapLink: string;
    pointsOfInterest: {
      name: string;
      description: string;
      coordinates: {
        lat: number;
        lng: number;
      };
    }[];
    loyaltyProgram: {
      description: string;
      benefits: string[];
    };
    gallery: {
      category: string;
      images: string[];
    }[];
    whatsappGroup: string;
  };
}

const TripSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
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
      date: { type: Date, required: true },
      time: { type: String, required: true },
    },
    dates: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
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
        included: { type: [String], required: true },
        image: { type: String, required: false },
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
    sections: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        content: {
          paragraphs: { type: [String], required: false },
          list: { type: [String], required: false },
        },
        images: { type: [String], required: false },
        subsections: [
          {
            id: { type: String, required: true },
            title: { type: String, required: true },
            content: {
              paragraphs: { type: [String], required: false },
              list: { type: [String], required: false },
            },
            images: { type: [String], required: false },
          },
        ],
      },
    ],
    coordinators: [
      {
        name: { type: String, required: true },
        description: { type: String, required: true },
        photoUrl: { type: String, required: true },
      },
    ],
    additionalDetails: {
      travelStyle: { type: String, required: true },
      routeDynamics: { type: String, required: true },
      experienceIndicators: {
        fun: { type: Number, required: true },
        difficulty: { type: Number, required: true },
        scenery: { type: Number, required: true },
        culture: { type: Number, required: true },
        gastronomy: { type: Number, required: true },
      },
      equipmentRecommended: {
        mandatory: { type: [String], required: true },
        optional: { type: [String], required: false },
      },
      detailedCosts: {
        transport: { type: Number, required: true },
        accommodation: { type: Number, required: true },
        meals: { type: Number, required: true },
        activities: { type: Number, required: true },
        baseCost: { type: Number, required: true },
        margin: [
          {
            percentage: { type: Number, required: true },
            total: { type: Number, required: true },
          },
        ],
      },
      routeMapLink: { type: String, required: true },
      pointsOfInterest: [
        {
          name: { type: String, required: true },
          description: { type: String, required: true },
          coordinates: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
          },
        },
      ],
      loyaltyProgram: {
        description: { type: String, required: true },
        benefits: { type: [String], required: true },
      },
      gallery: [
        {
          category: { type: String, required: true },
          images: { type: [String], required: true },
        },
      ],
      whatsappGroup: { type: String, required: true },
    },
  },
  { timestamps: true },
);

const Trip = models.Trip || model<ITrip>("Trip", TripSchema);

export default Trip;
