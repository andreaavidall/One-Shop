export interface Supplier {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviewCount: number;
  avgDeliveryHours: number;
  location: string;
  minOrder: number;
  established: number;
  description: string;
  brands: string[];
  promotions: string[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  description: string;
  specifications: Record<string, string>;
  compatibleWith?: string[];
  image: string;
}

export interface ProductListing {
  id: string;
  productId: string;
  supplierId: string;
  price: number;
  stock: number;
  deliveryHours: number;
  warrantyMonths: number;
  rating: number;
  condition: 'Nuevo' | 'Reacondicionado';
}

export interface Kit {
  id: string;
  name: string;
  description: string;
  image: string;
  items: {
    productName: string;
    category: string;
    quantity: number;
    recommendedBrand: string;
  }[];
}

export const suppliers: Supplier[] = [
  {
    id: 's1',
    name: 'DentMax Perú',
    logo: 'DM',
    rating: 4.9,
    reviewCount: 312,
    avgDeliveryHours: 24,
    location: 'Miraflores, Lima',
    minOrder: 150,
    established: 2012,
    description: 'Distribuidor líder de equipos y materiales odontológicos premium en el Perú. Representante oficial de 3M, Coltene y Hu-Friedy.',
    brands: ['3M ESPE', 'Coltene', 'Hu-Friedy', 'Maillefer'],
    promotions: ['Envío gratis por compras mayores a S/. 500', '10% de descuento en instrumental de cirugía']
  },
  {
    id: 's2',
    name: 'OdontoImport',
    logo: 'OI',
    rating: 4.6,
    reviewCount: 245,
    avgDeliveryHours: 12,
    location: 'Surco, Lima',
    minOrder: 100,
    established: 2015,
    description: 'Importador directo de insumos dentales. Nos especializamos en la entrega express para emergencias de stock en clínicas de Lima Metropolitana.',
    brands: ['3M ESPE', 'Angelus', 'SDI', 'Woodpecker'],
    promotions: ['Entrega express en menos de 12 horas en Lima', 'Descuento de S/. 50 en tu primera compra de resinas']
  },
  {
    id: 's3',
    name: 'BioDent Insumos',
    logo: 'BD',
    rating: 4.3,
    reviewCount: 189,
    avgDeliveryHours: 36,
    location: 'La Victoria, Lima',
    minOrder: 80,
    established: 2018,
    description: 'Expertos en bioseguridad, desechables y consumibles para consultorios odontológicos. Los precios más competitivos en guantes y mascarillas.',
    brands: ['BioClean', 'Terumo', 'Dentsply Sirona', 'Coltene'],
    promotions: ['Precios mayoristas en cajas de guantes de nitrilo', '5+1 en rollos de esterilización']
  },
  {
    id: 's4',
    name: 'OrthoSupply Co.',
    logo: 'OS',
    rating: 4.7,
    reviewCount: 156,
    avgDeliveryHours: 24,
    location: 'San Isidro, Lima',
    minOrder: 200,
    established: 2010,
    description: 'Distribuidor especializado en ortodoncia, endodoncia y odontopediatría. Ofrecemos el catálogo de brackets y limas rotatorias más completo del mercado.',
    brands: ['Morelli', 'OrthoClassic', 'Dentsply Sirona', 'Angelus'],
    promotions: ['Kit de bienvenida para estudiantes de postgrado', 'Brackets Morelli 4+1 gratis']
  },
  {
    id: 's5',
    name: 'DentalTech Equipos',
    logo: 'DT',
    rating: 4.8,
    reviewCount: 98,
    avgDeliveryHours: 48,
    location: 'San Borja, Lima',
    minOrder: 500,
    established: 2008,
    description: 'Especialistas en equipamiento clínico y dental digital. Servicio técnico propio autorizado, garantía extendida y financiamiento disponible.',
    brands: ['Woodpecker', 'W&H', 'NSK', 'Medit'],
    promotions: ['Garantía extendida de 24 meses en autoclaves', 'Instalación y capacitación técnica gratis en Lima']
  },
  {
    id: 's6',
    name: 'GlobalDental Mayorista',
    logo: 'GD',
    rating: 4.2,
    reviewCount: 120,
    avgDeliveryHours: 36,
    location: 'Lima Cercado',
    minOrder: 300,
    established: 2016,
    description: 'Distribución mayorista a nivel nacional. Abastecemos a clínicas grandes con un amplio stock en anestesia, yesos y materiales de impresión.',
    brands: ['Zeyco', 'Lascod', 'Vel-Mix', '3M ESPE'],
    promotions: ['Envíos garantizados a provincias en 48h', 'Descuento especial por volumen de compra mensual']
  }
];

export const products: Product[] = [
  // OPERATORIA
  {
    id: 'p1',
    name: 'Resina Filtek Z350 XT Body A2',
    category: 'Operatoria',
    brand: '3M ESPE',
    description: 'Resina compuesta restauradora universal con tecnología de nano-relleno. Estética excepcional para restauraciones anteriores y excelente resistencia para el sector posterior.',
    specifications: {
      'Presentación': 'Jeringa de 4g',
      'Tipo de Relleno': 'Nanotecnología (100% nanopartículas)',
      'Indicaciones': 'Restauraciones directas anteriores y posteriores, reconstrucción de muñones, ferulizaciones.',
      'Tiempo de Fotocurado': '20 segundos por capa'
    },
    compatibleWith: ['Adhesivo Single Bond Universal', 'Lámpara de Fotocurado Led Valo'],
    image: 'resina_filtek'
  },
  {
    id: 'p2',
    name: 'Resina Filtek Z250 Microval A2',
    category: 'Operatoria',
    brand: '3M ESPE',
    description: 'Restaurador estético microhíbrido de resina compuesta. Ideal para restauraciones anteriores y posteriores con bajo índice de contracción por polimerización.',
    specifications: {
      'Presentación': 'Jeringa de 4g',
      'Tipo de Relleno': 'Microhíbrido',
      'Indicaciones': 'Restauraciones directas de cavidades Clase I a V.',
      'Tiempo de Fotocurado': '30 segundos por capa'
    },
    compatibleWith: ['Adhesivo Single Bond Universal', 'Lámpara de Fotocurado Led'],
    image: 'resina_filtek_z250'
  },
  {
    id: 'p3',
    name: 'Adhesivo Single Bond Universal',
    category: 'Operatoria',
    brand: '3M ESPE',
    description: 'Adhesivo dental monocomponente compatible con todas las técnicas de grabado (grabado total, autocondicionante y grabado selectivo). Excelente fuerza de adhesión.',
    specifications: {
      'Presentación': 'Frasco de 5ml',
      'Generación': '8va Generación (Universal)',
      'Técnica': 'Grabado selectivo, grabado total o autocondicionante',
      'Estabilidad': 'No requiere refrigeración'
    },
    image: 'adhesivo_single_bond'
  },
  {
    id: 'p4',
    name: 'Lámpara de Fotocurado Led-D',
    category: 'Operatoria',
    brand: 'Woodpecker',
    description: 'Lámpara de fotocurado inalámbrica de alta potencia, con pantalla digital, 4 modos de tiempo de trabajo y base cargadora. Diseño ergonómico y liviano.',
    specifications: {
      'Intensidad de Luz': '850 - 1000 mW/cm²',
      'Rango de Espectro': '420 - 480 nm',
      'Batería': 'Litio-Ion recargable',
      'Modos de Operación': 'Fuerte, Rampa, Pulso'
    },
    image: 'lampara_led_d'
  },
  {
    id: 'p5',
    name: 'Lámpara de Fotocurado Led Valo Grand',
    category: 'Operatoria',
    brand: '3M ESPE',
    description: 'Lámpara de fotocurado de amplio espectro premium. Su cabezal de perfil bajo y lente de 12 mm permiten un acceso fácil a restauraciones posteriores.',
    specifications: {
      'Intensidad de Luz': 'Hasta 3200 mW/cm² (Modo Xtra Power)',
      'Rango de Espectro': '385 - 515 nm (Colima de amplio espectro)',
      'Carcasa': 'Aluminio de grado aeroespacial unificado',
      'Garantía': '2 años'
    },
    image: 'lampara_valo'
  },

  // ENDODONCIA
  {
    id: 'p6',
    name: 'Limas Rotatorias ProTaper Gold F2 (25mm)',
    category: 'Endodoncia',
    brand: 'Maillefer',
    description: 'Limas de endodoncia rotatorias de níquel-titanio termotratadas. Ofrecen una flexibilidad mejorada y una mayor resistencia a la fatiga cíclica en conductos curvos.',
    specifications: {
      'Material': 'Níquel-Titanio (NiTi) Gold',
      'Longitud': '25 mm',
      'Calibre / Conicidad': 'F2 (25/.08)',
      'Velocidad Recomendada': '250 - 350 rpm'
    },
    compatibleWith: ['Motor de Endodoncia Endo Radar', 'Localizador de Ápices Woodpex III'],
    image: 'limas_protaper'
  },
  {
    id: 'p7',
    name: 'Localizador de Ápices Woodpex III Plus',
    category: 'Endodoncia',
    brand: 'Woodpecker',
    description: 'Localizador electrónico de ápices de alta precisión. Pantalla LCD a color de 4.5", respuesta audible y algoritmos avanzados para mediciones exactas en conductos húmedos o secos.',
    specifications: {
      'Precisión': '97.71%',
      'Pantalla': 'LCD a color de 4.5 pulgadas',
      'Alimentación': 'Batería recargable'
    },
    image: 'localizador_woodpex'
  },
  {
    id: 'p8',
    name: 'Motor de Endodoncia Endo Radar Plus',
    category: 'Endodoncia',
    brand: 'Woodpecker',
    description: 'Motor de endodoncia inalámbrico premium con localizador de ápices integrado. Pantalla táctil a color, múltiples modos de rotación y biblioteca de limas programada.',
    specifications: {
      'Rango de Torque': '0.4 - 5.0 N.cm',
      'Rango de Velocidad': '100 - 1200 rpm',
      'Modos de Trabajo': 'Rotación continua, movimiento recíproco, control de torque autoreversa'
    },
    compatibleWith: ['Limas Rotatorias ProTaper Gold F2 (25mm)'],
    image: 'motor_endo_radar'
  },
  {
    id: 'p9',
    name: 'Cemento Sellador AH Plus Jet',
    category: 'Endodoncia',
    brand: 'Dentsply Sirona',
    description: 'Sellador de conductos radiculares a base de resina epóxica-amina. Excelente biocompatibilidad, radiopacidad y sellado tridimensional hermético de larga duración.',
    specifications: {
      'Presentación': 'Jeringa de mezcla doble de 15g',
      'Base': 'Resina epoxi-amina',
      'Radiopacidad': 'Muy alta (13.6 mm/Al)',
      'Tiempo de Trabajo': '4 horas a temperatura ambiente'
    },
    compatibleWith: ['Conos de Gutapercha ProTaper F2'],
    image: 'cemento_ah_plus'
  },
  {
    id: 'p10',
    name: 'Conos de Gutapercha ProTaper Gold F2',
    category: 'Endodoncia',
    brand: 'Dentsply Sirona',
    description: 'Puntas de gutapercha calibradas para coincidir con la conicidad y el calibre de las limas ProTaper Gold. Excelente adaptación apical.',
    specifications: {
      'Calibre': 'F2 (25/.08)',
      'Presentación': 'Caja x 60 puntas',
      'Formulación': 'Gutapercha convencional'
    },
    compatibleWith: ['Cemento Sellador AH Plus Jet', 'Limas Rotatorias ProTaper Gold F2 (25mm)'],
    image: 'gutapercha_protaper'
  },
  {
    id: 'p11',
    name: 'Hipoclorito de Sodio al 5.25%',
    category: 'Endodoncia',
    brand: 'BioClean',
    description: 'Solución irrigadora dental indicada para la desinfección, lavado y desbridamiento químico de los conductos radiculares durante el tratamiento endodóntico.',
    specifications: {
      'Concentración': '5.25% de Hipoclorito de Sodio',
      'Presentación': 'Frasco de 1 Litro',
      'Uso': 'Irrigación endodóntica'
    },
    image: 'hipoclorito_sodio'
  },
  {
    id: 'p12',
    name: 'Dique de Goma Nic Tone Azul',
    category: 'Endodoncia',
    brand: 'Coltene',
    description: 'Diques de hule de látex natural de bajo polvo para el aislamiento absoluto del campo operatorio. Alta resistencia al desgarro y excelente contraste visual.',
    specifications: {
      'Medidas': '6 x 6 pulgadas (15 x 15 cm)',
      'Espesor': 'Medio (Medium)',
      'Presentación': 'Caja de 36 diques',
      'Color': 'Azul contraste'
    },
    image: 'dique_nic_tone'
  },

  // ORTODONCIA
  {
    id: 'p13',
    name: 'Brackets Metálicos Roth .022',
    category: 'Ortodoncia',
    brand: 'Morelli',
    description: 'Brackets de ortodoncia metálicos de bajo perfil. Diseñados con base de malla arenada para una adhesión superior y esquinas redondeadas para confort del paciente.',
    specifications: {
      'Prescripción': 'Roth',
      'Slot': '0.022"',
      'Material': 'Acero inoxidable médico',
      'Presentación': 'Caso completo (5x5, 20 brackets)'
    },
    image: 'brackets_metalicos'
  },
  {
    id: 'p14',
    name: 'Arcos de Nitinol Redondos .014 Superelásticos',
    category: 'Ortodoncia',
    brand: 'OrthoClassic',
    description: 'Arcos de ortodoncia de níquel-titanio con memoria de forma y alta elasticidad. Proporcionan fuerzas ligeras y constantes para la alineación inicial.',
    specifications: {
      'Diámetro': '0.014" Superior e Inferior',
      'Forma': 'Arcada Ovoide estándar',
      'Presentación': 'Paquete de 10 unidades',
      'Material': 'Nitinol Superelástico'
    },
    image: 'arcos_nitinol'
  },

  // BIOSEGURIDAD
  {
    id: 'p15',
    name: 'Autoclave Digital 21 Litros Clase B',
    category: 'Bioseguridad',
    brand: 'Woodpecker',
    description: 'Esterilizador a vapor de agua a presión clase B, ideal para consultorios odontológicos. Cuenta con ciclos de vacío fraccionado, secado potente y puerto USB.',
    specifications: {
      'Capacidad': '21 Litros',
      'Clase': 'Clase B (Apto para instrumental hueco y textil)',
      'Temperaturas de Trabajo': '121°C y 134°C',
      'Garantía': '18 meses'
    },
    image: 'autoclave_21l'
  },
  {
    id: 'p16',
    name: 'Guantes de Nitrilo BioClean (Caja x 100)',
    category: 'Bioseguridad',
    brand: 'BioClean',
    description: 'Guantes de examen de nitrilo color azul, libres de polvo y látex. Excelente resistencia a pinchazos y sensibilidad táctil superior.',
    specifications: {
      'Material': 'Nitrilo sintético',
      'Color': 'Azul cobalto',
      'Presentación': 'Caja de 100 unidades (por peso)',
      'Tallas disponibles': 'S, M, L'
    },
    image: 'guantes_nitrilo'
  },
  {
    id: 'p17',
    name: 'Mascarillas Quirúrgicas de 3 pliegues (Caja x 50)',
    category: 'Bioseguridad',
    brand: 'BioClean',
    description: 'Mascarillas de protección facial con triple capa de filtración bacteriana. Ajuste nasal maleable y bandas elásticas cómodas.',
    specifications: {
      'Filtración': 'BFE >= 98%',
      'Capa': 'Triple capa (No tejido + Filtro Meltblown + Capa suave)',
      'Presentación': 'Caja de 50 unidades'
    },
    image: 'mascarillas_3pliegues'
  },

  // EQUIPAMIENTO
  {
    id: 'p18',
    name: 'Escáner Intraoral Medit i700',
    category: 'Odontología digital',
    brand: 'Medit',
    description: 'Escáner intraoral digital de alta velocidad y precisión. Ergonómico, ligero (245g) y equipado con tecnología de escaneo 3D a color para prótesis y ortodoncia.',
    specifications: {
      'Peso': '245 gramos',
      'Tecnología': 'Escaneo óptico de video 3D a color',
      'Conectividad': 'Cable directo USB 3.0 tipo C',
      'Software': 'Medit Link incluido (sin licencias anuales)'
    },
    image: 'escaner_medit'
  },
  {
    id: 'p19',
    name: 'Compresora Dental Libre de Aceite 1.5 HP',
    category: 'Equipamiento',
    brand: 'Woodpecker',
    description: 'Compresor de aire para unidades dentales silencioso y libre de mantenimiento de aceite. Tanque pintado internamente con pintura epóxica antioxidante.',
    specifications: {
      'Potencia': '1.5 HP (1100W)',
      'Capacidad del Tanque': '40 Litros',
      'Nivel de Ruido': '55 decibelios (Ultra silencioso)',
      'Flujo de Aire': '152 l/min a 4 bar'
    },
    image: 'compresora_1_5hp'
  },
  {
    id: 'p20',
    name: 'Turbina Dental Alegra TE-97 (B2)',
    category: 'Equipamiento',
    brand: 'W&H',
    description: 'Pieza de mano de alta velocidad con rotor de baleros cerámicos, triple spray de refrigeración y conexión directa a 2 vías (Borden). Excelente balance y potencia.',
    specifications: {
      'Conexión': 'Borden de 2 vías',
      'Cabezal': 'Standard (TE-97)',
      'Refrigeración': 'Triple Spray de agua',
      'Rodamientos': 'Cerámicos de alta duración'
    },
    compatibleWith: ['Agujas Dentales Desechables'],
    image: 'turbina_wh'
  },
  {
    id: 'p21',
    name: 'Micromotor Eléctrico Strong 204',
    category: 'Equipamiento',
    brand: 'Woodpecker',
    description: 'Equipo de micromotor de mesa con pieza de mano para laboratorio dental y pulido clínico. Control de velocidad variable y pedal de encendido.',
    specifications: {
      'Velocidad Máxima': '35,000 RPM',
      'Torque': '2.8 N.cm',
      'Sentido de Giro': 'Derecha / Izquierda (Forward / Reverse)',
      'Accesorios': 'Pedal on/off y soporte'
    },
    image: 'micromotor_strong'
  },

  // ANESTESIA & CONSUMIBLES
  {
    id: 'p22',
    name: 'Anestesia Octocaine Lidocaína 2% (Caja x 50)',
    category: 'Anestesia',
    brand: 'Zeyco',
    description: 'Cartuchos de anestesia local a base de clorhidrato de lidocaína al 2% con epinefrina 1:100,000. Indicada para procedimientos locales y bloqueos conductivos.',
    specifications: {
      'Fórmula': 'Clorhidrato de Lidocaína 2% + Epinefrina 1:100,000',
      'Presentación': 'Caja de 50 cartuchos de vidrio de 1.8ml',
      'Duración de Pulpa': '60 - 90 minutos'
    },
    image: 'anestesia_octocaine'
  },
  {
    id: 'p23',
    name: 'Agujas Dentales Desechables Terumo 30G Cortas',
    category: 'Consumibles',
    brand: 'Terumo',
    description: 'Agujas para anestesia dental ultrafinas y de alta flexibilidad con triple bisel siliconado para una inserción indolora en tejidos blandos.',
    specifications: {
      'Calibre': '30G Corta (0.3 x 21mm)',
      'Presentación': 'Caja de 100 agujas estériles',
      'Compatibilidad': 'Jeringa tipo Cárpule estándar'
    },
    compatibleWith: ['Anestesia Octocaine Lidocaína 2% (Caja x 50)'],
    image: 'agujas_terumo'
  },

  // CIRUGIA
  {
    id: 'p24',
    name: 'Fórceps Dental Hu-Friedy #150 Universal',
    category: 'Cirugía',
    brand: 'Hu-Friedy',
    description: 'Fórceps dental universal de extracción premium para premolares, incisivos y raíces superiores. Acero quirúrgico de alta resistencia.',
    specifications: {
      'Tipo': '#150 Cryer Universal',
      'Material': 'Acero inoxidable quirúrgico Immunity Steel',
      'Uso': 'Extracción de dientes superiores maxilares'
    },
    image: 'forceps_hu_friedy'
  },
  {
    id: 'p25',
    name: 'Elevador de Raíces Recto Fino #301',
    category: 'Cirugía',
    brand: 'Hu-Friedy',
    description: 'Instrumental para luxación dental recto con mango ergonómico. Punta delgada de 2.5mm diseñada para deslizarse fácilmente en el espacio periodontal.',
    specifications: {
      'Punta': 'Recta de 2.5 mm de ancho',
      'Mango': 'Acero inoxidable sólido',
      'Función': 'Luxación de raíces y dientes'
    },
    image: 'elevador_hu_friedy'
  },

  // IMPLANTES
  {
    id: 'p26',
    name: 'Implante Dental Titanio Cono Morse Alvim',
    category: 'Implantes',
    brand: 'Morelli',
    description: 'Implante dental de titanio grado 4 con superficie tratada y diseño de espiras cónico. Conexión de cono morse que previene la microfiltración bacteriana.',
    specifications: {
      'Material': 'Titanio Grado 4 con tratamiento de superficie',
      'Conexión': 'Cono Morse de alta fricción',
      'Diámetro': '3.75 mm',
      'Longitud': '11.5 mm'
    },
    image: 'implante_titanio'
  },

  // IMPRESION & LABORATORIO
  {
    id: 'p27',
    name: 'Alginato Kromopan Cromático de Fraguado Rápido',
    category: 'Materiales de impresión',
    brand: 'Lascod',
    description: 'Alginato cromático inteligente para impresiones con indicador de fase de color. Libre de polvo y de altísima estabilidad dimensional de hasta 168 horas.',
    specifications: {
      'Presentación': 'Bolsa de 453g',
      'Tipo': 'Cambio cromático (Violeta -> Rosa -> Blanco)',
      'Tiempo de Mezcla': '45 segundos',
      'Estabilidad Dimensional': 'Hasta 168 horas (7 días)'
    },
    image: 'alginato_kromopan'
  },
  {
    id: 'p28',
    name: 'Yeso Extraduro Tipo IV Vel-Mix',
    category: 'Laboratorio',
    brand: 'Vel-Mix',
    description: 'Yeso de alta densidad formulado especialmente para modelos de prótesis fija e implantes. Baja expansión de fraguado y alta resistencia a la compresión.',
    specifications: {
      'Presentación': 'Bolsa de 1kg',
      'Color': 'Rosa / Golden Brown',
      'Proporción Mezcla': '20 ml agua por 100g polvo',
      'Resistencia a Compresión': '490 kg/cm² después de 1 hora'
    },
    compatibleWith: ['Alginato Kromopan Cromático de Fraguado Rápido'],
    image: 'yeso_vel_mix'
  }
];

export const listings: ProductListing[] = [
  // Resina Filtek Z350 XT (p1)
  { id: 'l1_1', productId: 'p1', supplierId: 's1', price: 145.00, stock: 25, deliveryHours: 24, warrantyMonths: 0, rating: 4.9, condition: 'Nuevo' },
  { id: 'l1_2', productId: 'p1', supplierId: 's2', price: 132.00, stock: 4, deliveryHours: 12, warrantyMonths: 0, rating: 4.5, condition: 'Nuevo' },
  { id: 'l1_3', productId: 'p1', supplierId: 's3', price: 138.00, stock: 0, deliveryHours: 36, warrantyMonths: 0, rating: 4.1, condition: 'Nuevo' },
  { id: 'l1_4', productId: 'p1', supplierId: 's6', price: 135.00, stock: 50, deliveryHours: 36, warrantyMonths: 0, rating: 4.2, condition: 'Nuevo' },

  // Resina Filtek Z250 (p2)
  { id: 'l2_1', productId: 'p2', supplierId: 's1', price: 120.00, stock: 15, deliveryHours: 24, warrantyMonths: 0, rating: 4.8, condition: 'Nuevo' },
  { id: 'l2_2', productId: 'p2', supplierId: 's2', price: 110.00, stock: 0, deliveryHours: 12, warrantyMonths: 0, rating: 4.2, condition: 'Nuevo' },
  { id: 'l2_3', productId: 'p2', supplierId: 's3', price: 112.00, stock: 30, deliveryHours: 36, warrantyMonths: 0, rating: 4.5, condition: 'Nuevo' },
  { id: 'l2_4', productId: 'p2', supplierId: 's6', price: 108.00, stock: 80, deliveryHours: 36, warrantyMonths: 0, rating: 4.3, condition: 'Nuevo' },

  // Adhesivo Single Bond Universal (p3)
  { id: 'l3_1', productId: 'p3', supplierId: 's1', price: 185.00, stock: 18, deliveryHours: 24, warrantyMonths: 0, rating: 4.9, condition: 'Nuevo' },
  { id: 'l3_2', productId: 'p3', supplierId: 's2', price: 172.00, stock: 2, deliveryHours: 12, warrantyMonths: 0, rating: 4.4, condition: 'Nuevo' },
  { id: 'l3_3', productId: 'p3', supplierId: 's6', price: 175.00, stock: 40, deliveryHours: 36, warrantyMonths: 0, rating: 4.2, condition: 'Nuevo' },

  // Lámpara de Fotocurado Led-D (p4)
  { id: 'l4_1', productId: 'p4', supplierId: 's2', price: 290.00, stock: 8, deliveryHours: 12, warrantyMonths: 12, rating: 4.5, condition: 'Nuevo' },
  { id: 'l4_2', productId: 'p4', supplierId: 's5', price: 270.00, stock: 15, deliveryHours: 48, warrantyMonths: 18, rating: 4.8, condition: 'Nuevo' },
  { id: 'l4_3', productId: 'p4', supplierId: 's3', price: 260.00, stock: 3, deliveryHours: 36, warrantyMonths: 6, rating: 4.0, condition: 'Nuevo' },

  // Lámpara de Fotocurado Valo Grand (p5)
  { id: 'l5_1', productId: 'p5', supplierId: 's1', price: 3450.00, stock: 5, deliveryHours: 24, warrantyMonths: 24, rating: 5.0, condition: 'Nuevo' },
  { id: 'l5_2', productId: 'p5', supplierId: 's5', price: 3380.00, stock: 2, deliveryHours: 48, warrantyMonths: 24, rating: 4.8, condition: 'Nuevo' },
  { id: 'l5_3', productId: 'p5', supplierId: 's2', price: 3600.00, stock: 1, deliveryHours: 12, warrantyMonths: 12, rating: 4.6, condition: 'Nuevo' },

  // Limas Rotatorias ProTaper Gold (p6)
  { id: 'l6_1', productId: 'p6', supplierId: 's1', price: 260.00, stock: 35, deliveryHours: 24, warrantyMonths: 0, rating: 4.9, condition: 'Nuevo' },
  { id: 'l6_2', productId: 'p6', supplierId: 's4', price: 235.00, stock: 40, deliveryHours: 24, warrantyMonths: 0, rating: 4.8, condition: 'Nuevo' },
  { id: 'l6_3', productId: 'p6', supplierId: 's2', price: 250.00, stock: 10, deliveryHours: 12, warrantyMonths: 0, rating: 4.6, condition: 'Nuevo' },

  // Localizador de Ápices Woodpex III (p7)
  { id: 'l7_1', productId: 'p7', supplierId: 's5', price: 950.00, stock: 10, deliveryHours: 48, warrantyMonths: 18, rating: 4.8, condition: 'Nuevo' },
  { id: 'l7_2', productId: 'p7', supplierId: 's2', price: 990.00, stock: 3, deliveryHours: 12, warrantyMonths: 12, rating: 4.5, condition: 'Nuevo' },
  { id: 'l7_3', productId: 'p7', supplierId: 's4', price: 920.00, stock: 4, deliveryHours: 24, warrantyMonths: 12, rating: 4.6, condition: 'Nuevo' },

  // Motor de Endodoncia Endo Radar Plus (p8)
  { id: 'l8_1', productId: 'p8', supplierId: 's5', price: 2890.00, stock: 6, deliveryHours: 48, warrantyMonths: 24, rating: 4.9, condition: 'Nuevo' },
  { id: 'l8_2', productId: 'p8', supplierId: 's2', price: 2950.00, stock: 1, deliveryHours: 12, warrantyMonths: 12, rating: 4.6, condition: 'Nuevo' },
  { id: 'l8_3', productId: 'p8', supplierId: 's4', price: 2850.00, stock: 2, deliveryHours: 24, warrantyMonths: 12, rating: 4.7, condition: 'Nuevo' },

  // Cemento Sellador AH Plus Jet (p9)
  { id: 'l9_1', productId: 'p9', supplierId: 's1', price: 490.00, stock: 12, deliveryHours: 24, warrantyMonths: 0, rating: 4.8, condition: 'Nuevo' },
  { id: 'l9_2', productId: 'p9', supplierId: 's4', price: 460.00, stock: 20, deliveryHours: 24, warrantyMonths: 0, rating: 4.9, condition: 'Nuevo' },
  { id: 'l9_3', productId: 'p9', supplierId: 's3', price: 450.00, stock: 5, deliveryHours: 36, warrantyMonths: 0, rating: 4.2, condition: 'Nuevo' },

  // Conos de Gutapercha ProTaper (p10)
  { id: 'l10_1', productId: 'p10', supplierId: 's4', price: 55.00, stock: 50, deliveryHours: 24, warrantyMonths: 0, rating: 4.8, condition: 'Nuevo' },
  { id: 'l10_2', productId: 'p10', supplierId: 's3', price: 52.00, stock: 30, deliveryHours: 36, warrantyMonths: 0, rating: 4.3, condition: 'Nuevo' },
  { id: 'l10_3', productId: 'p10', supplierId: 's1', price: 58.00, stock: 15, deliveryHours: 24, warrantyMonths: 0, rating: 4.7, condition: 'Nuevo' },

  // Hipoclorito de Sodio (p11)
  { id: 'l11_1', productId: 'p11', supplierId: 's3', price: 32.00, stock: 100, deliveryHours: 36, warrantyMonths: 0, rating: 4.4, condition: 'Nuevo' },
  { id: 'l11_2', productId: 'p11', supplierId: 's1', price: 45.00, stock: 20, deliveryHours: 24, warrantyMonths: 0, rating: 4.7, condition: 'Nuevo' },
  { id: 'l11_3', productId: 'p11', supplierId: 's6', price: 35.00, stock: 80, deliveryHours: 36, warrantyMonths: 0, rating: 4.1, condition: 'Nuevo' },

  // Dique de Goma (p12)
  { id: 'l12_1', productId: 'p12', supplierId: 's1', price: 95.00, stock: 40, deliveryHours: 24, warrantyMonths: 0, rating: 4.9, condition: 'Nuevo' },
  { id: 'l12_2', productId: 'p12', supplierId: 's3', price: 88.00, stock: 60, deliveryHours: 36, warrantyMonths: 0, rating: 4.4, condition: 'Nuevo' },
  { id: 'l12_3', productId: 'p12', supplierId: 's4', price: 92.00, stock: 25, deliveryHours: 24, warrantyMonths: 0, rating: 4.6, condition: 'Nuevo' },

  // Brackets Metálicos Morelli (p13)
  { id: 'l13_1', productId: 'p13', supplierId: 's4', price: 180.00, stock: 45, deliveryHours: 24, warrantyMonths: 0, rating: 4.8, condition: 'Nuevo' },
  { id: 'l13_2', productId: 'p13', supplierId: 's2', price: 195.00, stock: 10, deliveryHours: 12, warrantyMonths: 0, rating: 4.5, condition: 'Nuevo' },
  { id: 'l13_3', productId: 'p13', supplierId: 's6', price: 170.00, stock: 100, deliveryHours: 36, warrantyMonths: 0, rating: 4.0, condition: 'Nuevo' },

  // Arcos de Nitinol (p14)
  { id: 'l14_1', productId: 'p14', supplierId: 's4', price: 65.00, stock: 120, deliveryHours: 24, warrantyMonths: 0, rating: 4.8, condition: 'Nuevo' },
  { id: 'l14_2', productId: 'p14', supplierId: 's3', price: 58.00, stock: 80, deliveryHours: 36, warrantyMonths: 0, rating: 4.2, condition: 'Nuevo' },
  { id: 'l14_3', productId: 'p14', supplierId: 's2', price: 70.00, stock: 30, deliveryHours: 12, warrantyMonths: 0, rating: 4.4, condition: 'Nuevo' },

  // Autoclave 21L Clase B (p15)
  { id: 'l15_1', productId: 'p15', supplierId: 's5', price: 6800.00, stock: 4, deliveryHours: 48, warrantyMonths: 24, rating: 4.9, condition: 'Nuevo' },
  { id: 'l15_2', productId: 'p15', supplierId: 's1', price: 7200.00, stock: 2, deliveryHours: 24, warrantyMonths: 18, rating: 4.8, condition: 'Nuevo' },
  { id: 'l15_3', productId: 'p15', supplierId: 's6', price: 6500.00, stock: 1, deliveryHours: 48, warrantyMonths: 12, rating: 4.0, condition: 'Nuevo' },

  // Guantes de Nitrilo (p16)
  { id: 'l16_1', productId: 'p16', supplierId: 's3', price: 24.50, stock: 500, deliveryHours: 36, warrantyMonths: 0, rating: 4.6, condition: 'Nuevo' },
  { id: 'l16_2', productId: 'p16', supplierId: 's1', price: 29.00, stock: 200, deliveryHours: 24, warrantyMonths: 0, rating: 4.9, condition: 'Nuevo' },
  { id: 'l16_3', productId: 'p16', supplierId: 's2', price: 27.50, stock: 150, deliveryHours: 12, warrantyMonths: 0, rating: 4.4, condition: 'Nuevo' },

  // Mascarillas 3 pliegues (p17)
  { id: 'l17_1', productId: 'p17', supplierId: 's3', price: 8.50, stock: 1000, deliveryHours: 36, warrantyMonths: 0, rating: 4.5, condition: 'Nuevo' },
  { id: 'l17_2', productId: 'p17', supplierId: 's1', price: 12.00, stock: 400, deliveryHours: 24, warrantyMonths: 0, rating: 4.8, condition: 'Nuevo' },
  { id: 'l17_3', productId: 'p17', supplierId: 's6', price: 9.00, stock: 1200, deliveryHours: 36, warrantyMonths: 0, rating: 4.0, condition: 'Nuevo' },

  // Escáner Intraoral Medit i700 (p18)
  { id: 'l18_1', productId: 'p18', supplierId: 's5', price: 46800.00, stock: 2, deliveryHours: 48, warrantyMonths: 24, rating: 4.9, condition: 'Nuevo' },
  { id: 'l18_2', productId: 'p18', supplierId: 's1', price: 47900.00, stock: 1, deliveryHours: 24, warrantyMonths: 12, rating: 4.8, condition: 'Nuevo' },
  { id: 'l18_3', productId: 'p18', supplierId: 's5', price: 39900.00, stock: 1, deliveryHours: 48, warrantyMonths: 12, rating: 4.2, condition: 'Reacondicionado' },

  // Compresora Dental (p19)
  { id: 'l19_1', productId: 'p19', supplierId: 's5', price: 1750.00, stock: 5, deliveryHours: 48, warrantyMonths: 18, rating: 4.8, condition: 'Nuevo' },
  { id: 'l19_2', productId: 'p19', supplierId: 's2', price: 1890.00, stock: 2, deliveryHours: 12, warrantyMonths: 12, rating: 4.4, condition: 'Nuevo' },
  { id: 'l19_3', productId: 'p19', supplierId: 's6', price: 1650.00, stock: 3, deliveryHours: 48, warrantyMonths: 12, rating: 4.1, condition: 'Nuevo' },

  // Turbina Dental Alegra (p20)
  { id: 'l20_1', productId: 'p20', supplierId: 's5', price: 820.00, stock: 12, deliveryHours: 48, warrantyMonths: 12, rating: 4.8, condition: 'Nuevo' },
  { id: 'l20_2', productId: 'p20', supplierId: 's2', price: 850.00, stock: 5, deliveryHours: 12, warrantyMonths: 12, rating: 4.5, condition: 'Nuevo' },
  { id: 'l20_3', productId: 'p20', supplierId: 's1', price: 890.00, stock: 4, deliveryHours: 24, warrantyMonths: 12, rating: 4.9, condition: 'Nuevo' },

  // Micromotor Eléctrico (p21)
  { id: 'l21_1', productId: 'p21', supplierId: 's5', price: 420.00, stock: 8, deliveryHours: 48, warrantyMonths: 12, rating: 4.7, condition: 'Nuevo' },
  { id: 'l21_2', productId: 'p21', supplierId: 's2', price: 450.00, stock: 10, deliveryHours: 12, warrantyMonths: 12, rating: 4.3, condition: 'Nuevo' },
  { id: 'l21_3', productId: 'p21', supplierId: 's6', price: 390.00, stock: 12, deliveryHours: 48, warrantyMonths: 6, rating: 4.1, condition: 'Nuevo' },

  // Anestesia Octocaine (p22)
  { id: 'l22_1', productId: 'p22', supplierId: 's6', price: 160.00, stock: 200, deliveryHours: 36, warrantyMonths: 0, rating: 4.5, condition: 'Nuevo' },
  { id: 'l22_2', productId: 'p22', supplierId: 's1', price: 185.00, stock: 80, deliveryHours: 24, warrantyMonths: 0, rating: 4.9, condition: 'Nuevo' },
  { id: 'l22_3', productId: 'p22', supplierId: 's2', price: 175.00, stock: 50, deliveryHours: 12, warrantyMonths: 0, rating: 4.4, condition: 'Nuevo' },

  // Agujas Dentales (p23)
  { id: 'l23_1', productId: 'p23', supplierId: 's3', price: 42.00, stock: 150, deliveryHours: 36, warrantyMonths: 0, rating: 4.6, condition: 'Nuevo' },
  { id: 'l23_2', productId: 'p23', supplierId: 's1', price: 48.00, stock: 100, deliveryHours: 24, warrantyMonths: 0, rating: 4.9, condition: 'Nuevo' },
  { id: 'l23_3', productId: 'p23', supplierId: 's2', price: 45.00, stock: 70, deliveryHours: 12, warrantyMonths: 0, rating: 4.3, condition: 'Nuevo' },

  // Fórceps Dental (p24)
  { id: 'l24_1', productId: 'p24', supplierId: 's1', price: 380.00, stock: 15, deliveryHours: 24, warrantyMonths: 24, rating: 4.9, condition: 'Nuevo' },
  { id: 'l24_2', productId: 'p24', supplierId: 's3', price: 340.00, stock: 8, deliveryHours: 36, warrantyMonths: 12, rating: 4.3, condition: 'Nuevo' },
  { id: 'l24_3', productId: 'p24', supplierId: 's4', price: 365.00, stock: 12, deliveryHours: 24, warrantyMonths: 12, rating: 4.6, condition: 'Nuevo' },

  // Elevador de Raíces Recto (p25)
  { id: 'l25_1', productId: 'p25', supplierId: 's1', price: 190.00, stock: 20, deliveryHours: 24, warrantyMonths: 24, rating: 4.9, condition: 'Nuevo' },
  { id: 'l25_2', productId: 'p25', supplierId: 's3', price: 165.00, stock: 12, deliveryHours: 36, warrantyMonths: 12, rating: 4.2, condition: 'Nuevo' },
  { id: 'l25_3', productId: 'p25', supplierId: 's4', price: 180.00, stock: 18, deliveryHours: 24, warrantyMonths: 12, rating: 4.5, condition: 'Nuevo' },

  // Implante Dental Titanio (p26)
  { id: 'l26_1', productId: 'p26', supplierId: 's4', price: 450.00, stock: 60, deliveryHours: 24, warrantyMonths: 12, rating: 4.8, condition: 'Nuevo' },
  { id: 'l26_2', productId: 'p26', supplierId: 's2', price: 420.00, stock: 15, deliveryHours: 12, warrantyMonths: 12, rating: 4.3, condition: 'Nuevo' },
  { id: 'l26_3', productId: 'p26', supplierId: 's1', price: 480.00, stock: 30, deliveryHours: 24, warrantyMonths: 24, rating: 4.9, condition: 'Nuevo' },

  // Alginato Kromopan (p27)
  { id: 'l27_1', productId: 'p27', supplierId: 's6', price: 48.00, stock: 250, deliveryHours: 36, warrantyMonths: 0, rating: 4.4, condition: 'Nuevo' },
  { id: 'l27_2', productId: 'p27', supplierId: 's1', price: 58.00, stock: 80, deliveryHours: 24, warrantyMonths: 0, rating: 4.8, condition: 'Nuevo' },
  { id: 'l27_3', productId: 'p27', supplierId: 's3', price: 52.00, stock: 100, deliveryHours: 36, warrantyMonths: 0, rating: 4.3, condition: 'Nuevo' },

  // Yeso Extraduro Vel-Mix (p28)
  { id: 'l28_1', productId: 'p28', supplierId: 's6', price: 38.00, stock: 150, deliveryHours: 36, warrantyMonths: 0, rating: 4.3, condition: 'Nuevo' },
  { id: 'l28_2', productId: 'p28', supplierId: 's1', price: 48.00, stock: 60, deliveryHours: 24, warrantyMonths: 0, rating: 4.7, condition: 'Nuevo' },
  { id: 'l28_3', productId: 'p28', supplierId: 's3', price: 42.00, stock: 80, deliveryHours: 36, warrantyMonths: 0, rating: 4.1, condition: 'Nuevo' }
];

export const kits: Kit[] = [
  {
    id: 'k1',
    name: 'Kit de Profilaxis y Prevención',
    description: 'Materiales esenciales para limpiezas dentales de rutina, profilaxis y fluorización.',
    image: 'kit_profilaxis',
    items: [
      { productName: 'Guantes de Nitrilo BioClean (Caja x 100)', category: 'Bioseguridad', quantity: 2, recommendedBrand: 'BioClean' },
      { productName: 'Mascarillas Quirúrgicas de 3 pliegues (Caja x 50)', category: 'Bioseguridad', quantity: 1, recommendedBrand: 'BioClean' },
      { productName: 'Alginato Kromopan Cromático de Fraguado Rápido', category: 'Materiales de impresión', quantity: 2, recommendedBrand: 'Lascod' }
    ]
  },
  {
    id: 'k2',
    name: 'Kit de Operatoria Estética',
    description: 'Todo lo necesario para restauraciones directas estéticas con resina compuesta.',
    image: 'kit_operatoria',
    items: [
      { productName: 'Resina Filtek Z350 XT Body A2', category: 'Operatoria', quantity: 3, recommendedBrand: '3M ESPE' },
      { productName: 'Adhesivo Single Bond Universal', category: 'Operatoria', quantity: 1, recommendedBrand: '3M ESPE' },
      { productName: 'Lámpara de Fotocurado Led-D', category: 'Operatoria', quantity: 1, recommendedBrand: 'Woodpecker' },
      { productName: 'Dique de Goma Nic Tone Azul', category: 'Endodoncia', quantity: 1, recommendedBrand: 'Coltene' }
    ]
  },
  {
    id: 'k3',
    name: 'Kit de Endodoncia Rotatoria',
    description: 'Conjunto completo para instrumentación y sellado de conductos radiculares con tecnología rotatoria.',
    image: 'kit_endodoncia',
    items: [
      { productName: 'Limas Rotatorias ProTaper Gold F2 (25mm)', category: 'Endodoncia', quantity: 2, recommendedBrand: 'Maillefer' },
      { productName: 'Cemento Sellador AH Plus Jet', category: 'Endodoncia', quantity: 1, recommendedBrand: 'Dentsply Sirona' },
      { productName: 'Conos de Gutapercha ProTaper Gold F2', category: 'Endodoncia', quantity: 1, recommendedBrand: 'Dentsply Sirona' },
      { productName: 'Hipoclorito de Sodio al 5.25%', category: 'Endodoncia', quantity: 3, recommendedBrand: 'BioClean' },
      { productName: 'Dique de Goma Nic Tone Azul', category: 'Endodoncia', quantity: 1, recommendedBrand: 'Coltene' },
      { productName: 'Motor de Endodoncia Endo Radar Plus', category: 'Endodoncia', quantity: 1, recommendedBrand: 'Woodpecker' }
    ]
  },
  {
    id: 'k4',
    name: 'Kit de Cirugía Oral & Extracción',
    description: 'Instrumental y anestésicos para extracciones dentales simples y complejas.',
    image: 'kit_cirugia',
    items: [
      { productName: 'Fórceps Dental Hu-Friedy #150 Universal', category: 'Cirugía', quantity: 1, recommendedBrand: 'Hu-Friedy' },
      { productName: 'Elevador de Raíces Recto Fino #301', category: 'Cirugía', quantity: 1, recommendedBrand: 'Hu-Friedy' },
      { productName: 'Anestesia Octocaine Lidocaína 2% (Caja x 50)', category: 'Anestesia', quantity: 2, recommendedBrand: 'Zeyco' },
      { productName: 'Agujas Dentales Desechables Terumo 30G Cortas', category: 'Consumibles', quantity: 1, recommendedBrand: 'Terumo' },
      { productName: 'Guantes de Nitrilo BioClean (Caja x 100)', category: 'Bioseguridad', quantity: 2, recommendedBrand: 'BioClean' }
    ]
  },
  {
    id: 'k5',
    name: 'Kit de Implantología Básica',
    description: 'Kit para colocación de implantes cónicos de titanio con conexión cono morse.',
    image: 'kit_implantes',
    items: [
      { productName: 'Implante Dental Titanio Cono Morse Alvim', category: 'Implantes', quantity: 5, recommendedBrand: 'Morelli' },
      { productName: 'Anestesia Octocaine Lidocaína 2% (Caja x 50)', category: 'Anestesia', quantity: 1, recommendedBrand: 'Zeyco' },
      { productName: 'Agujas Dentales Desechables Terumo 30G Cortas', category: 'Consumibles', quantity: 1, recommendedBrand: 'Terumo' },
      { productName: 'Guantes de Nitrilo BioClean (Caja x 100)', category: 'Bioseguridad', quantity: 3, recommendedBrand: 'BioClean' }
    ]
  },
  {
    id: 'k6',
    name: 'Kit de Equipamiento Clínico Inicial',
    description: 'Los tres pilares de equipamiento pesado para abrir tu consultorio desde cero.',
    image: 'kit_apertura',
    items: [
      { productName: 'Autoclave Digital 21 Litros Clase B', category: 'Bioseguridad', quantity: 1, recommendedBrand: 'Woodpecker' },
      { productName: 'Compresora Dental Libre de Aceite 1.5 HP', category: 'Equipamiento', quantity: 1, recommendedBrand: 'Woodpecker' },
      { productName: 'Turbina Dental Alegra TE-97 (B2)', category: 'Equipamiento', quantity: 2, recommendedBrand: 'W&H' }
    ]
  }
];

export function getProductListings(productId: string): ProductListing[] {
  return listings.filter(l => l.productId === productId);
}

export function getProductWithListings(productId: string) {
  const product = products.find(p => p.id === productId);
  if (!product) return null;
  const productListings = getProductListings(productId);
  return { ...product, listings: productListings };
}

export interface ProposalItem {
  product: Product;
  listing: ProductListing;
  supplier: Supplier;
  reason: string;
}

export interface Proposal {
  type: 'economy' | 'value' | 'premium';
  name: string;
  items: ProposalItem[];
  totalCost: number;
  estimatedSavings: number;
  shippingDaysMax: number;
}

export function generateProposalsForItems(
  itemRequirements: { productName: string; quantity: number }[]
): { economy: Proposal; value: Proposal; premium: Proposal } {
  
  const economyItems: ProposalItem[] = [];
  const valueItems: ProposalItem[] = [];
  const premiumItems: ProposalItem[] = [];

  itemRequirements.forEach(req => {
    const product = products.find(p => p.name.toLowerCase().includes(req.productName.toLowerCase())) 
                 || products.find(p => p.category.toLowerCase() === req.productName.toLowerCase())
                 || products[0];
                 
    const prodListings = listings.filter(l => l.productId === product.id && l.stock > 0);
    
    if (prodListings.length === 0) {
      const allListings = listings.filter(l => l.productId === product.id);
      const fallbackListing = allListings[0];
      const supplier = suppliers.find(s => s.id === fallbackListing.supplierId)!;
      const item: ProposalItem = { product, listing: fallbackListing, supplier, reason: 'Único proveedor (Sin stock)' };
      economyItems.push(item);
      valueItems.push(item);
      premiumItems.push(item);
      return;
    }

    const econListing = [...prodListings].sort((a, b) => a.price - b.price)[0];
    const econSupplier = suppliers.find(s => s.id === econListing.supplierId)!;
    economyItems.push({
      product,
      listing: econListing,
      supplier: econSupplier,
      reason: `El precio más bajo disponible: S/. ${econListing.price.toFixed(2)}`
    });

    const premListing = [...prodListings].sort((a, b) => {
      if (a.condition !== b.condition) return a.condition === 'Nuevo' ? -1 : 1;
      if (a.warrantyMonths !== b.warrantyMonths) return b.warrantyMonths - a.warrantyMonths;
      return b.price - a.price;
    })[0];
    const premSupplier = suppliers.find(s => s.id === premListing.supplierId)!;
    premiumItems.push({
      product,
      listing: premListing,
      supplier: premSupplier,
      reason: premListing.condition === 'Reacondicionado' 
        ? 'Modelo reacondicionado disponible' 
        : `Línea premium con ${premListing.warrantyMonths > 0 ? premListing.warrantyMonths + ' meses de garantía' : 'soporte completo'}`
    });

    const valListing = [...prodListings].sort((a, b) => {
      const scoreA = (a.rating * 2) - (a.price / 100);
      const scoreB = (b.rating * 2) - (b.price / 100);
      return scoreB - scoreA;
    })[0];
    const valSupplier = suppliers.find(s => s.id === valListing.supplierId)!;
    valueItems.push({
      product,
      listing: valListing,
      supplier: valSupplier,
      reason: `Excelente reputación (${valListing.rating}⭐) y entrega en ${valListing.deliveryHours}h`
    });
  });

  const calcTotal = (items: ProposalItem[]) => items.reduce((sum, item) => {
    const req = itemRequirements.find(r => 
      item.product.name.toLowerCase().includes(r.productName.toLowerCase()) || 
      item.product.category.toLowerCase() === r.productName.toLowerCase()
    );
    const qty = req ? req.quantity : 1;
    return sum + (item.listing.price * qty);
  }, 0);
  
  const calcMaxShipping = (items: ProposalItem[]) => Math.max(...items.map(i => i.listing.deliveryHours)) / 24;

  const totalEcon = calcTotal(economyItems);
  const totalVal = calcTotal(valueItems);
  const totalPrem = calcTotal(premiumItems);

  const economy: Proposal = {
    type: 'economy',
    name: 'Propuesta Económica',
    items: economyItems,
    totalCost: totalEcon,
    estimatedSavings: totalVal - totalEcon + 120,
    shippingDaysMax: Math.ceil(calcMaxShipping(economyItems))
  };

  const value: Proposal = {
    type: 'value',
    name: 'Mejor Relación Calidad-Precio',
    items: valueItems,
    totalCost: totalVal,
    estimatedSavings: totalPrem - totalVal + 80,
    shippingDaysMax: Math.ceil(calcMaxShipping(valueItems))
  };

  const premium: Proposal = {
    type: 'premium',
    name: 'Propuesta Premium',
    items: premiumItems,
    totalCost: totalPrem,
    estimatedSavings: 0,
    shippingDaysMax: Math.ceil(calcMaxShipping(premiumItems))
  };

  return { economy, value, premium };
}
