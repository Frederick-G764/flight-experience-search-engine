export type IndicatorStatus = 'excellent' | 'fair' | 'poor';

export interface Feature {
  icon: string;
  name: string;
  value: string;
  status: IndicatorStatus;
  tooltip?: {
    description: string;
    rank: string;
    average: string;
    best: string;
  };
}

export interface FlightData {
  id: string;
  airline: string;
  aircraft: string;
  route: {
    from: string;
    to: string;
    departTime: string;
    arriveTime: string;
    duration: string;
  };
  flightNumber: string;
  price: number;
  features: {
    bedLength: Feature;
    aisleAccess: Feature;
    wifi: Feature;
    screenSize: Feature;
    privacy: Feature;
    cabinAge: Feature;
  };
  details: {
    seatAndSleep: {
      seatWidth: string;
      seatPitch: string;
      recline: string;
      bedLength: string;
      bedWidth: string;
      bedType: string;
      comfortFeatures: string[];
      bedding: string[];
    };
    entertainment: {
      screenSize: string;
      resolution: string;
      systemName: string;
      contentLibrary: string;
      audio: string[];
      gaming: string;
    };
    connectivity: {
      wifiAvailability: string;
      wifiSpeed: string;
      wifiPricing: string;
      powerOutlets: string[];
      deviceStorage: string;
      holders: string;
    };
    dining: {
      serviceStyle: string;
      menuQuality: string;
      beverages: string[];
      timingOptions: string;
    };
    privacyAndLayout: {
      configuration: string;
      directAisleAccess: string;
      privacyFeatures: string[];
      windowVsAisle: string;
      totalSeats: string;
    };
    environment: {
      cabinAltitude: string;
      noiseLevel: string;
      airQuality: string;
      lightingControl: string;
      temperatureControl: string;
      cabinAge: string;
    };
  };
  images: string[];
}

export const mockFlights: FlightData[] = [
  {
    id: '1',
    airline: 'Lufthansa',
    aircraft: 'A350-900 Allegris',
    route: {
      from: 'FRA',
      to: 'JFK',
      departTime: '10:15',
      arriveTime: '13:30',
      duration: '9h 15m',
    },
    flightNumber: 'LH400',
    price: 4299,
    features: {
      bedLength: {
        icon: '🛏️',
        name: 'Bed Length',
        value: '205cm',
        status: 'excellent',
        tooltip: {
          description: 'Excellent - Among the longest available',
          rank: '1st of 6 flights',
          average: '198cm',
          best: '205cm (This flight)',
        },
      },
      aisleAccess: {
        icon: '🚪',
        name: 'Aisle Access',
        value: '1-2-1 Direct',
        status: 'excellent',
        tooltip: {
          description: 'Excellent - All seats have direct aisle access',
          rank: '1st of 6 flights',
          average: '1-2-1 Direct',
          best: '1-2-1 Direct',
        },
      },
      wifi: {
        icon: '📡',
        name: 'WiFi',
        value: 'Free, 50+ Mbps',
        status: 'excellent',
        tooltip: {
          description: 'Excellent - Fast and complimentary',
          rank: '1st of 6 flights',
          average: '25 Mbps',
          best: '50+ Mbps (This flight)',
        },
      },
      screenSize: {
        icon: '📺',
        name: 'Screen Size',
        value: '24" 4K',
        status: 'excellent',
        tooltip: {
          description: 'Excellent - Large high-resolution display',
          rank: '1st of 6 flights',
          average: '19.5"',
          best: '24" (This flight)',
        },
      },
      privacy: {
        icon: '🔒',
        name: 'Privacy',
        value: 'Door Suite',
        status: 'excellent',
        tooltip: {
          description: 'Excellent - Complete privacy with closing door',
          rank: '1st of 6 flights',
          average: 'Enclosed Suite',
          best: 'Door Suite',
        },
      },
      cabinAge: {
        icon: '🎂',
        name: 'Cabin Age',
        value: '2 years',
        status: 'excellent',
        tooltip: {
          description: 'Excellent - Brand new cabin',
          rank: '1st of 6 flights',
          average: '6 years',
          best: '2 years (This flight)',
        },
      },
    },
    details: {
      seatAndSleep: {
        seatWidth: '22 inches',
        seatPitch: '76 inches',
        recline: 'Fully flat 180°',
        bedLength: '205cm (81 inches)',
        bedWidth: '55cm (22 inches)',
        bedType: 'Fully flat bed',
        comfortFeatures: ['Adjustable headrest', 'Footrest', 'Lumbar support', 'Massage function'],
        bedding: ['Memory foam mattress pad', 'Duvet', '2 pillows'],
      },
      entertainment: {
        screenSize: '24 inches',
        resolution: '4K Ultra HD',
        systemName: 'Allegris Entertainment',
        contentLibrary: '300+ movies, 200+ TV shows',
        audio: ['Noise-canceling headphones', 'Bluetooth connectivity'],
        gaming: 'Xbox controller compatible',
      },
      connectivity: {
        wifiAvailability: 'Complimentary throughout flight',
        wifiSpeed: '50+ Mbps',
        wifiPricing: 'Free',
        powerOutlets: ['110V AC outlet', 'USB-A port', 'USB-C port'],
        deviceStorage: 'Multiple storage compartments',
        holders: 'Adjustable phone and tablet holders',
      },
      dining: {
        serviceStyle: 'On-demand dining',
        menuQuality: 'Star chef designed menu',
        beverages: ['Premium wines', 'Champagne', 'Spirits', 'Fresh juice bar'],
        timingOptions: 'Dine anytime during flight',
      },
      privacyAndLayout: {
        configuration: '1-2-1 (all aisle access)',
        directAisleAccess: 'Yes - all seats',
        privacyFeatures: ['Closing door', 'High dividers', 'Personal suite'],
        windowVsAisle: 'Both have equal benefits',
        totalSeats: '32 business class seats',
      },
      environment: {
        cabinAltitude: '6,000 feet (lower is better)',
        noiseLevel: 'Quietest in fleet',
        airQuality: 'Advanced HEPA filtration, 50% humidity',
        lightingControl: 'Personal LED controls with presets',
        temperatureControl: 'Individual climate zones',
        cabinAge: '2 years old',
      },
    },
    images: ['/placeholder-cabin.jpg', '/placeholder-seat.jpg', '/placeholder-entertainment.jpg', '/placeholder-dining.jpg'],
  },
  {
    id: '2',
    airline: 'Qatar Airways',
    aircraft: 'A350-900 Qsuite',
    route: {
      from: 'FRA',
      to: 'JFK',
      departTime: '14:45',
      arriveTime: '18:05',
      duration: '9h 20m',
    },
    flightNumber: 'QR87',
    price: 4599,
    features: {
      bedLength: {
        icon: '🛏️',
        name: 'Bed Length',
        value: '203cm',
        status: 'excellent',
        tooltip: {
          description: 'Excellent - Very comfortable length',
          rank: '2nd of 6 flights',
          average: '198cm',
          best: '205cm (Lufthansa A350)',
        },
      },
      aisleAccess: {
        icon: '🚪',
        name: 'Aisle Access',
        value: '1-2-1 Direct',
        status: 'excellent',
        tooltip: {
          description: 'Excellent - All seats have direct aisle access',
          rank: '1st of 6 flights',
          average: '1-2-1 Direct',
          best: '1-2-1 Direct',
        },
      },
      wifi: {
        icon: '📡',
        name: 'WiFi',
        value: 'Free, 30 Mbps',
        status: 'excellent',
        tooltip: {
          description: 'Excellent - Fast and complimentary',
          rank: '2nd of 6 flights',
          average: '25 Mbps',
          best: '50+ Mbps (Lufthansa A350)',
        },
      },
      screenSize: {
        icon: '📺',
        name: 'Screen Size',
        value: '21.5" HD',
        status: 'excellent',
        tooltip: {
          description: 'Excellent - Large display',
          rank: '2nd of 6 flights',
          average: '19.5"',
          best: '24" (Lufthansa A350)',
        },
      },
      privacy: {
        icon: '🔒',
        name: 'Privacy',
        value: 'Door Suite',
        status: 'excellent',
        tooltip: {
          description: 'Excellent - Complete privacy with closing door',
          rank: '1st of 6 flights',
          average: 'Enclosed Suite',
          best: 'Door Suite',
        },
      },
      cabinAge: {
        icon: '🎂',
        name: 'Cabin Age',
        value: '4 years',
        status: 'fair',
        tooltip: {
          description: 'Fair - Modern but not newest',
          rank: '3rd of 6 flights',
          average: '6 years',
          best: '2 years (Lufthansa A350)',
        },
      },
    },
    details: {
      seatAndSleep: {
        seatWidth: '21.5 inches',
        seatPitch: '74 inches',
        recline: 'Fully flat 180°',
        bedLength: '203cm (80 inches)',
        bedWidth: '54cm (21.5 inches)',
        bedType: 'Fully flat bed',
        comfortFeatures: ['Adjustable headrest', 'Footrest', 'Lumbar support', 'Massage function'],
        bedding: ['Mattress pad', 'Duvet', '2 pillows'],
      },
      entertainment: {
        screenSize: '21.5 inches',
        resolution: 'Full HD',
        systemName: 'Oryx One',
        contentLibrary: '4000+ entertainment options',
        audio: ['Noise-canceling headphones', 'Bluetooth connectivity'],
        gaming: 'Gaming options available',
      },
      connectivity: {
        wifiAvailability: 'Complimentary throughout flight',
        wifiSpeed: '30 Mbps',
        wifiPricing: 'Free',
        powerOutlets: ['110V AC outlet', 'USB-A port', 'USB-C port'],
        deviceStorage: 'Multiple storage compartments',
        holders: 'Phone and tablet holders',
      },
      dining: {
        serviceStyle: 'On-demand dining',
        menuQuality: 'Award-winning cuisine',
        beverages: ['Premium wines', 'Champagne', 'Spirits', 'Fresh juices'],
        timingOptions: 'Dine anytime during flight',
      },
      privacyAndLayout: {
        configuration: '1-2-1 (all aisle access)',
        directAisleAccess: 'Yes - all seats',
        privacyFeatures: ['Closing door', 'High dividers', 'Personal suite'],
        windowVsAisle: 'Both have equal benefits',
        totalSeats: '36 business class seats',
      },
      environment: {
        cabinAltitude: '6,000 feet',
        noiseLevel: 'Very quiet',
        airQuality: 'Advanced filtration, 45% humidity',
        lightingControl: 'Personal LED controls',
        temperatureControl: 'Individual climate zones',
        cabinAge: '4 years old',
      },
    },
    images: ['/placeholder-cabin.jpg', '/placeholder-seat.jpg', '/placeholder-entertainment.jpg', '/placeholder-dining.jpg'],
  },
  {
    id: '3',
    airline: 'Singapore Airlines',
    aircraft: 'A350-900',
    route: {
      from: 'FRA',
      to: 'JFK',
      departTime: '22:30',
      arriveTime: '01:50',
      duration: '9h 20m',
    },
    flightNumber: 'SQ26',
    price: 4199,
    features: {
      bedLength: {
        icon: '🛏️',
        name: 'Bed Length',
        value: '198cm',
        status: 'fair',
        tooltip: {
          description: 'Fair - Acceptable but not the longest',
          rank: '3rd of 6 flights',
          average: '198cm',
          best: '205cm (Lufthansa A350)',
        },
      },
      aisleAccess: {
        icon: '🚪',
        name: 'Aisle Access',
        value: '1-2-1 Direct',
        status: 'excellent',
        tooltip: {
          description: 'Excellent - All seats have direct aisle access',
          rank: '1st of 6 flights',
          average: '1-2-1 Direct',
          best: '1-2-1 Direct',
        },
      },
      wifi: {
        icon: '📡',
        name: 'WiFi',
        value: 'Free, 25 Mbps',
        status: 'excellent',
        tooltip: {
          description: 'Excellent - Good speed and complimentary',
          rank: '3rd of 6 flights',
          average: '25 Mbps',
          best: '50+ Mbps (Lufthansa A350)',
        },
      },
      screenSize: {
        icon: '📺',
        name: 'Screen Size',
        value: '18" HD',
        status: 'fair',
        tooltip: {
          description: 'Fair - Decent size',
          rank: '4th of 6 flights',
          average: '19.5"',
          best: '24" (Lufthansa A350)',
        },
      },
      privacy: {
        icon: '🔒',
        name: 'Privacy',
        value: 'Enclosed Suite',
        status: 'fair',
        tooltip: {
          description: 'Fair - Good privacy but no door',
          rank: '3rd of 6 flights',
          average: 'Enclosed Suite',
          best: 'Door Suite',
        },
      },
      cabinAge: {
        icon: '🎂',
        name: 'Cabin Age',
        value: '5 years',
        status: 'fair',
        tooltip: {
          description: 'Fair - Moderately aged',
          rank: '4th of 6 flights',
          average: '6 years',
          best: '2 years (Lufthansa A350)',
        },
      },
    },
    details: {
      seatAndSleep: {
        seatWidth: '25 inches',
        seatPitch: '60 inches',
        recline: 'Fully flat 180°',
        bedLength: '198cm (78 inches)',
        bedWidth: '63cm (25 inches)',
        bedType: 'Fully flat bed',
        comfortFeatures: ['Adjustable headrest', 'Footrest', 'Lumbar support'],
        bedding: ['Mattress pad', 'Blanket', 'Pillow'],
      },
      entertainment: {
        screenSize: '18 inches',
        resolution: 'Full HD',
        systemName: 'KrisWorld',
        contentLibrary: '1800+ entertainment options',
        audio: ['Noise-canceling headphones'],
        gaming: 'Limited gaming options',
      },
      connectivity: {
        wifiAvailability: 'Complimentary throughout flight',
        wifiSpeed: '25 Mbps',
        wifiPricing: 'Free',
        powerOutlets: ['110V AC outlet', 'USB-A port'],
        deviceStorage: 'Storage compartments',
        holders: 'Phone holder',
      },
      dining: {
        serviceStyle: 'Menu service',
        menuQuality: 'Premium cuisine',
        beverages: ['Premium wines', 'Champagne', 'Spirits'],
        timingOptions: 'Set meal times with flexibility',
      },
      privacyAndLayout: {
        configuration: '1-2-1 (all aisle access)',
        directAisleAccess: 'Yes - all seats',
        privacyFeatures: ['High dividers', 'Enclosed suite (no door)'],
        windowVsAisle: 'Both have equal benefits',
        totalSeats: '42 business class seats',
      },
      environment: {
        cabinAltitude: '6,000 feet',
        noiseLevel: 'Quiet',
        airQuality: 'HEPA filtration, 40% humidity',
        lightingControl: 'Mood lighting controls',
        temperatureControl: 'Zone climate control',
        cabinAge: '5 years old',
      },
    },
    images: ['/placeholder-cabin.jpg', '/placeholder-seat.jpg', '/placeholder-entertainment.jpg', '/placeholder-dining.jpg'],
  },
  {
    id: '4',
    airline: 'Emirates',
    aircraft: '777-300ER',
    route: {
      from: 'FRA',
      to: 'JFK',
      departTime: '08:20',
      arriveTime: '11:45',
      duration: '9h 25m',
    },
    flightNumber: 'EK3',
    price: 3899,
    features: {
      bedLength: {
        icon: '🛏️',
        name: 'Bed Length',
        value: '195cm',
        status: 'fair',
        tooltip: {
          description: 'Fair - Acceptable length',
          rank: '4th of 6 flights',
          average: '198cm',
          best: '205cm (Lufthansa A350)',
        },
      },
      aisleAccess: {
        icon: '🚪',
        name: 'Aisle Access',
        value: '1-2-1 Direct',
        status: 'excellent',
        tooltip: {
          description: 'Excellent - All seats have direct aisle access',
          rank: '1st of 6 flights',
          average: '1-2-1 Direct',
          best: '1-2-1 Direct',
        },
      },
      wifi: {
        icon: '📡',
        name: 'WiFi',
        value: 'Free, 15 Mbps',
        status: 'fair',
        tooltip: {
          description: 'Fair - Free but slower speeds',
          rank: '4th of 6 flights',
          average: '25 Mbps',
          best: '50+ Mbps (Lufthansa A350)',
        },
      },
      screenSize: {
        icon: '📺',
        name: 'Screen Size',
        value: '23" HD',
        status: 'excellent',
        tooltip: {
          description: 'Excellent - Large display',
          rank: '2nd of 6 flights',
          average: '19.5"',
          best: '24" (Lufthansa A350)',
        },
      },
      privacy: {
        icon: '🔒',
        name: 'Privacy',
        value: 'Enclosed Suite',
        status: 'fair',
        tooltip: {
          description: 'Fair - Good privacy but no door',
          rank: '3rd of 6 flights',
          average: 'Enclosed Suite',
          best: 'Door Suite',
        },
      },
      cabinAge: {
        icon: '🎂',
        name: 'Cabin Age',
        value: '7 years',
        status: 'fair',
        tooltip: {
          description: 'Fair - Showing some age',
          rank: '5th of 6 flights',
          average: '6 years',
          best: '2 years (Lufthansa A350)',
        },
      },
    },
    details: {
      seatAndSleep: {
        seatWidth: '20.5 inches',
        seatPitch: '72 inches',
        recline: 'Fully flat 180°',
        bedLength: '195cm (77 inches)',
        bedWidth: '52cm (20.5 inches)',
        bedType: 'Fully flat bed',
        comfortFeatures: ['Adjustable headrest', 'Footrest'],
        bedding: ['Mattress pad', 'Blanket', 'Pillow'],
      },
      entertainment: {
        screenSize: '23 inches',
        resolution: 'Full HD',
        systemName: 'ICE',
        contentLibrary: '5000+ entertainment options',
        audio: ['Noise-canceling headphones'],
        gaming: 'Gaming available',
      },
      connectivity: {
        wifiAvailability: 'Complimentary throughout flight',
        wifiSpeed: '15 Mbps',
        wifiPricing: 'Free',
        powerOutlets: ['110V AC outlet', 'USB port'],
        deviceStorage: 'Storage compartments',
        holders: 'Device holder',
      },
      dining: {
        serviceStyle: 'Menu service',
        menuQuality: 'Multi-course dining',
        beverages: ['Premium wines', 'Spirits'],
        timingOptions: 'Set meal times',
      },
      privacyAndLayout: {
        configuration: '1-2-1 (all aisle access)',
        directAisleAccess: 'Yes - all seats',
        privacyFeatures: ['High dividers', 'Enclosed suite (no door)'],
        windowVsAisle: 'Both have equal benefits',
        totalSeats: '42 business class seats',
      },
      environment: {
        cabinAltitude: '7,000 feet',
        noiseLevel: 'Moderate',
        airQuality: 'Standard filtration, 35% humidity',
        lightingControl: 'Cabin mood lighting',
        temperatureControl: 'Cabin climate control',
        cabinAge: '7 years old',
      },
    },
    images: ['/placeholder-cabin.jpg', '/placeholder-seat.jpg', '/placeholder-entertainment.jpg', '/placeholder-dining.jpg'],
  },
  {
    id: '5',
    airline: 'American Airlines',
    aircraft: '787-9 Dreamliner',
    route: {
      from: 'FRA',
      to: 'JFK',
      departTime: '16:10',
      arriveTime: '19:35',
      duration: '9h 25m',
    },
    flightNumber: 'AA81',
    price: 3499,
    features: {
      bedLength: {
        icon: '🛏️',
        name: 'Bed Length',
        value: '193cm',
        status: 'fair',
        tooltip: {
          description: 'Fair - Minimum acceptable length',
          rank: '5th of 6 flights',
          average: '198cm',
          best: '205cm (Lufthansa A350)',
        },
      },
      aisleAccess: {
        icon: '🚪',
        name: 'Aisle Access',
        value: '1-2-1 Direct',
        status: 'excellent',
        tooltip: {
          description: 'Excellent - All seats have direct aisle access',
          rank: '1st of 6 flights',
          average: '1-2-1 Direct',
          best: '1-2-1 Direct',
        },
      },
      wifi: {
        icon: '📡',
        name: 'WiFi',
        value: 'Paid, 10 Mbps',
        status: 'poor',
        tooltip: {
          description: 'Poor - Slow speeds and paid',
          rank: '5th of 6 flights',
          average: '25 Mbps',
          best: '50+ Mbps (Lufthansa A350)',
        },
      },
      screenSize: {
        icon: '📺',
        name: 'Screen Size',
        value: '16" HD',
        status: 'fair',
        tooltip: {
          description: 'Fair - Small but functional',
          rank: '5th of 6 flights',
          average: '19.5"',
          best: '24" (Lufthansa A350)',
        },
      },
      privacy: {
        icon: '🔒',
        name: 'Privacy',
        value: 'Semi-Private',
        status: 'fair',
        tooltip: {
          description: 'Fair - Limited privacy',
          rank: '5th of 6 flights',
          average: 'Enclosed Suite',
          best: 'Door Suite',
        },
      },
      cabinAge: {
        icon: '🎂',
        name: 'Cabin Age',
        value: '6 years',
        status: 'fair',
        tooltip: {
          description: 'Fair - Average age',
          rank: '4th of 6 flights',
          average: '6 years',
          best: '2 years (Lufthansa A350)',
        },
      },
    },
    details: {
      seatAndSleep: {
        seatWidth: '21 inches',
        seatPitch: '64 inches',
        recline: 'Fully flat 180°',
        bedLength: '193cm (76 inches)',
        bedWidth: '53cm (21 inches)',
        bedType: 'Fully flat bed',
        comfortFeatures: ['Adjustable headrest'],
        bedding: ['Blanket', 'Pillow'],
      },
      entertainment: {
        screenSize: '16 inches',
        resolution: 'HD',
        systemName: 'Panasonic eX3',
        contentLibrary: '300+ entertainment options',
        audio: ['Basic headphones'],
        gaming: 'No gaming',
      },
      connectivity: {
        wifiAvailability: 'Available for purchase',
        wifiSpeed: '10 Mbps',
        wifiPricing: '$19.95 for flight',
        powerOutlets: ['110V AC outlet', 'USB port'],
        deviceStorage: 'Limited storage',
        holders: 'No holders',
      },
      dining: {
        serviceStyle: 'Tray service',
        menuQuality: 'Standard menu',
        beverages: ['House wines', 'Beer', 'Spirits'],
        timingOptions: 'Fixed meal times',
      },
      privacyAndLayout: {
        configuration: '1-2-1 (all aisle access)',
        directAisleAccess: 'Yes - all seats',
        privacyFeatures: ['Low dividers'],
        windowVsAisle: 'Window seats preferred',
        totalSeats: '44 business class seats',
      },
      environment: {
        cabinAltitude: '6,000 feet',
        noiseLevel: 'Moderate',
        airQuality: 'Standard filtration, 40% humidity',
        lightingControl: 'Basic cabin lighting',
        temperatureControl: 'Cabin climate control',
        cabinAge: '6 years old',
      },
    },
    images: ['/placeholder-cabin.jpg', '/placeholder-seat.jpg', '/placeholder-entertainment.jpg', '/placeholder-dining.jpg'],
  },
  {
    id: '6',
    airline: 'Lufthansa',
    aircraft: 'A340-600 (Old Config)',
    route: {
      from: 'FRA',
      to: 'JFK',
      departTime: '18:30',
      arriveTime: '21:55',
      duration: '9h 25m',
    },
    flightNumber: 'LH404',
    price: 3199,
    features: {
      bedLength: {
        icon: '🛏️',
        name: 'Bed Length',
        value: '193cm',
        status: 'fair',
        tooltip: {
          description: 'Fair - Minimum acceptable length',
          rank: '5th of 6 flights',
          average: '198cm',
          best: '205cm (Lufthansa A350)',
        },
      },
      aisleAccess: {
        icon: '🚪',
        name: 'Aisle Access',
        value: '2-2-2 None',
        status: 'poor',
        tooltip: {
          description: 'Poor - Must climb over others',
          rank: '6th of 6 flights',
          average: '1-2-1 Direct',
          best: '1-2-1 Direct',
        },
      },
      wifi: {
        icon: '📡',
        name: 'WiFi',
        value: 'Paid, 5 Mbps',
        status: 'poor',
        tooltip: {
          description: 'Poor - Very slow and paid',
          rank: '6th of 6 flights',
          average: '25 Mbps',
          best: '50+ Mbps (Lufthansa A350)',
        },
      },
      screenSize: {
        icon: '📺',
        name: 'Screen Size',
        value: '15" SD',
        status: 'poor',
        tooltip: {
          description: 'Poor - Small and low resolution',
          rank: '6th of 6 flights',
          average: '19.5"',
          best: '24" (Lufthansa A350)',
        },
      },
      privacy: {
        icon: '🔒',
        name: 'Privacy',
        value: 'Open Cabin',
        status: 'poor',
        tooltip: {
          description: 'Poor - No privacy features',
          rank: '6th of 6 flights',
          average: 'Enclosed Suite',
          best: 'Door Suite',
        },
      },
      cabinAge: {
        icon: '🎂',
        name: 'Cabin Age',
        value: '11 years',
        status: 'poor',
        tooltip: {
          description: 'Poor - Outdated cabin',
          rank: '6th of 6 flights',
          average: '6 years',
          best: '2 years (Lufthansa A350)',
        },
      },
    },
    details: {
      seatAndSleep: {
        seatWidth: '20 inches',
        seatPitch: '60 inches',
        recline: 'Fully flat 180°',
        bedLength: '193cm (76 inches)',
        bedWidth: '51cm (20 inches)',
        bedType: 'Fully flat bed',
        comfortFeatures: ['Basic headrest'],
        bedding: ['Blanket', 'Pillow'],
      },
      entertainment: {
        screenSize: '15 inches',
        resolution: 'Standard definition',
        systemName: 'Legacy system',
        contentLibrary: '100+ entertainment options',
        audio: ['Basic headphones'],
        gaming: 'No gaming',
      },
      connectivity: {
        wifiAvailability: 'Available for purchase',
        wifiSpeed: '5 Mbps',
        wifiPricing: '$24.95 for flight',
        powerOutlets: ['110V AC outlet'],
        deviceStorage: 'Minimal storage',
        holders: 'No holders',
      },
      dining: {
        serviceStyle: 'Tray service',
        menuQuality: 'Basic menu',
        beverages: ['House wines', 'Beer'],
        timingOptions: 'Fixed meal times',
      },
      privacyAndLayout: {
        configuration: '2-2-2 (no aisle access)',
        directAisleAccess: 'No - middle seats blocked',
        privacyFeatures: ['Minimal dividers'],
        windowVsAisle: 'Aisle seats slightly better',
        totalSeats: '48 business class seats',
      },
      environment: {
        cabinAltitude: '8,000 feet',
        noiseLevel: 'Louder',
        airQuality: 'Basic filtration, 30% humidity',
        lightingControl: 'Cabin lights only',
        temperatureControl: 'Cabin climate control',
        cabinAge: '11 years old',
      },
    },
    images: ['/placeholder-cabin.jpg', '/placeholder-seat.jpg', '/placeholder-entertainment.jpg', '/placeholder-dining.jpg'],
  },
];

export const airports = [
  { code: 'JFK', name: 'New York JFK' },
  { code: 'LAX', name: 'Los Angeles' },
  { code: 'LHR', name: 'London Heathrow' },
  { code: 'FRA', name: 'Frankfurt' },
  { code: 'DXB', name: 'Dubai' },
  { code: 'SIN', name: 'Singapore' },
  { code: 'HKG', name: 'Hong Kong' },
  { code: 'NRT', name: 'Tokyo Narita' },
  { code: 'CDG', name: 'Paris CDG' },
  { code: 'ZRH', name: 'Zurich' },
];

export const cabinClasses = ['Business Class', 'First Class'];
