export interface ProductSpecs {
  wattage: string;
  waterCapacity: string;
  noiseLevel?: string;
  speedSettings?: string;
  oscillation?: boolean;
  timer?: boolean;
  color?: string;
  dimensions: string;
  weight: string;
  remoteControl?: boolean;
}

export interface PackingInfo {
  "20GP": number;
  "40GP": number;
  "40HQ": number;
  cartonSize: string;
  grossWeight: string;
  netWeight: string;
}

export interface Product {
  id: string;
  model: string;
  series: "AC" | "DC" | "Outdoor" | "Industrial";
  seriesName: {
    en: string;
    zh: string;
  };
  title: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  specs: ProductSpecs;
  packingInfo: PackingInfo;
  images: string[];
  isFeatured: boolean;
  features: string[];
  createdAt: Date;
}

export const products: Product[] = [
  {
    id: "lb-fs09m",
    model: "LB-FS09M",
    series: "AC",
    seriesName: {
      en: "AC Mist Fan",
      zh: "交流电喷雾风扇"
    },
    title: {
      en: "LB-FS09M 16\" AC Mist Fan",
      zh: "LB-FS09M 16英寸交流电喷雾风扇"
    },
    description: {
      en: "Reliable 16-inch AC mist fan with 2.8L water tank, perfect for indoor cooling applications.",
      zh: "可靠的16英寸交流电喷雾风扇，配备2.8L水箱，完美适用于室内冷却应用。"
    },
    specs: {
      wattage: "75W",
      waterCapacity: "2.8L",
      noiseLevel: "<60dB",
      speedSettings: "3",
      oscillation: true,
      color: "Black/White",
      dimensions: "Φ400×1200mm",
      weight: "7kg",
      remoteControl: false
    },
    packingInfo: {
      "20GP": 520,
      "40GP": 1060,
      "40HQ": 1210,
      cartonSize: "600×230×435mm",
      grossWeight: "8kg",
      netWeight: "7kg"
    },
    images: ["/images/products/lb-fs09m.jpg"],
    isFeatured: false,
    features: ["oscillation", "humidifier", "lowNoise"],
    createdAt: new Date()
  },
  {
    id: "lb-fs09r",
    model: "LB-FS09R",
    series: "AC",
    seriesName: {
      en: "AC Mist Fan",
      zh: "交流电喷雾风扇"
    },
    title: {
      en: "LB-FS09R 16\" AC Mist Fan with Remote",
      zh: "LB-FS09R 16英寸带遥控交流电喷雾风扇"
    },
    description: {
      en: "Premium 16-inch AC mist fan with remote control, timer, and 3 operating modes for ultimate convenience.",
      zh: "高端16英寸交流电喷雾风扇，配备遥控器、定时功能和3种操作模式，提供极致便利。"
    },
    specs: {
      wattage: "75W",
      waterCapacity: "2.8L",
      noiseLevel: "<60dB",
      speedSettings: "3",
      oscillation: true,
      timer: true,
      color: "Black/White",
      dimensions: "Φ400×1200mm",
      weight: "7kg",
      remoteControl: true
    },
    packingInfo: {
      "20GP": 505,
      "40GP": 1030,
      "40HQ": 1175,
      cartonSize: "600×230×435mm",
      grossWeight: "8kg",
      netWeight: "7kg"
    },
    images: ["/images/products/lb-fs09r.jpg"],
    isFeatured: true,
    features: ["oscillation", "humidifier", "lowNoise", "remoteControl", "energyEfficient"],
    createdAt: new Date()
  },
  {
    id: "lb-fs-40",
    model: "LB-FS-40",
    series: "AC",
    seriesName: {
      en: "AC Mist Fan",
      zh: "交流电喷雾风扇"
    },
    title: {
      en: "LB-FS-40 16\" AC Mist Fan",
      zh: "LB-FS-40 16英寸交流电喷雾风扇"
    },
    description: {
      en: "Classic 16-inch AC mist fan with larger 3.2L water tank for extended operation.",
      zh: "经典16英寸交流电喷雾风扇，配备更大的3.2L水箱，可延长运行时间。"
    },
    specs: {
      wattage: "75W",
      waterCapacity: "3.2L",
      noiseLevel: "<60dB",
      speedSettings: "3",
      oscillation: true,
      color: "Black/White",
      dimensions: "Φ400×1220mm",
      weight: "7.5kg",
      remoteControl: false
    },
    packingInfo: {
      "20GP": 480,
      "40GP": 980,
      "40HQ": 1120,
      cartonSize: "620×240×450mm",
      grossWeight: "8.5kg",
      netWeight: "7.5kg"
    },
    images: ["/images/products/lb-fs-40.jpg"],
    isFeatured: false,
    features: ["oscillation", "humidifier", "lowNoise", "largeTank"],
    createdAt: new Date()
  },
  {
    id: "lb-fs01d",
    model: "LB-FS01D",
    series: "AC",
    seriesName: {
      en: "AC Mist Fan",
      zh: "交流电喷雾风扇"
    },
    title: {
      en: "LB-FS01D 16\" AC Mist Fan with Remote",
      zh: "LB-FS01D 16英寸带遥控交流电喷雾风扇"
    },
    description: {
      en: "Feature-rich 16-inch AC mist fan with remote control and 3.2L water tank.",
      zh: "功能丰富的16英寸交流电喷雾风扇，配备遥控器和3.2L水箱。"
    },
    specs: {
      wattage: "75W",
      waterCapacity: "3.2L",
      noiseLevel: "<60dB",
      speedSettings: "3",
      oscillation: true,
      timer: true,
      color: "Black/White",
      dimensions: "Φ400×1220mm",
      weight: "7.5kg",
      remoteControl: true
    },
    packingInfo: {
      "20GP": 470,
      "40GP": 960,
      "40HQ": 1100,
      cartonSize: "620×240×450mm",
      grossWeight: "8.5kg",
      netWeight: "7.5kg"
    },
    images: ["/images/products/lb-fs01d.jpg"],
    isFeatured: false,
    features: ["oscillation", "humidifier", "lowNoise", "remoteControl", "largeTank"],
    createdAt: new Date()
  },
  {
    id: "wu-fs092-dc",
    model: "WU-FS092-DC",
    series: "DC",
    seriesName: {
      en: "DC Mist Fan",
      zh: "直流电喷雾风扇"
    },
    title: {
      en: "WU-FS092-DC 16\" DC Mist Fan",
      zh: "WU-FS092-DC 16英寸直流电喷雾风扇"
    },
    description: {
      en: "Energy-efficient 16-inch DC mist fan with brushless motor for quiet operation and energy savings.",
      zh: "节能型16英寸直流电喷雾风扇，采用无刷电机，运行安静且节能。"
    },
    specs: {
      wattage: "35W",
      waterCapacity: "3.0L",
      noiseLevel: "<55dB",
      speedSettings: "8",
      oscillation: true,
      timer: true,
      color: "White/Grey",
      dimensions: "Φ400×1250mm",
      weight: "6.5kg",
      remoteControl: true
    },
    packingInfo: {
      "20GP": 540,
      "40GP": 1100,
      "40HQ": 1260,
      cartonSize: "580×220×420mm",
      grossWeight: "7.5kg",
      netWeight: "6.5kg"
    },
    images: ["/images/products/wu-fs092-dc.jpg"],
    isFeatured: false,
    features: ["oscillation", "humidifier", "lowNoise", "remoteControl", "energyEfficient"],
    createdAt: new Date()
  },
  {
    id: "lb-gy1701",
    model: "LB-GY1701",
    series: "Outdoor",
    seriesName: {
      en: "Outdoor Mist Fan",
      zh: "户外喷雾风扇"
    },
    title: {
      en: "LB-GY1701 26\"/30\" Outdoor Mist Fan",
      zh: "LB-GY1701 26英寸/30英寸户外喷雾风扇"
    },
    description: {
      en: "Powerful outdoor mist fan with large 40L water tank, aluminum blades, and copper motor for commercial applications.",
      zh: "强劲的户外喷雾风扇，配备40L大水箱、铝制叶片和铜电机，适用于商业应用。"
    },
    specs: {
      wattage: "220W",
      waterCapacity: "40L",
      noiseLevel: "<70dB",
      speedSettings: "3",
      oscillation: true,
      color: "Silver/Grey",
      dimensions: "Φ660×1850mm (26\") / Φ760×1900mm (30\")",
      weight: "28kg",
      remoteControl: false
    },
    packingInfo: {
      "20GP": 120,
      "40GP": 245,
      "40HQ": 280,
      cartonSize: "780×380×1750mm",
      grossWeight: "32kg",
      netWeight: "28kg"
    },
    images: ["/images/products/lb-gy1701.jpg"],
    isFeatured: false,
    features: ["oscillation", "humidifier", "largeTank"],
    createdAt: new Date()
  },
  {
    id: "lb-fs-45plus",
    model: "LB-FS-45plus",
    series: "Outdoor",
    seriesName: {
      en: "Outdoor Mist Fan",
      zh: "户外喷雾风扇"
    },
    title: {
      en: "LB-FS-45plus 16\" Outdoor Mist Fan",
      zh: "LB-FS-45plus 16英寸户外喷雾风扇"
    },
    description: {
      en: "Versatile 16-inch outdoor mist fan with remote control and optional caster wheels for mobility.",
      zh: "多功能16英寸户外喷雾风扇，配备遥控器和可选脚轮，便于移动。"
    },
    specs: {
      wattage: "95W",
      waterCapacity: "2.2L",
      noiseLevel: "<62dB",
      speedSettings: "3",
      oscillation: true,
      timer: true,
      color: "Black",
      dimensions: "Φ450×1300mm",
      weight: "9kg",
      remoteControl: true
    },
    packingInfo: {
      "20GP": 380,
      "40GP": 775,
      "40HQ": 885,
      cartonSize: "680×280×530mm",
      grossWeight: "10.5kg",
      netWeight: "9kg"
    },
    images: ["/images/products/lb-fs-45plus.jpg"],
    isFeatured: false,
    features: ["oscillation", "humidifier", "lowNoise", "remoteControl"],
    createdAt: new Date()
  },
  {
    id: "wu-gy1705-dc",
    model: "WU-GY1705-DC",
    series: "Outdoor",
    seriesName: {
      en: "Outdoor Mist Fan",
      zh: "户外喷雾风扇"
    },
    title: {
      en: "WU-GY1705-DC 26\" DC Outdoor Mist Fan",
      zh: "WU-GY1705-DC 26英寸直流户外喷雾风扇"
    },
    description: {
      en: "High-performance 26-inch DC outdoor mist fan with brushless motor, 5 metal blades, and 8-speed settings.",
      zh: "高性能26英寸直流户外喷雾风扇，配备无刷电机、5个金属叶片和8档速度设置。"
    },
    specs: {
      wattage: "170W",
      waterCapacity: "30L",
      noiseLevel: "<68dB",
      speedSettings: "8",
      oscillation: true,
      color: "Silver/Black",
      dimensions: "Φ660×1800mm",
      weight: "25kg",
      remoteControl: true
    },
    packingInfo: {
      "20GP": 140,
      "40GP": 285,
      "40HQ": 325,
      cartonSize: "720×340×1700mm",
      grossWeight: "29kg",
      netWeight: "25kg"
    },
    images: ["/images/products/wu-gy1705-dc.jpg"],
    isFeatured: true,
    features: ["oscillation", "humidifier", "remoteControl", "energyEfficient", "largeTank"],
    createdAt: new Date()
  },
  {
    id: "wu-gy1705m",
    model: "WU-GY1705M",
    series: "Outdoor",
    seriesName: {
      en: "Outdoor Mist Fan",
      zh: "户外喷雾风扇"
    },
    title: {
      en: "WU-GY1705M 26\" Outdoor Mist Fan",
      zh: "WU-GY1705M 26英寸户外喷雾风扇"
    },
    description: {
      en: "Reliable 26-inch outdoor mist fan built for commercial and industrial applications.",
      zh: "可靠的26英寸户外喷雾风扇，专为商业和工业应用而设计。"
    },
    specs: {
      wattage: "180W",
      waterCapacity: "30L",
      noiseLevel: "<70dB",
      speedSettings: "3",
      oscillation: true,
      color: "Silver",
      dimensions: "Φ660×1800mm",
      weight: "24kg",
      remoteControl: false
    },
    packingInfo: {
      "20GP": 150,
      "40GP": 305,
      "40HQ": 350,
      cartonSize: "700×320×1680mm",
      grossWeight: "28kg",
      netWeight: "24kg"
    },
    images: ["/images/products/wu-gy1705m.jpg"],
    isFeatured: false,
    features: ["oscillation", "humidifier", "largeTank"],
    createdAt: new Date()
  },
  {
    id: "bf-650",
    model: "BF-650",
    series: "Industrial",
    seriesName: {
      en: "Industrial Barrel Fan",
      zh: "工业桶式风扇"
    },
    title: {
      en: "BF-650 Industrial Barrel Fan",
      zh: "BF-650 工业桶式风扇"
    },
    description: {
      en: "Heavy-duty industrial barrel fan with 290W power for maximum air circulation in large spaces.",
      zh: "重型工业桶式风扇，功率290W，为大型空间提供最大空气循环。"
    },
    specs: {
      wattage: "290W",
      waterCapacity: "N/A",
      noiseLevel: "<75dB",
      speedSettings: "2",
      color: "Industrial Blue",
      dimensions: "Φ650×650×450mm",
      weight: "18kg"
    },
    packingInfo: {
      "20GP": 180,
      "40GP": 368,
      "40HQ": 420,
      cartonSize: "680×680×480mm",
      grossWeight: "21kg",
      netWeight: "18kg"
    },
    images: ["/images/products/bf-650.jpg"],
    isFeatured: false,
    features: ["energyEfficient"],
    createdAt: new Date()
  },
  {
    id: "bf-750",
    model: "BF-750",
    series: "Industrial",
    seriesName: {
      en: "Industrial Barrel Fan",
      zh: "工业桶式风扇"
    },
    title: {
      en: "BF-750 Industrial Barrel Fan",
      zh: "BF-750 工业桶式风扇"
    },
    description: {
      en: "Powerful 450W industrial barrel fan for factories, warehouses, and large commercial spaces.",
      zh: "强劲的450W工业桶式风扇，适用于工厂、仓库和大型商业空间。"
    },
    specs: {
      wattage: "450W",
      waterCapacity: "N/A",
      noiseLevel: "<78dB",
      speedSettings: "2",
      color: "Industrial Blue",
      dimensions: "Φ750×750×500mm",
      weight: "22kg"
    },
    packingInfo: {
      "20GP": 144,
      "40GP": 294,
      "40HQ": 336,
      cartonSize: "780×780×530mm",
      grossWeight: "26kg",
      netWeight: "22kg"
    },
    images: ["/images/products/bf-750.jpg"],
    isFeatured: false,
    features: ["energyEfficient"],
    createdAt: new Date()
  },
  {
    id: "bf-900",
    model: "BF-900",
    series: "Industrial",
    seriesName: {
      en: "Industrial Barrel Fan",
      zh: "工业桶式风扇"
    },
    title: {
      en: "BF-900 Industrial Barrel Fan",
      zh: "BF-900 工业桶式风扇"
    },
    description: {
      en: "Large 500W industrial barrel fan with 900mm diameter for maximum airflow.",
      zh: "大型500W工业桶式风扇，直径900mm，提供最大气流。"
    },
    specs: {
      wattage: "500W",
      waterCapacity: "N/A",
      noiseLevel: "<80dB",
      speedSettings: "2",
      color: "Industrial Blue",
      dimensions: "Φ900×900×550mm",
      weight: "28kg"
    },
    packingInfo: {
      "20GP": 108,
      "40GP": 220,
      "40HQ": 252,
      cartonSize: "930×930×580mm",
      grossWeight: "33kg",
      netWeight: "28kg"
    },
    images: ["/images/products/bf-900.jpg"],
    isFeatured: false,
    features: ["energyEfficient"],
    createdAt: new Date()
  },
  {
    id: "bf-1250",
    model: "BF-1250",
    series: "Industrial",
    seriesName: {
      en: "Industrial Barrel Fan",
      zh: "工业桶式风扇"
    },
    title: {
      en: "BF-1250 Industrial Barrel Fan",
      zh: "BF-1250 工业桶式风扇"
    },
    description: {
      en: "Extra-large 750W industrial barrel fan with 1250mm diameter for the most demanding applications.",
      zh: "特大号750W工业桶式风扇，直径1250mm，适用于最严苛的应用场景。"
    },
    specs: {
      wattage: "750W",
      waterCapacity: "N/A",
      noiseLevel: "<82dB",
      speedSettings: "2",
      color: "Industrial Blue",
      dimensions: "Φ1250×1250×650mm",
      weight: "38kg"
    },
    packingInfo: {
      "20GP": 60,
      "40GP": 122,
      "40HQ": 140,
      cartonSize: "1280×1280×680mm",
      grossWeight: "44kg",
      netWeight: "38kg"
    },
    images: ["/images/products/bf-1250.jpg"],
    isFeatured: true,
    features: ["energyEfficient"],
    createdAt: new Date()
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsBySeries(series: "AC" | "DC" | "Outdoor" | "Industrial"): Product[] {
  return products.filter(p => p.series === series);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.isFeatured);
}
